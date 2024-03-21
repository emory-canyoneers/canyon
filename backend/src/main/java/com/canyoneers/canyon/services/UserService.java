package com.canyoneers.canyon.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
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
}

