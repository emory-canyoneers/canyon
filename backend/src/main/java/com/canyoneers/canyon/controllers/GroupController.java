package com.canyoneers.canyon.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.canyoneers.canyon.dto.GroupDto;
import com.canyoneers.canyon.models.Group;
import com.canyoneers.canyon.services.GroupService;
import com.canyoneers.canyon.services.ResponseService;

@RestController
@RequestMapping("/groups")
public class GroupController {
    @Autowired
    GroupService groupService;
    @Autowired
    ResponseService responseService;

    /**
     * Create a new group
     * 
     * @param token User authentication token
     * @param dto   Group information (name)
     * @return Created group
     */
    @PostMapping
    public Group createGroup(@RequestHeader(HttpHeaders.AUTHORIZATION) String token,
            @RequestBody GroupDto dto) {
        return groupService.createGroup(token, dto);
    }

    /**
     * Fetch the first n groups a user is in
     * 
     * @param token User authentication token
     * @param limit limit returned groups
     * @return List of groups a user is in
     */
    @GetMapping
    public List<Group> getUserGroups(@RequestHeader(HttpHeaders.AUTHORIZATION) String token,
            @RequestParam(defaultValue = "10") int limit) {
        return groupService.findGroupsByUserId(token, limit);
    }

    /**
     * Join a group
     * 
     * @param token   User authentication token
     * @param groupId ID of group to join
     * @return Joined group
     */
    @PutMapping("/{groupId}")
    public Group joinGroup(@RequestHeader(HttpHeaders.AUTHORIZATION) String token, @PathVariable String groupId) {
        return groupService.addUserToGroup(token, groupId);
    }

    /**
     * Delete a group (requires ownership)
     * 
     * @param token   User authentication token
     * @param groupId ID of group to delete
     * @return Success
     */
    @DeleteMapping("/{groupId}")
    public ResponseEntity<?> deleteGroup(@RequestHeader(HttpHeaders.AUTHORIZATION) String token,
            @PathVariable String groupId) {
        return groupService.deleteGroup(token, groupId);
    }
}
