package com.canyoneers.canyon.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.canyoneers.canyon.dto.GroupDto;
import com.canyoneers.canyon.dto.IssueDto;
import com.canyoneers.canyon.models.Issue;
import com.canyoneers.canyon.services.IssueService;

@RestController
@RequestMapping("/issues")
public class IssueController {
    @Autowired
    IssueService issueService;

    @PostMapping
    public Issue createIssue(@RequestHeader(HttpHeaders.AUTHORIZATION) String token,
            @RequestBody IssueDto dto) {
        return issueService.createIssue(token, dto);
    }

    @GetMapping
    public List<Issue> getIssues(@RequestHeader(HttpHeaders.AUTHORIZATION) String token, @RequestBody GroupDto dto,
            @RequestParam(defaultValue = "10") int limit) {
        return issueService.getIssues(token, dto, limit);
    }
}
