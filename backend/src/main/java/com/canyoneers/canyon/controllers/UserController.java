package com.canyoneers.canyon.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.canyoneers.canyon.dto.AuthDto;
import com.canyoneers.canyon.dto.LoginDto;
import com.canyoneers.canyon.models.User;
import com.canyoneers.canyon.services.UserService;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping
    public User newUser(@RequestBody String name) {
        System.out.println("Creating user: " + name);
        return userService.createUser(name);
    }

    @PutMapping("/join/{groupID}")
    public boolean joinGroup(@PathVariable String groupID, @RequestBody String userID) {
        return userService.addUserToGroup(userID, groupID);
    }

    @PostMapping("/login")
    public AuthDto login(@RequestBody LoginDto login) {
        return userService.login(login);
    }
}
