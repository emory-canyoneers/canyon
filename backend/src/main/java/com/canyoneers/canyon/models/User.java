package com.canyoneers.canyon.models;

import java.util.ArrayList;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
//import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Document("users")
@Data
public class User {
    @Id
    private ObjectId id;

    private String name;
    // TODO: add user configurations here

    private List<ObjectId> groups;
    private List<ObjectId> friends;
    private List<ObjectId> responses;

    public User() {
        id = new ObjectId();
        name = "Test User " + id.toString();
        responses = new ArrayList<>();
        friends = new ArrayList<>(); 
        groups = new ArrayList<>();
    }

    public User(String name) {
        this(); 
        this.name = name;
    }

    public boolean addFriend(ObjectId friendId) {
        return friends.add(friendId);
    }

    public boolean removeFriend(ObjectId friendId) {
        return friends.remove(friendId);
    }

    public boolean addResponse(ObjectId responseId) {
        return responses.add(responseId);
    }

    public boolean deleteResponse(ObjectId responseId) {
        return responses.remove(responseId);
    }

    public boolean joinGroup(Group group) {
        group.addUser(this.id);
        return groups.add(group.getId());
    }

    public boolean leaveGroup(Group group) {
        group.removeUser(this.id);
        return groups.remove(group.getId());
    }
}
