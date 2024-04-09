package com.canyoneers.canyon.services;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.canyoneers.canyon.dto.AuthDto;
import com.canyoneers.canyon.dto.SignupDto;
import com.canyoneers.canyon.models.User;
import com.canyoneers.canyon.repositories.UserRepository;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    GroupService groupService;

    @Autowired
    AuthService authService;

    public AuthDto createUser(SignupDto dto) {
        AuthDto auth = authService.signup(dto);
        User user = new User(new ObjectId(), auth.getFId(), dto.getName(), dto.getEmail());
        userRepository.save(user);
        return auth;
    }

    public boolean addUserToGroup(String userId, String groupId) {
        return groupService.addUserToGroup(groupId, userId) != null;
    }

    @Transactional
    public boolean deleteUser(String fId) {
        if (!userRepository.existsByfId(fId)) {
            return false;
        }
        userRepository.deleteByfId(fId);
        return true;
    }

}
