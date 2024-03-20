package com.canyoneers.canyon.models;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Document("responses")
@Data
public class Response {
    @Id
    private ObjectId id;
    private String response;

    @DBRef
    private User user;
    @DBRef
    Group group;
    @DBRef
    private Issue issue;

    public Response() {
        id = new ObjectId();
        response = "This is test response " + id.toString();

        user = null;
        issue = null;
    }

    public Response(String response, User user) {
        id = new ObjectId();
        this.response = response;

        this.user = user;
        this.group = null;
        this.issue = null;
    }

    public Response(String response, User user, Group group) {
        id = new ObjectId();
        this.response = response;

        this.user = user;
        this.group = group;
        this.issue = group.currentIssue();
    }

    public void addGroup(Group group) {
        this.group = group;
        this.issue = group.currentIssue();
    }

    public boolean sendToIssue(Group group) { // keep group? or remove from class and pass in service layer
        if (group != null) {
            return group.currentIssue().addResponse(this);
        } else
            return false;
    }
}
