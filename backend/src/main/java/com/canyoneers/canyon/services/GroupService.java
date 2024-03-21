package com.canyoneers.canyon.services;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.canyoneers.canyon.models.Group;
import com.canyoneers.canyon.models.User;
import com.canyoneers.canyon.repositories.GroupRepository;
import com.canyoneers.canyon.repositories.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class GroupService {

    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public Group createGroup(Group group) {
        
        return groupRepository.save(group);
    }

    
    public List<Group> getAllGroups() {
        return groupRepository.findAll();
    }

    
    @Transactional
    public Group updateGroup(String groupId, Group updatedGroup) {
        Optional<Group> groupOptional = groupRepository.findById(new ObjectId(groupId));
        if (groupOptional.isPresent()) {
            Group existingGroup = groupOptional.get();
            existingGroup.setName(updatedGroup.getName());
            
            return groupRepository.save(existingGroup);
        }
        return null; 
    }

    
    @Transactional
    public void deleteGroup(String groupId) {
        groupRepository.deleteById(new ObjectId(groupId));
    }

    
    @Transactional
    public Group addUserToGroup(String groupId, String userId) {
        Optional<Group> groupOptional = groupRepository.findById(new ObjectId(groupId));
        Optional<User> userOptional = userRepository.findById(new ObjectId(userId));
        if (groupOptional.isPresent() && userOptional.isPresent()) {
            Group group = groupOptional.get();
            User user = userOptional.get();
            
            user.joinGroup(group);
            userRepository.save(user);
            
            return group;
        }
        return null; 
    }

    
    @Transactional
    public Group removeUserFromGroup(String groupId, String userId) {
        Optional<Group> groupOptional = groupRepository.findById(new ObjectId(groupId));
        Optional<User> userOptional = userRepository.findById(new ObjectId(userId));
        if (groupOptional.isPresent() && userOptional.isPresent()) {
            Group group = groupOptional.get();
            User user = userOptional.get();
            
            if (user.leaveGroup(group)) {
                userRepository.save(user);
                return group;
            }
        }
        return null; 
    }
}
