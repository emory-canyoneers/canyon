package com.canyoneers.canyon.models;

import java.util.ArrayList;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
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

    @JsonSerialize(contentUsing = ObjectIdSerializer.class)
    private List<ObjectId> groups;

    public User() { // boilerplate constructor
        groups = new ArrayList<>();
    }

    public User(ObjectId id, String fId, String name, String email) {
        this();
        this.id = id;
        this.fId = fId;
        this.name = name;
        this.email = email;
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
