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
    private String email;
    private String number;
    // TODO: add user configurations here

    private List<ObjectId> groups;
    @DBRef
    private List<User> friends;
    @DBRef
    private List<Response> responses;

    public User() {
        id = new ObjectId();
        name = "Test User " + id.toString();
        email = "test" + id.toString() + "@test.com";
        number = "1234567890";

        groups = new ArrayList<>();
        friends = new ArrayList<>();
        responses = new ArrayList<>();
    }

    public User(String name, String number) {
        id = new ObjectId();
        this.name = name;
        this.number = number;

        responses = new ArrayList<>();
        friends = new ArrayList<>();
        groups = new ArrayList<>();
    }

    public User(String name, String email, String number) {
        id = new ObjectId();
        this.name = name;
        this.email = email;
        this.number = number;

        responses = new ArrayList<>();
        friends = new ArrayList<>();
        groups = new ArrayList<>();
    }

    public boolean addFriend(User friend) {
        return friends.add(friend);
    }

    public boolean removeFriend(User friend) {
        return friends.remove(friend);
    }

    public boolean addResponse(Response response) {
        return responses.add(response);
    }

    public boolean deleteResponse(Response response) {
        return responses.remove(response);
    }

    public boolean joinGroup(Group group) {
        group.addUser(this);
        return groups.add(group.getId());
    }

    public boolean leaveGroup(Group group) {
        group.removeUser(this);
        return groups.remove(group.getId());
    }
}
