package com.example.springapp.service;



import com.example.springapp.dto.ProfileRequest;
import com.example.springapp.dto.ProfileResponse;

public interface ProfileService {
    ProfileResponse createOrUpdateProfile(ProfileRequest request, String email);
    ProfileResponse getMyProfile(String email);
    ProfileResponse getPublicProfile(String username);
}