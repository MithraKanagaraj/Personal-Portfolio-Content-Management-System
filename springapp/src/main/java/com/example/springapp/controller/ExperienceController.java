package com.example.springapp.controller;

import java.security.Principal;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.example.springapp.entity.Experience;
import com.example.springapp.service.ExperienceService;

@RestController
@RequestMapping("/api/experiences")
public class ExperienceController {

    private final ExperienceService experienceService;

    public ExperienceController(ExperienceService experienceService) {
        this.experienceService = experienceService;
    }

    @PostMapping
    public ResponseEntity<Experience> addExperience(@RequestBody Experience experience, Principal principal) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(experienceService.addExperience(experience, getAuthenticatedEmail(principal)));
    }

    @GetMapping
    public ResponseEntity<List<Experience>> getExperiences(Principal principal) {
        return ResponseEntity.ok(experienceService.getMyExperiences(getAuthenticatedEmail(principal)));
    }

    @GetMapping("/public/{username}")
    public ResponseEntity<List<Experience>> getPublicExperiences(@PathVariable String username) {
        return ResponseEntity.ok(experienceService.getPublicExperiences(username));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteExperience(@PathVariable Long id, Principal principal) {
        experienceService.deleteExperience(id, getAuthenticatedEmail(principal));
        return ResponseEntity.ok(Map.of("message", "Experience deleted successfully"));
    }

    private String getAuthenticatedEmail(Principal principal) {
        if (principal == null || principal.getName() == null || principal.getName().isBlank()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not authenticated");
        }
        return principal.getName();
    }
}
