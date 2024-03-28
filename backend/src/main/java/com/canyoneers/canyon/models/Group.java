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
    private List<ObjectId> members; // including owner
    private List<ObjectId> issues; // issues are stored in time order

    public Group() {
        id = new ObjectId();
        name = "Test Group " + id.toString();
        issueCount = 0;

        owner = null;
        members = new ArrayList<>();
        issues = new ArrayList<>();
    }

    public Group(User owner) {
        this();
        this.owner = owner.getId();
        members.add(this.owner);
    }

    public boolean addMember(User user) {
        if (!this.members.contains(user.getId())) {
            return this.members.add(user.getId());
        }
        return false;
    }

    public boolean removeMember(User user) {
        if (user.getId().equals(owner))
            return false;
        return members.remove(user.getId());
    }

    public List<ObjectId> getMembers() {
        return members;
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
