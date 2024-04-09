package com.canyoneers.canyon.repositories;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.canyoneers.canyon.models.Issue;

public interface IssueRepository extends MongoRepository<Issue, ObjectId> {

}
