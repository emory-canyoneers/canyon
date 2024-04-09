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
import com.canyoneers.canyon.services.FirebaseService;
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
    FirebaseService firebaseService;

    /**
     * Sign up for a new account
     * 
     * @param dto body should include name, email, and password
     * @return AuthDto with user token and expiry
     */
    @PostMapping
    public AuthDto newUser(@RequestBody SignupDto dto) {
        return userService.createUser(dto);
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
    @DeleteMapping
    public ResponseEntity<?> deleteUser(@RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        token = token.replaceFirst("Bearer ", "");
        String fId = firebaseService.fetchUserFId(token);
        if (firebaseService.deleteUser(token) && userService.deleteUser(fId)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.internalServerError().build();
    }
}
