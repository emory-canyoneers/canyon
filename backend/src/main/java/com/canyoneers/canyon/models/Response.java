package com.canyoneers.canyon.models;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Document("responses")
@Data
public class Response {
    @Id
    private ObjectId id;
    private String response;

    private String user;
    private ObjectId group;
    private ObjectId issue;

    // will be created in service and passed to issue in business layer

    public Response() { // boilerplate constructor
        id = new ObjectId();
        response = "This is test response " + id.toString();
    }

    public Response(String response, User user, Group group) {
        this();
        this.response = response;

        this.user = user.getId();
        this.group = group.getId();
        Issue currIssue = group.currentIssue();
        this.issue = currIssue != null ? currIssue.getId() : null;
    }
}
