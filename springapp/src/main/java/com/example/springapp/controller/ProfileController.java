package com.example.springapp.controller;



import com.example.springapp.dto.ProfileRequest;
import com.example.springapp.dto.ProfileResponse;
import com.example.springapp.service.ProfileService;

import java.security.Principal;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin("*")
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @PostMapping("/save")
public ResponseEntity<ProfileResponse> saveProfile(@RequestBody ProfileRequest request,
                                                   Principal principal) {

    if (principal == null) {
        throw new RuntimeException("User not authenticated. Please login first.");
    }

    return ResponseEntity.ok(
            profileService.createOrUpdateProfile(request, principal.getName())
    );
}

    @GetMapping("/me")
    public ResponseEntity<ProfileResponse> getMyProfile(Principal principal) {
        return ResponseEntity.ok(
                profileService.getMyProfile(principal.getName())
        );
    }

    @GetMapping("/{username}")
    public ResponseEntity<ProfileResponse> getPublicProfile(@PathVariable String username) {
        return ResponseEntity.ok(
                profileService.getPublicProfile(username)
        );
    }
}