package com.canyoneers.canyon.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.canyoneers.canyon.services.GroupService;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/groups")
public class GroupController {
    @Autowired
    private GroupService groupService;

    @PostMapping
    public List<Object> createGroup(@RequestBody Map<String, String> json) {
        return groupService.createGroup(json);
    }
}
