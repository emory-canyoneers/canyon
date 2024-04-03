package com.canyoneers.canyon.services;

import java.util.Map;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;

import com.canyoneers.canyon.models.Group;
import com.canyoneers.canyon.models.Issue;
import com.canyoneers.canyon.repositories.GroupRepository;
import com.canyoneers.canyon.repositories.IssueRepository;

public class IssueService {
    @Autowired
    IssueRepository issues;
    @Autowired
    GroupRepository groups;

    public Issue createIssue(Map<String, String> json) {
        Group group = groups.findById(new ObjectId(json.get("groupID"))).get();
        Issue issue = group.newIssue();

        if (issue == null)
            return null;

        groups.save(group);
        return issues.save(issue);
    }
}
