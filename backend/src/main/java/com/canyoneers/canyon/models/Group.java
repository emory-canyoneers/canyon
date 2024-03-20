package com.canyoneers.canyon.models;

import java.util.ArrayList;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
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

    @DBRef
    private User owner;
    @DBRef
    private List<User> users; // including owner
    @DBRef
    private List<Issue> issues; // issues are stored in time order

    public Group() {
        id = new ObjectId();
        name = "Test Group " + id.toString();
        issueCount = 0;

        owner = new User();
        users = new ArrayList<>();
        issues = new ArrayList<>();
    }

    public Group(String name, User owner) {
        id = new ObjectId();
        this.name = name;
        issueCount = 0;

        this.owner = owner;
        users = new ArrayList<>();
        users.add(owner);
        issues = new ArrayList<>();
    }

    public boolean addUser(User user) {
        return users.add(user);
    }

    public boolean removeUser(User user) {
        if (user.equals(owner))
            return false;
        return users.remove(user);
    }

    public boolean newIssue(String question) {
        if (issues.add(new Issue(issueCount, this, question))) {
            issueCount++;
            return true;
        } else
            return false;
    }

    public Issue currentIssue() {
        if (issues.size() == 0)
            return null;
        return issues.get(issues.size() - 1);
    }
}
