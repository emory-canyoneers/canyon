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

    public Response() {
        id = new ObjectId();
        response = "This is test response " + id.toString();
    }

    public Response(String response) {
        id = new ObjectId();
        this.response = response;
    }
}
