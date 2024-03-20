package com.canyoneers.canyon.controllers;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.canyoneers.canyon.models.Group;
import com.canyoneers.canyon.models.Issue;
import com.canyoneers.canyon.repositories.GroupRepository;
import com.canyoneers.canyon.repositories.IssueRepository;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/groups")
public class GroupController {
    @Autowired
    GroupRepository groups;
    @Autowired
    IssueRepository issues;

    @PostMapping("issue")
    public Issue newIssue(@RequestBody String groupID, @RequestParam String question) {
        // TODO: process POST request

        // add issue to group
        // update group repository
        // add issue to issues repo
        // return group

        Group group = groups.findById(new ObjectId(groupID)).get();
        group.newIssue(question);
        groups.save(group);
        Issue issue = group.currentIssue();
        if (issue != null)
            return issues.save(issue);
        else
            return null;
    }

}
