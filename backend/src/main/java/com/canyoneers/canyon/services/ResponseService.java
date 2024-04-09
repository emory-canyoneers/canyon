package com.canyoneers.canyon.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.canyoneers.canyon.dto.ResponseDto;
import com.canyoneers.canyon.models.Group;
import com.canyoneers.canyon.models.Issue;
import com.canyoneers.canyon.models.Response;
import com.canyoneers.canyon.models.User;
import com.canyoneers.canyon.repositories.GroupRepository;
import com.canyoneers.canyon.repositories.IssueRepository;
import com.canyoneers.canyon.repositories.ResponseRepository;
import com.canyoneers.canyon.repositories.UserRepository;

@Service
public class ResponseService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    IssueRepository issueRepository;
    @Autowired
    GroupRepository groupRepository;
    @Autowired
    ResponseRepository responseRepository;

    @Autowired
    FirebaseService firebaseService;

    public Response createResponse(String token, ResponseDto dto) {
        User user = firebaseService.fetchUser(token);
        ObjectId groupId = new ObjectId(dto.getGroupId());
        if (!user.inGroup(groupId)) {
            throw new RuntimeException("User is not in the group");
        }
        Group group = groupRepository.findById(groupId).get();
        ObjectId issueID = group.currentIssue().getId();

        Issue issue = issueRepository.findById(issueID).get();
        issue.getResponses().forEach(response -> {
            if (response.getUser() == user.getId())
                throw new RuntimeException("User has already responded to this issue");
        });
        Response newResponse = new Response(dto.getResponse(), user, group);

        user.addResponse(newResponse);
        issue.addResponse(newResponse);

        userRepository.save(user);
        issueRepository.save(issue);
        groupRepository.save(group);

        return responseRepository.save(newResponse);
    }

    public List<Response> getResponses(String token, String issueIdStr) {
        User user = firebaseService.fetchUser(token);
        ObjectId issueId = new ObjectId(issueIdStr);
        Issue issue = issueRepository.findById(issueId).get();
        if (!user.inGroup(issue.getGroup())) {
            throw new RuntimeException("User is not in the group");
        }
        return issue.getResponses().stream().collect(Collectors.toList());
    }

    public List<Response> findResponsesByUserId(String userId, int n) {
        ObjectId userObjectId = new ObjectId(userId);
        List<Response> responses = responseRepository.findByUser(userObjectId);
        return responses.stream().limit(n).collect(Collectors.toList());
    }

    public Response editResponse(ObjectId responseId, String newResponse) {
        Optional<Response> responseOpt = responseRepository.findById(responseId);
        if (responseOpt.isPresent()) {
            Response response = responseOpt.get();
            response.setResponse(newResponse);
            return responseRepository.save(response);
        } else {
            throw new RuntimeException("Response not found with id:" + responseId);
        }
    }
}
