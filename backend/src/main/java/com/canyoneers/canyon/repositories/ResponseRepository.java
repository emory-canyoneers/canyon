package com.canyoneers.canyon.repositories;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.canyoneers.canyon.models.Response;

public interface ResponseRepository extends MongoRepository<Response, ObjectId> {
    // may not be needed as response lookup will happen with user?
    List<Response> findByUser(ObjectId user);
}
