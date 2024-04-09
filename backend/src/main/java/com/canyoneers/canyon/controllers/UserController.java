package com.canyoneers.canyon.controllers;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.canyoneers.canyon.dto.AuthDto;
import com.canyoneers.canyon.dto.SignupDto;
import com.canyoneers.canyon.models.Group;
import com.canyoneers.canyon.models.Response;
import com.canyoneers.canyon.services.AuthService;
import com.canyoneers.canyon.services.GroupService;
import com.canyoneers.canyon.services.ResponseService;
import com.canyoneers.canyon.services.UserService;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    GroupService groupService;

    @Autowired
    ResponseService responseService;

    @Autowired
    AuthService authService;

    @PostMapping
    /**
     * Sign up for a new account
     * 
     * @param dto body should include name, email, and password
     * @return AuthDto with user token and expiry
     */
    public AuthDto newUser(@RequestBody SignupDto dto) {
        return userService.createUser(dto);
    }

    @PutMapping("/join/{groupID}")
    public boolean joinGroup(@RequestHeader(HttpHeaders.AUTHORIZATION) String token, @PathVariable String groupID,
            @RequestBody String userID) {
        System.out.println(token.replaceFirst("Bearer ", ""));
        return userService.addUserToGroup(userID, groupID);
    }

    @GetMapping("/{userId}/groups")
    public List<Group> getUserGroups(@PathVariable String userId, @RequestParam(defaultValue = "10") int n) {
        return groupService.findGroupsByUserId(userId, n);
    }

    @GetMapping("/{userId}/responses")
    public List<Response> getUserResponses(@PathVariable String userId,
            @RequestParam(defaultValue = "10") int n) {
        return responseService.findResponsesByUserId(userId, n);
    }

    /**
     * Delete a user
     * 
     * @param userId
     * @return
     */
    @DeleteMapping()
    public ResponseEntity<?> deleteUser(@RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        String fId = authService.fetchUserFId(token.replaceFirst("Bearer ", ""));
        boolean success = userService.deleteUser(fId);
        if (!success) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().build();
    }
}
