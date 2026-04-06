package com.example.springapp.service;

import com.example.springapp.entity.Profile;

public interface ProfileService {

    Profile createOrUpdateProfile(Profile profile, String email);

    Profile getMyProfile(String email);

    Profile getPublicProfile(String username);
}
