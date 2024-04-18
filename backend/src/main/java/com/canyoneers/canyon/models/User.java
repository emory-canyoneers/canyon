package com.canyoneers.canyon.models;

import java.util.ArrayList;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.canyoneers.canyon.config.ObjectIdSerializer;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import lombok.Data;

@Document("users-v1")
@Data
public class User {
    @Id
    @JsonSerialize(using = ObjectIdSerializer.class)
    private ObjectId id;
    private String fId; // firebase id
    private String name;
    private String email;
    private List<ObjectId> groups;
    @DBRef
    private List<Response> responses;

    public User() { // boilerplate constructor
        groups = new ArrayList<>();
        responses = new ArrayList<>();
    }

    public User(ObjectId id, String fId, String name, String email) {
        this();
        this.id = id;
        this.fId = fId;
        this.name = name;
        this.email = email;
    }

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

    public boolean inGroup(ObjectId group) {
        return groups.contains(group);
    }

    public boolean leaveGroup(Group group) {
        if (groups.remove(group.getId())) {
            group.removeMember(this);
            return true;
        } else
            return false;
    }
}
