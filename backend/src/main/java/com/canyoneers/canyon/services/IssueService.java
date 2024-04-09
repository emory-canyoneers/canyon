package com.canyoneers.canyon.services;

import java.util.ArrayList;
import java.util.List;

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
        ObjectId groupId = new ObjectId(dto.getGroupId());
        if (!user.inGroup(groupId)) {
            throw new RuntimeException("User is not in the group");
        }
        Group group = groups.findById(groupId).get();
        Issue issue = group.newIssue(dto.getQuestion());

        groups.save(group);
        return issues.save(issue);
    }

    public List<Issue> getIssues(String token, String groupIdStr, int limit) {
        User user = firebaseService.fetchUser(token);
        ObjectId groupId = new ObjectId(groupIdStr);
        if (!user.inGroup(groupId)) {
            throw new RuntimeException("User is not in the group");
        }
        Group group = groups.findById(groupId).get();
        List<Issue> issues = group.getIssues();
        List<Issue> chronologicalIssues = new ArrayList<>();
        for (int i = issues.size() - 1; i >= issues.size() - limit && i >= 0; i--) {
            chronologicalIssues.add(issues.get(i));
        }
        return chronologicalIssues;
    }
}
