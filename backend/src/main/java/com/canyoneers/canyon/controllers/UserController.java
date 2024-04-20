package com.canyoneers.canyon.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.canyoneers.canyon.dto.AuthDto;
import com.canyoneers.canyon.dto.SignupDto;
import com.canyoneers.canyon.dto.UserUpdateDto;
import com.canyoneers.canyon.models.User;
import com.canyoneers.canyon.repositories.UserRepository;
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
    @Autowired
    UserRepository userRepository;

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
    @GetMapping
    public ResponseEntity<?> getCurrentUser(@RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        token = token.replaceFirst("Bearer ", "");
        String fId = firebaseService.fetchUserFId(token);
        User user = userService.getUserByFId(fId);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping
    // I want a json object with the new password to be sent to this endpoint
    public ResponseEntity<AuthDto> editInfo(@RequestHeader(HttpHeaders.AUTHORIZATION) String token,
            @RequestBody UserUpdateDto dto) {
        token = token.replaceFirst("Bearer ", "");
        String fId = firebaseService.fetchUserFId(token);
        User user = userService.getUserByFId(fId);
        AuthDto response = new AuthDto();

        if (user == null)
            return ResponseEntity.notFound().build();
        if (dto.getName() != null)
            user.setName(dto.getName());
        if (dto.getEmail() != null)
            user.setEmail(dto.getEmail());
        if (dto.getPassword() != null) {
            response = firebaseService.changePassword(token, dto.getPassword());
        } else {
            response.setToken(token);
        }

        userRepository.save(user);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
