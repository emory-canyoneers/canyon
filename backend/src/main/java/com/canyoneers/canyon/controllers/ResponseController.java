package com.canyoneers.canyon.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.canyoneers.canyon.models.Response;
import com.canyoneers.canyon.services.ResponseService;

import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/responses")
public class ResponseController {
    @Autowired
    ResponseService responseService;

    @PostMapping
    public Response createResponse(@RequestBody Map<String, String> json) {
        return responseService.createResponse(json);
    }
}
