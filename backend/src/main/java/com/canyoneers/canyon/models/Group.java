package com.canyoneers.canyon.models;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.canyoneers.canyon.config.ObjectIdSerializer;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import lombok.Data;

@Document("groups-v1")
@Data
public class Group {
    @Id
    @JsonSerialize(using = ObjectIdSerializer.class)
    private ObjectId id;
    private String name;
    private int issueCount;
    private int issueFrequency; // need to manually change, in seconds

    @DBRef
    private User owner;
    @DBRef
    private List<User> members; // including owner
    @DBRef
    private List<Issue> issues; // issues are stored in time order

    public Group() {
        id = new ObjectId();
        issueCount = 0;
        issueFrequency = 180; // default 3 minutes
        members = new ArrayList<>();
        issues = new ArrayList<>();
    }

    public Group(String name, User owner) {
        this();
        this.name = name;
        this.owner = owner;
        members.add(this.owner);
    }

    public Group setName(String name) {
        this.name = name;
        return this;
    }

    public Group setOwner(User user) {
        if (members.contains(user)) {
            owner = user;
            return this;
        }
        return null;
    }

    public boolean addMember(User user) {
        if (!this.members.contains(user)) {
            return this.members.add(user);
        }
        return false;
    }

    public boolean removeMember(User user) {
        if (user.equals(owner))
            return false;
        return members.remove(user);
    }

    public List<User> getMembers() {
        return members;
    }

    public Issue newIssue(String question) {
        if (!currentIssue().getTime().isAfter(LocalTime.now().minusSeconds(issueFrequency))) {
            issueCount++;
            Issue issue = new Issue(this, question);
            if (issues.add(issue)) {
                return issue;
            } else {
                issueCount--;
                return null;
            }
        }
        return null;
    }

    public Issue currentIssue() {
        if (issues.size() == 0)
            return null;
        return issues.get(issues.size() - 1);
    }
}
