package com.canyoneers.canyon.services;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.canyoneers.canyon.dto.GroupDto;
import com.canyoneers.canyon.models.Group;
import com.canyoneers.canyon.models.User;
import com.canyoneers.canyon.repositories.GroupRepository;
import com.canyoneers.canyon.repositories.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class GroupService {
    @Autowired
    GroupRepository groupRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    FirebaseService firebaseService;

    @Transactional
    public Group createGroup(String token, GroupDto groupDto) {
        User user = firebaseService.fetchUser(token);
        Group group = new Group(groupDto.getName(), user);
        user.joinGroup(group);

        group = groupRepository.save(group);
        user = userRepository.save(user);
        return group;
    }

    public List<Group> getAllGroups() {
        return groupRepository.findAll();
    }

    @Transactional
    public ResponseEntity<?> deleteGroup(String token, String groupId) {
        User user = firebaseService.fetchUser(token);

        ObjectId id = new ObjectId(groupId);
        Group group = groupRepository.findById(id).get();

        if (group == null || !group.getOwner().equals(user)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        groupRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @Transactional
    public Group addUserToGroup(String token, String groupId) {
        User user = firebaseService.fetchUser(token);

        Group group = groupRepository.findById(new ObjectId(groupId)).get();
        if (group == null)
            return null;

        group = user.joinGroup(group);
        userRepository.save(user);
        groupRepository.save(group);

        return group;
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

    public List<Group> findGroupsByUserId(String token) {
        User user = firebaseService.fetchUser(token);

        List<Group> groups = new ArrayList<>();
        for (ObjectId groupId : user.getGroups()) {
            Optional<Group> groupOptional = groupRepository.findById(groupId);
            if (groupOptional.isPresent()) {
                groups.add(groupOptional.get());
            }
        }

        return groups.stream().collect(Collectors.toList());
    }
}
