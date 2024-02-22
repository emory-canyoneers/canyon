package com.canyoneers.canyon.repositories;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.canyoneers.canyon.models.Group;

public interface GroupRepository extends MongoRepository<Group, ObjectId> {
    public List<Group> findGroupsByName(String string);
}
