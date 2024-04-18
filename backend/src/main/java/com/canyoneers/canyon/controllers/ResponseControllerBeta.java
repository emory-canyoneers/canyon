package com.canyoneers.canyon.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.canyoneers.canyon.dto.ResponseDto;
import com.canyoneers.canyon.models.Response;
import com.canyoneers.canyon.services.ResponseService;

import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

@RestController
@RequestMapping("/responses")
public class ResponseControllerBeta {
    @Autowired
    ResponseService responseService;

    /**
     * Create a response to a group's current issue
     * 
     * @param token User authentication token
     * @param dto   Response info (groupId and response)
     * @return
     */
    @PostMapping
    public Response createResponse(@RequestHeader(HttpHeaders.AUTHORIZATION) String token,
            @RequestBody ResponseDto dto) {
        return responseService.createResponse(token, dto);
    }

    // @GetMapping("/{userId}")
    // public List<Response> getUserResponses(@PathVariable String userId,
    // @RequestParam(defaultValue = "10") int limit) {
    // return responseService.findResponsesByUserId(userId, limit);
    // }

    /**
     * Fetch all responses for the specified issue
     * 
     * @param token   User authentication token
     * @param issueId Issue ID
     * @return List of responses
     */
    @GetMapping("/{issueId}")
    public List<Response> getResponses(@RequestHeader(HttpHeaders.AUTHORIZATION) String token,
            @PathVariable String issueId) {
        return responseService.getResponses(token, issueId);
    }

    /**
     * Edit a response
     * 
     * @param token User authentication token
     * @param dto   New response information (responseId, response)
     * @return Edited response
     */
    @PutMapping
    public Response editResponse(@RequestHeader(HttpHeaders.AUTHORIZATION) String token,
            @RequestBody ResponseDto dto) {
        return responseService.editResponse(token, dto);
    }
}
