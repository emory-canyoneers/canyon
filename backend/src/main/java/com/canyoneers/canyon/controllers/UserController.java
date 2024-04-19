package com.canyoneers.canyon.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import java.util.Map;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.canyoneers.canyon.dto.AuthDto;
import com.canyoneers.canyon.dto.SignupDto;
import com.canyoneers.canyon.models.User;
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

    /**
     * Get user info
     * 
     * @param userId
     * @return all the user info
     */
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        token = token.replaceFirst("Bearer ", "");
        String fId = firebaseService.fetchUserFId(token);
        User user = userService.getUserByFId(fId);
        if(user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/password-change")
    //I want a json object with the new password to be sent to this endpoint
    public ResponseEntity<?> changePassword(@RequestHeader(HttpHeaders.AUTHORIZATION) String token, @RequestBody Map<String, String> Password) {
        token = token.replaceFirst("Bearer ", "");
        String newPassword = Password.get("password");
        if(newPassword == null) {
            return ResponseEntity.badRequest().build();
        }
        if (firebaseService.changePassword(token, newPassword)) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.internalServerError().build();
        }
    }
}
