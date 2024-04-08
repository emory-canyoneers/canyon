package com.canyoneers.canyon.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.canyoneers.canyon.services.GroupService;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/groups")
public class GroupController {
    @Autowired
    GroupService groupService;

    @PostMapping
    public List<Object> createGroup(@RequestBody Map<String, String> json) {
        return groupService.createGroup(json);
    }

    @DeleteMapping("/{groupId}")
    public ResponseEntity<?> deleteGroup(@PathVariable String groupId) {
        boolean success = groupService.deleteGroup(groupId);
        if(!success){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().build();
    }
}
