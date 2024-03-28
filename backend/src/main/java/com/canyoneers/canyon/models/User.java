package com.canyoneers.canyon.models;

import java.util.ArrayList;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
//import org.springframework.data.mongodb.core.mapping.DBRef;
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
    // private List<ObjectId> friends;
    @DBRef
    private List<Response> responses;

    // joining/leaving groups dealt with in business layer, just make sure groups is
    // updated respectively

    public User() { // boilerplate constructor
        id = new ObjectId();
        name = "Test User " + id.toString();
        email = "test" + id.toString() + "@test.com";
        number = "1234567890";

        groups = new ArrayList<>();
        // friends = new ArrayList<>();
        responses = new ArrayList<>();
    }

    public User(String name) {
        this();
        this.name = name;
    }

    // public boolean addFriend(ObjectId friendId) {
    // return friends.add(friendId);
    // }

    // public boolean removeFriend(ObjectId friendId) {
    // return friends.remove(friendId);
    // }

    public Response addResponse(Response response) {
        if (responses.add(response)) {
            response.setUser(this.id);
            return response;
        } else
            return null;
    }

    public Response deleteResponse(Response response) {
        if (responses.remove(response))
            return response;
        else
            return null;
    }

    public Group joinGroup(Group group) {
        if (groups.add(group.getId())) {
            group.addMember(this);
            return group;
        } else
            return null;
    }

    public boolean leaveGroup(Group group) {
        if (groups.remove(group.getId())) {
            group.removeMember(this);
            return true;
        } else
            return false;
    }
}
