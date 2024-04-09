package com.canyoneers.canyon.services;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.canyoneers.canyon.dto.IssueDto;
import com.canyoneers.canyon.models.Group;
import com.canyoneers.canyon.models.Issue;
import com.canyoneers.canyon.models.User;
import com.canyoneers.canyon.repositories.GroupRepository;
import com.canyoneers.canyon.repositories.IssueRepository;

@Service
public class IssueService {
    @Autowired
    IssueRepository issues;
    @Autowired
    GroupRepository groups;
    @Autowired
    FirebaseService firebaseService;

    public Issue createIssue(String token, IssueDto dto) {
        User user = firebaseService.fetchUser(token);
        ObjectId groupId = new ObjectId(dto.getGroupID());
        if (user.inGroup(groupId)) {
            throw new RuntimeException("User is not in the group");
        }
        Group group = groups.findById(groupId).get();
        Issue issue = group.newIssue(dto.getQuestion());

        groups.save(group);
        return issues.save(issue);
    }
}
