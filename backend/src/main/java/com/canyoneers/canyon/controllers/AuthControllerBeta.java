package com.canyoneers.canyon.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.canyoneers.canyon.dto.AuthDto;
import com.canyoneers.canyon.dto.LoginDto;
import com.canyoneers.canyon.services.FirebaseService;

@RestController
@RequestMapping("/auth")
public class AuthControllerBeta {
    @Autowired
    FirebaseService firebaseService;

    @PostMapping
    public ResponseEntity<AuthDto> login(@RequestBody LoginDto login) {
        AuthDto response = firebaseService.login(login);
        if (response == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
