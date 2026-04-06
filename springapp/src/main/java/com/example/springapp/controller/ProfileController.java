package com.example.springapp.controller;

import java.security.Principal;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.example.springapp.entity.Profile;
import com.example.springapp.service.ProfileService;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @PostMapping("/save")
    public ResponseEntity<Profile> saveProfile(@RequestBody Profile profile, Principal principal) {
        return ResponseEntity.ok(profileService.createOrUpdateProfile(profile, getAuthenticatedEmail(principal)));
    }

    @GetMapping("/me")
    public ResponseEntity<Profile> getMyProfile(Principal principal) {
        return ResponseEntity.ok(profileService.getMyProfile(getAuthenticatedEmail(principal)));
    }

    @GetMapping("/{username}")
    public ResponseEntity<Profile> getPublicProfile(@PathVariable String username) {
        return ResponseEntity.ok(profileService.getPublicProfile(username));
    }

    private String getAuthenticatedEmail(Principal principal) {
        if (principal == null || principal.getName() == null || principal.getName().isBlank()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not authenticated");
        }
        return principal.getName();
    }
}
