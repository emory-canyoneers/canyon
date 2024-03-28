package com.canyoneers.canyon.controllers;

import java.util.Map;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.canyoneers.canyon.models.Group;
import com.canyoneers.canyon.models.Issue;
import com.canyoneers.canyon.repositories.GroupRepository;
import com.canyoneers.canyon.repositories.IssueRepository;

@RestController
@RequestMapping("/issues")
public class IssueController {
    @Autowired
    IssueRepository issues;
    @Autowired
    GroupRepository groups;

    // TODO: move to service layer
    @PostMapping
    public Issue createIssue(@RequestBody Map<String, String> json) {
        Group group = groups.findById(new ObjectId(json.get("groupID"))).get();
        Issue issue = group.newIssue();
        if (issue == null)
            return null;
        groups.save(group);
        return issues.save(issue);
    }
}
