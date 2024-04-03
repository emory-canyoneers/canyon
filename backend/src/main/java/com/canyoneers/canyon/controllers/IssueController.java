package com.canyoneers.canyon.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.canyoneers.canyon.models.Issue;
import com.canyoneers.canyon.services.IssueService;

@RestController
@RequestMapping("/issues")
public class IssueController {
    @Autowired
    IssueService issueService;

    @PostMapping
    public Issue createIssue(@RequestBody Map<String, String> json) {
        return issueService.createIssue(json);
    }
}
