package com.canyoneers.canyon.repositories;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.canyoneers.canyon.models.User;
import java.util.List;

public interface UserRepository extends MongoRepository<User, ObjectId> {
    public List<User> findByName(String name);

    public User findFirstByEmail(String email);

    public boolean existsByfId(String fId);

    public void deleteByfId(String fId);

    public User findFirstByfId(String fId);
}
