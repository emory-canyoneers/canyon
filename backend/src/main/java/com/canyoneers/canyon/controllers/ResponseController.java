package com.canyoneers.canyon.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.canyoneers.canyon.models.Issue;
import com.canyoneers.canyon.models.Response;
import com.canyoneers.canyon.repositories.GroupRepository;
import com.canyoneers.canyon.repositories.IssueRepository;
import com.canyoneers.canyon.repositories.ResponseRepository;
import com.canyoneers.canyon.repositories.UserRepository;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/responses")
public class ResponseController {
    @Autowired
    UserRepository users;
    @Autowired
    IssueRepository issues;
    @Autowired
    ResponseRepository responses;
    @Autowired
    GroupRepository groups;

    // TODO: move business logic to services

    @PostMapping("post")
    public Response createResponse(@RequestBody String userID, @RequestParam String response,
            @RequestParam String groupID) {
        // TODO: authenticate user

        // client formats response json w/ string response, user and sends alongside
        // group
        // add group to response, sends to current issue
        // updates issue w/ new response
        // adds response to user

        // response.addGroup(groups.findById(new ObjectId(groupID)).get());
        Response newResponse = new Response(response, users.findById(new ObjectId(userID)).get());

        newResponse.sendToIssue(groups.findById(new ObjectId(groupID)).get());
        Issue issue = newResponse.getIssue();
        if (issue == null) {
            return null;
        } else {
            issues.save(issue);
        }

        return responses.save(newResponse);
    }

}
