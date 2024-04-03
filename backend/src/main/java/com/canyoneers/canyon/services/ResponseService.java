package com.canyoneers.canyon.services;

import java.util.Map;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.canyoneers.canyon.models.Group;
import com.canyoneers.canyon.models.Issue;
import com.canyoneers.canyon.models.Response;
import com.canyoneers.canyon.models.User;
import com.canyoneers.canyon.repositories.GroupRepository;
import com.canyoneers.canyon.repositories.IssueRepository;
import com.canyoneers.canyon.repositories.ResponseRepository;
import com.canyoneers.canyon.repositories.UserRepository;

@Service
public class ResponseService {
    @Autowired
    UserRepository users;
    @Autowired
    IssueRepository issues;
    @Autowired
    ResponseRepository responses;
    @Autowired
    GroupRepository groups;

    public Response createResponse(Map<String, String> json) {
        User user = users.findById(new ObjectId(json.get("userID"))).get();
        Group group = groups.findById(new ObjectId(json.get("groupID"))).get();
        ObjectId issueID = group.currentIssue().getId();

        if (issueID == null)
            return null;

        Issue issue = issues.findById(issueID).get();
        Response newResponse = new Response(json.get("response"), user, group);

        user.addResponse(newResponse);
        issue.addResponse(newResponse);

        users.save(user);
        issues.save(issue);
        groups.save(group);

        return responses.save(newResponse);
    }
}
