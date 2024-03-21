package com.canyoneers.canyon.controllers;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.canyoneers.canyon.models.Group;
import com.canyoneers.canyon.models.User;
import com.canyoneers.canyon.repositories.GroupRepository;
import com.canyoneers.canyon.repositories.UserRepository;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    UserRepository users;

    @Autowired
    GroupRepository groups;

    // TODO: move business logic to services

    // CREATE
    @PostMapping("/new")
    public User newUser(@RequestBody String name) {
        return users.save(new User(name));
    }

    // UPDATE
    @PutMapping("join/{groupID}")
    public Group joinGroup(@PathVariable String groupID, @RequestBody String userID) {
        ObjectId groupIdObj = new ObjectId(groupID);
        ObjectId userIdObj = new ObjectId(userID);


        Group group = groups.findById(groupIdObj).orElse(null);
        User user = users.findById(userIdObj).orElse(null);
        if (group != null && user != null) {
            user.joinGroup(group);
            groups.save(group);
            users.save(user);
        }
        return group;
    }
}
