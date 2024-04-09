package com.canyoneers.canyon.models;

import java.util.ArrayList;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.canyoneers.canyon.config.ObjectIdListSerializer;
import com.canyoneers.canyon.config.ObjectIdSerializer;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import lombok.Data;

@Document("groups")
@Data
public class Group {
    @Id
    @JsonSerialize(using = ObjectIdSerializer.class)
    private ObjectId id;
    private String name;
    private int issueCount;
    // TODO: add group configurations here
    // TODO: issue time and frequency

    @JsonSerialize(using = ObjectIdSerializer.class)
    private ObjectId owner;
    @JsonSerialize(using = ObjectIdListSerializer.class)
    private List<ObjectId> members; // including owner
    @DBRef
    private List<Issue> issues; // issues are stored in time order

    public Group() {
        id = new ObjectId();
        issueCount = 0;
        members = new ArrayList<>();
        issues = new ArrayList<>();
    }

    public Group(String name, User owner) {
        this();
        this.name = name;
        this.owner = owner.getId();
        members.add(this.owner);
    }

    public Group setName(String name) {
        this.name = name;
        return this;
    }

    public Group setOwner(User user) {
        if (members.contains(user.getId())) {
            owner = user.getId();
            return this;
        }
        return null;
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

    public Issue newIssue(String question) {
        issueCount++;
        Issue issue = new Issue(this, question);
        if (issues.add(issue)) {
            return issue;
        } else {
            issueCount--;
            return null;
        }
    }

    public Issue currentIssue() {
        if (issues.size() == 0)
            return null;
        return issues.get(issues.size() - 1);
    }
}
