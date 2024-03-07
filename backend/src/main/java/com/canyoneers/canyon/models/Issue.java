package com.canyoneers.canyon.models;

import java.util.ArrayList;
import java.time.LocalDate;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Document("issues")
@Data
public class Issue {
    @Id
    private ObjectId id;
    private int issueNumber;
    // potentially issue name? or should it just be question?
    private LocalDate date; // can just be week number? may need tweaking depending on final model
    private String question;

    @DBRef
    private Group group;
    @DBRef
    private List<Response> responses;

    public Issue() {
        id = new ObjectId();
        issueNumber = -1;
        date = LocalDate.now();
        question = "Test question " + id.toString();

        group = null;
        responses = null;
    }

    public Issue(Group group) {
        id = new ObjectId();
        issueNumber = -1;
        date = LocalDate.now();
        question = "Test question " + id.toString();

        this.group = group;
        responses = new ArrayList<>();
    }

    public Issue(int issueNumber, Group group, String question) {
        id = new ObjectId();
        this.issueNumber = issueNumber;
        date = LocalDate.now();
        this.question = question;

        this.group = group;
        responses = new ArrayList<>();
    }

    public boolean addResponse(Response response) {
        return responses.add(response);
    }

    public boolean editResponse(Response response) {
        return responses.set(responses.indexOf(response), response) != null;
    }

    public boolean removeResponse(Response response) {
        return responses.remove(response);
    }
}
