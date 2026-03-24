package com.example.springapp.serviceimpl;



import com.example.springapp.dto.ProfileRequest;
import com.example.springapp.dto.ProfileResponse;
import com.example.springapp.entity.Profile;
import com.example.springapp.entity.User;
import com.example.springapp.repository.ProfileRepository;
import com.example.springapp.repository.UserRepository;
import com.example.springapp.service.ProfileService;

import org.springframework.stereotype.Service;

@Service
public class ProfileServiceImpl implements ProfileService {

    private final ProfileRepository profileRepository;
    private final UserRepository userRepository;

    public ProfileServiceImpl(ProfileRepository profileRepository,
                              UserRepository userRepository) {
        this.profileRepository = profileRepository;
        this.userRepository = userRepository;
    }

    @Override
    public ProfileResponse createOrUpdateProfile(ProfileRequest request, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Profile profile = profileRepository.findByUser(user).orElse(new Profile());

        profile.setUser(user);
        profile.setHeadline(request.getHeadline());
        profile.setBio(request.getBio());
        profile.setProfileImage(request.getProfileImage());
        profile.setLocation(request.getLocation());
        profile.setGithubLink(request.getGithubLink());
        profile.setLinkedinLink(request.getLinkedinLink());
        profile.setTwitterLink(request.getTwitterLink());
        profile.setPortfolioTheme(request.getPortfolioTheme());

        profileRepository.save(profile);

        return new ProfileResponse(
                user.getFullName(),
                user.getUsername(),
                user.getEmail(),
                profile.getHeadline(),
                profile.getBio(),
                profile.getProfileImage(),
                profile.getLocation(),
                profile.getGithubLink(),
                profile.getLinkedinLink(),
                profile.getTwitterLink(),
                profile.getPortfolioTheme()
        );
    }

    @Override
    public ProfileResponse getMyProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Profile profile = profileRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        return new ProfileResponse(
                user.getFullName(),
                user.getUsername(),
                user.getEmail(),
                profile.getHeadline(),
                profile.getBio(),
                profile.getProfileImage(),
                profile.getLocation(),
                profile.getGithubLink(),
                profile.getLinkedinLink(),
                profile.getTwitterLink(),
                profile.getPortfolioTheme()
        );
    }

    @Override
    public ProfileResponse getPublicProfile(String username) {
        Profile profile = profileRepository.findByUserUsername(username)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        User user = profile.getUser();

        return new ProfileResponse(
                user.getFullName(),
                user.getUsername(),
                user.getEmail(),
                profile.getHeadline(),
                profile.getBio(),
                profile.getProfileImage(),
                profile.getLocation(),
                profile.getGithubLink(),
                profile.getLinkedinLink(),
                profile.getTwitterLink(),
                profile.getPortfolioTheme()
        );
    }
}