package com.canyoneers.canyon.services;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.canyoneers.canyon.config.APIKeys;
import com.canyoneers.canyon.dto.AuthDto;
import com.canyoneers.canyon.dto.LoginDto;
import com.canyoneers.canyon.repositories.UserRepository;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.Data;

@Service
public class AuthService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    APIKeys apiKeys;

    final ObjectMapper objectMapper = new ObjectMapper().configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,
            false);
    final HttpClient client = HttpClient.newHttpClient();
    static final String loginUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";

    public AuthDto login(LoginDto login) {
        try {
            HttpRequest request = HttpRequest.newBuilder().uri(URI.create(loginUrl + apiKeys.firebaseApiKey))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(login.toJson()))
                    .build();
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() == 200) {
                AuthResponse authResponse = objectMapper.readValue(response.body(), AuthResponse.class);
                AuthDto authDto = new AuthDto();
                authDto.setUserId(userRepository.findFirstByEmail(login.getEmail()).getId().toString());
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
}

@Data
class AuthResponse {
    String idToken;
    int expiresIn;
}
