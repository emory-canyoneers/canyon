package com.canyoneers.canyon.services;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.canyoneers.canyon.dto.AuthDto;
import com.canyoneers.canyon.dto.LoginDto;
import com.canyoneers.canyon.models.User;
import com.canyoneers.canyon.repositories.UserRepository;
import com.canyoneers.canyon.config.APIKeys;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private GroupService groupService;

    @Autowired
    private APIKeys apiKeys;

    public final HttpClient client = HttpClient.newHttpClient();
    public static final String loginUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";

    public User createUser(String name) {
        User user = new User(name);
        return userRepository.save(user);
    }

    public boolean addUserToGroup(String userId, String groupId) {
        return groupService.addUserToGroup(groupId, userId) != null;
    }

    public AuthDto login(LoginDto login) {
        try {
            HttpRequest request = HttpRequest.newBuilder().uri(URI.create(loginUrl + apiKeys.firebaseApiKey))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(login.toJson()))
                    .build();
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            AuthDto authDto = new AuthDto();
            authDto.setUserId(userRepository.findFirstByEmail(login.getEmail()).getId());
            authDto.setToken(response.body());
            authDto.setExpiry(3600);

            if (response.statusCode() == 200) {
                return authDto;
            }
            return null;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
