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
    private Issue issue;

    public Response() {
        id = new ObjectId();
        response = "This is test response " + id.toString();

        user = null;
        issue = null;
    }

    public Response(String response, User user, Issue issue) {
        id = new ObjectId();
        this.response = response;

        this.user = user;
        this.issue = issue;
    }
}
