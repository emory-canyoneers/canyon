package com.canyoneers.canyon.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.canyoneers.canyon.dto.GroupDto;
import com.canyoneers.canyon.models.Group;
import com.canyoneers.canyon.services.GroupService;

@RestController
@RequestMapping("/groups")
public class GroupController {
    @Autowired
    GroupService groupService;

    @PostMapping
    public Group createGroup(@RequestHeader(HttpHeaders.AUTHORIZATION) String token,
            @RequestBody GroupDto groupDto) {
        return groupService.createGroup(token, groupDto);
    }

    @GetMapping
    public List<Group> getUserGroups(@RequestHeader(HttpHeaders.AUTHORIZATION) String token,
            @RequestParam(defaultValue = "10") int limit) {
        return groupService.findGroupsByUserId(token, limit);
    }

    @PutMapping("/{groupId}")
    public Group joinGroup(@RequestHeader(HttpHeaders.AUTHORIZATION) String token, @PathVariable String groupId) {
        return groupService.addUserToGroup(token, groupId);
    }

    @DeleteMapping("/{groupId}")
    public ResponseEntity<?> deleteGroup(@RequestHeader(HttpHeaders.AUTHORIZATION) String token,
            @PathVariable String groupId) {
        return groupService.deleteGroup(token, groupId);
    }
}
