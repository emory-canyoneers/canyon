package com.canyoneers.canyon.models;

import java.util.ArrayList;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
//import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Document("groups")
@Data
public class Group {
    @Id
    private ObjectId id;
    private String name;
    // TODO: add group configurations here

    private List<ObjectId> users;

    public Group() {
        id = new ObjectId();
        name = "Test Group " + id.toString();
        users = new ArrayList<>();
    }

    public Group(String name) {
        this();
        this.name = name; 
    }

    public boolean addUser(ObjectId userId) {
        return users.add(userId);
    }

    public boolean removeUser(ObjectId userId) {
        return users.remove(userId);
    }
}
