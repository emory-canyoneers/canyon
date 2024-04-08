package com.canyoneers.canyon.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.canyoneers.canyon.models.Response;
import com.canyoneers.canyon.services.ResponseService;

import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

    @PutMapping("/{responseId}")
    public ResponseEntity<Response> editResponse(@PathVariable String responseId, @RequestBody Map<String, String> update) {
        String newText = update.get("newText");
        Response updatedResponse = responseService.editResponse(new ObjectId(responseId), newText);
        return ResponseEntity.ok(updatedResponse);
    }
}
