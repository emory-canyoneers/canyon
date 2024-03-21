package com.canyoneers.canyon.models;

import java.util.ArrayList;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Document("groups")
@Data
public class Group {
    @Id
    private ObjectId id;
    private String name;
    private int issueCount;
    // TODO: add group configurations here
    // TODO: issue time and frequency

    private ObjectId owner;
    private List<ObjectId> users; // including owner
    private List<ObjectId> issues; // issues are stored in time order

    public Group() {
        id = new ObjectId();
        name = "Test Group " + id.toString();
        issueCount = 0;

        owner = null;
        users = new ArrayList<>();
        issues = new ArrayList<>();
    }

    public Group(String name) {
        this();
        this.name = name;
    }

    public boolean addUser(ObjectId userId) {
        return users.add(userId);
    }

    public boolean removeUser(ObjectId userId) {
        if (userId.equals(owner))
            return false;
        return users.remove(userId);
    }

    public List<ObjectId> getMemberIds() {
        return users;
    }

    public void addMemberId(ObjectId memberId) {
        if (!this.users.contains(memberId)) {
            this.users.add(memberId);
        }
    }

    public boolean newIssue(Issue issue) {
        if (issues.add(issue.getId())) {
            issueCount++;
            return true;
        } else
            return false;
    }

    public ObjectId currentIssueId() {
        if (issues.size() == 0)
            return null;
        return issues.get(issues.size() - 1);
    }
}
