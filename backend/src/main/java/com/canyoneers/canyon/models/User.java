package com.canyoneers.canyon.models;

import java.util.ArrayList;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Document("users")
@Data
public class User {
    @Id
    private ObjectId id;

    private String name;
    // TODO: add user configurations here

    @DBRef
    private List<User> friends;
    @DBRef
    private List<Response> responses;
    @DBRef
    private List<Group> groups;

    public User() {
        id = new ObjectId();
        name = "Test User " + id.toString();
        responses = new ArrayList<>();
        groups = new ArrayList<>();
    }

    public void addFriend(User friend) {
        friends.add(friend);
    }

    public void addResponse(Response response) {
        responses.add(response);
    }

    public void joinGroup(Group group) {
        groups.add(group);
    }
}
