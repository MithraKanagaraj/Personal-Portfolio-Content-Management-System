package com.example.springapp.controller;

import java.security.Principal;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.example.springapp.entity.Resume;
import com.example.springapp.service.ResumeService;

@RestController
@RequestMapping("/api/resume")
public class ResumeController {

    private final ResumeService resumeService;

    public ResumeController(ResumeService resumeService) {
        this.resumeService = resumeService;
    }

    @PostMapping
    public ResponseEntity<Resume> saveResume(@RequestBody Resume resume, Principal principal) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(resumeService.saveResume(resume, getAuthenticatedEmail(principal)));
    }

    @GetMapping
    public ResponseEntity<Resume> getResume(Principal principal) {
        return ResponseEntity.ok(resumeService.getMyResume(getAuthenticatedEmail(principal)));
    }

    private String getAuthenticatedEmail(Principal principal) {
        if (principal == null || principal.getName() == null || principal.getName().isBlank()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not authenticated");
        }
        return principal.getName();
    }
}
