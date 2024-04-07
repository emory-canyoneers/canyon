package com.canyoneers.canyon.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.canyoneers.canyon.dto.AuthDto;
import com.canyoneers.canyon.dto.LoginDto;
import com.canyoneers.canyon.services.AuthService;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    AuthService authService;

    @PostMapping
    public AuthDto login(@RequestBody LoginDto login) {
        return authService.login(login);
    }
}
