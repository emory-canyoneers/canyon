package com.canyoneers.canyon.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.canyoneers.canyon.models.Group;
import com.canyoneers.canyon.models.Issue;
import com.canyoneers.canyon.models.Response;
import com.canyoneers.canyon.models.User;
import com.canyoneers.canyon.repositories.GroupRepository;
import com.canyoneers.canyon.repositories.IssueRepository;
import com.canyoneers.canyon.repositories.ResponseRepository;
import com.canyoneers.canyon.repositories.UserRepository;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Map;

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

    @PostMapping
    public Response createResponse(@RequestBody Map<String, String> json) {
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

    // @PostMapping("post")
    // public Response createResponse(@RequestBody String userID, @RequestParam
    // String response,
    // @RequestParam String groupID) {
    // // TODO: authenticate user

    // // client formats response json w/ string response, user and sends alongside
    // // group
    // // add group to response, sends to current issue
    // // updates issue w/ new response
    // // adds response to user

    // // response.addGroup(groups.findById(new ObjectId(groupID)).get());
    // User user = users.findById(new ObjectId(userID)).get();
    // Group group = groups.findById(new ObjectId(groupID)).get();
    // ObjectId issueId = group.currentIssueId();

    // if (issueId == null)
    // return null;

    // Issue issue = issues.findById(issueId).get();
    // Response newResponse = new Response(response, user, group);

    // user.addResponse(newResponse.getId());
    // issue.addResponse(newResponse);

    // users.save(user);
    // issues.save(issue);

    // return responses.save(newResponse);
    // }

}
