package com.canyoneers.canyon.models;

import java.util.ArrayList;
import java.time.LocalDate;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.canyoneers.canyon.config.ObjectIdSerializer;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import lombok.Data;

@Document("issues")
@Data
public class Issue {
    @Id
    @JsonSerialize(using = ObjectIdSerializer.class)
    private ObjectId id;
    private int issueNumber;
    // potentially issue name? or should it just be question?
    private LocalDate date; // can just be week number? may need tweaking depending on final model
    private String question;

    @JsonSerialize(using = ObjectIdSerializer.class)
    private ObjectId group;
    @DBRef
    private List<Response> responses;

    public Issue() { // boilerplate constructor
        id = new ObjectId();
        date = LocalDate.now();
        question = "Test question " + id.toString();
    }

    public Issue(Group group, String question) {
        this();
        this.issueNumber = group.getIssueCount();
        this.question = question;
        this.group = group.getId();
        responses = new ArrayList<>();
    }

    public Response addResponse(Response response) {
        if (responses.add(response))
            return response;
        else
            return null;
    }

    public Response editResponse(Response response) {
        if (responses.set(responses.indexOf(response), response) != null)
            return response;
        else
            return null;
    }

    public Response removeResponse(Response response) {
        if (responses.remove(response))
            return response;
        else
            return null;
    }
}
