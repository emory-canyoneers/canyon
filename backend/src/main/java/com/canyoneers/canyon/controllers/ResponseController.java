package com.canyoneers.canyon.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.canyoneers.canyon.dto.ResponseDto;
import com.canyoneers.canyon.models.Response;
import com.canyoneers.canyon.services.ResponseService;

import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.Map;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

@RestController
@RequestMapping("/responses")
public class ResponseController {
    @Autowired
    ResponseService responseService;

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

    @GetMapping("/{issueId}")
    public List<Response> getResponses(@RequestHeader(HttpHeaders.AUTHORIZATION) String token,
            @PathVariable String issueId) {
        return responseService.getResponses(token, issueId);
    }

    @PutMapping("/{responseId}")
    public ResponseEntity<Response> editResponse(@PathVariable String responseId,
            @RequestBody Map<String, String> update) {
        String newText = update.get("newText");
        Response updatedResponse = responseService.editResponse(new ObjectId(responseId), newText);
        return ResponseEntity.ok(updatedResponse);
    }
}
