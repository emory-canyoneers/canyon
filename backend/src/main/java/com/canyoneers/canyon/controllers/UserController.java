package com.canyoneers.canyon.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.canyoneers.canyon.models.Group;
import com.canyoneers.canyon.models.Response;
import com.canyoneers.canyon.models.User;
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

    @PostMapping
    public User newUser(@RequestBody String name) {
        return userService.createUser(name);
    }

    @PutMapping("/join/{groupID}")
    public boolean joinGroup(@PathVariable String groupID, @RequestBody String userID) {
        return userService.addUserToGroup(userID, groupID);
    }

    @GetMapping("/{userId}/groups")
    public List<Group> getUserGroups(@PathVariable String userId, @RequestParam(defaultValue = "10") int n){
        return groupService.findGroupsByUserId(userId, n);
    }

    @GetMapping("/{userId}/responses")
    public List<Response> getUserResponses(@PathVariable String userId, 
                                           @RequestParam(defaultValue = "10") int n) {
        return responseService.findResponsesByUserId(userId, n);
    }
}
