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
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class GroupService {
    @Autowired
    private GroupRepository groupRepository;
    @Autowired
    private UserRepository userRepository;

    @Transactional
    public List<Object> createGroup(Map<String, String> json) {
        User user = userRepository.findById(new ObjectId(json.get("userID"))).get();

        if (user == null)
            return null;

        Group group = new Group(user);
        group.setName(json.get("name"));
        user.joinGroup(group);

        group = groupRepository.save(group);
        user = userRepository.save(user);
        List<Object> response = List.of(group, user);
        return response;
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
    public boolean deleteGroup(String groupId) {
        ObjectId id = new ObjectId(groupId);
        if(!groupRepository.existsById(id)){
            return false;
        }
        groupRepository.deleteById(new ObjectId(groupId));
        return true;
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

    public List<Group> findGroupsByUserId(String userId, int n){
        ObjectId userObjectId = new ObjectId(userId);
        List<Group> groups = groupRepository.findByMembersContains(userObjectId);
        return groups.stream().limit(n).collect(Collectors.toList());
    }
}
