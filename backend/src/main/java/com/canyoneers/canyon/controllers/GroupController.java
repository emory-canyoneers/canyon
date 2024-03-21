package com.canyoneers.canyon.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.canyoneers.canyon.models.Group;
import com.canyoneers.canyon.services.GroupService;
import java.util.List;

@RestController
@RequestMapping("/groups")
public class GroupController {
    // @PostMapping("issue")
    // public Issue newIssue(@RequestBody String groupID, @RequestParam String
    // question) {
    // // TODO: process POST request

    // // add issue to group
    // // update group repository
    // // add issue to issues repo
    // // return group

    // Group group = groups.findById(new ObjectId(groupID)).get();
    // group.newIssue(question);
    // groups.save(group);
    // Issue issue = group.currentIssue();
    // if (issue != null)
    // return issues.save(issue);
    // else
    // return null;
    // }

    @Autowired
    private GroupService groupService;

    @PostMapping
    public Group createGroup(@RequestBody Group group) {
        return groupService.createGroup(group);
    }

    @GetMapping
    public List<Group> getAllGroups() {
        return groupService.getAllGroups();
    }

    @PutMapping("/{groupId}")
    public Group updateGroup(@PathVariable String groupId, @RequestBody Group group) {
        return groupService.updateGroup(groupId, group);
    }

    @DeleteMapping("/{groupId}")
    public void deleteGroup(@PathVariable String groupId) {
        groupService.deleteGroup(groupId);
    }

    @PutMapping("/{groupId}/addUser/{userId}")
    public Group addUserToGroup(@PathVariable String groupId, @PathVariable String userId) {
        return groupService.addUserToGroup(groupId, userId);
    }

    @PutMapping("/{groupId}/removeUser/{userId}")
    public Group removeUserFromGroup(@PathVariable String groupId, @PathVariable String userId) {
        return groupService.removeUserFromGroup(groupId, userId);
    }
}
