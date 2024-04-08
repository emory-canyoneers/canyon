package com.canyoneers.canyon.services;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.canyoneers.canyon.models.User;
import com.canyoneers.canyon.repositories.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private GroupService groupService;

    public User createUser(String name) {
        User user = new User(name);
        return userRepository.save(user);
    }

    public boolean addUserToGroup(String userId, String groupId) {
        return groupService.addUserToGroup(groupId, userId) != null;
    }

    @Transactional
    public boolean deleteUser(String userId) {
        ObjectId id = new ObjectId(userId);
        if(!userRepository.existsById(id)){
            return false;
        }
        userRepository.deleteById(new ObjectId(userId));
        return true;
    }

}
