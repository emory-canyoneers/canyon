package com.canyoneers.canyon.services;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.canyoneers.canyon.config.APIKeys;
import com.canyoneers.canyon.dto.AuthDto;
import com.canyoneers.canyon.dto.LoginDto;
import com.canyoneers.canyon.dto.SignupDto;
import com.canyoneers.canyon.models.User;
import com.canyoneers.canyon.repositories.UserRepository;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.Data;

@Service
public class FirebaseService {
    @Autowired
    APIKeys apiKeys;
    @Autowired
    UserRepository userRepository;

    final ObjectMapper objectMapper = new ObjectMapper().configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,
            false);
    final HttpClient client = HttpClient.newHttpClient();
    static final String loginUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
    static final String signupUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
    static final String lookupUrl = "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=";
    static final String deleteUrl = "https://identitytoolkit.googleapis.com/v1/accounts:delete?key=";

    public AuthDto login(LoginDto login) {
        try {
            HttpRequest request = buildRequest(loginUrl, login.toJson());
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() == 200) {
                AuthResponse authResponse = objectMapper.readValue(response.body(), AuthResponse.class);
                AuthDto authDto = new AuthDto();
                authDto.setToken(authResponse.idToken);
                authDto.setExpiry(authResponse.expiresIn);
                return authDto;
            }

            return null; // failed
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public AuthDto signup(SignupDto signup) {
        try {
            HttpRequest request = buildRequest(signupUrl, signup.toJson());
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() == 200) {
                AuthResponse authResponse = objectMapper.readValue(response.body(), AuthResponse.class);
                AuthDto authDto = new AuthDto();
                authDto.setFId(authResponse.localId);
                authDto.setToken(authResponse.idToken);
                authDto.setExpiry(authResponse.expiresIn);
                return authDto;
            }

            return null; // failed
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public String fetchUserFId(String token) {
        try {
            HttpRequest request = buildRequest(lookupUrl, "{\"idToken\":\"" + token + "\"}");
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() == 200) {
                LookupResponse lookupResponse = objectMapper.readValue(response.body(), LookupResponse.class);
                return lookupResponse.users.get(0).getLocalId();
            }

            return null;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public User fetchUser(String token) {
        token = token.replaceFirst("Bearer ", "");
        String fId = fetchUserFId(token);
        if (fId == null)
            return null;
        return userRepository.findFirstByfId(fId);
    }

    public boolean deleteUser(String token) {
        try {
            HttpRequest request = buildRequest(deleteUrl, "{\"idToken\":\"" + token + "\"}");
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            return response.statusCode() == 200;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    private HttpRequest buildRequest(String url, String body) {
        return HttpRequest.newBuilder().uri(URI.create(url + apiKeys.firebaseApiKey))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(body))
                .build();
    }
}

@Data
class AuthResponse {
    String idToken;
    String localId;
    int expiresIn;
}

@Data
class LookupResponse {
    List<FirebaseUser> users;
}

@Data
class FirebaseUser {
    String localId;
}