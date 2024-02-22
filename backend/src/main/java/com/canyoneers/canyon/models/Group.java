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
    // TODO: add group configurations here

    @DBRef
    private List<User> users;

    public Group() {
        id = new ObjectId();
        name = "Test Group " + id.toString();
        users = new ArrayList<>();
    }

    public void addUser(User user) {
        users.add(user);
    }
}
