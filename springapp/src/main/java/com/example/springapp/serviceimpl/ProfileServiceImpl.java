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
// package com.example.springapp.service.impl;

// import com.example.springapp.dto.ProfileRequest;
// import com.example.springapp.dto.ProfileResponse;
// import com.example.springapp.entity.Profile;
// import com.example.springapp.entity.User;
// import com.example.springapp.repository.ProfileRepository;
// import com.example.springapp.repository.UserRepository;
// import com.example.springapp.service.ProfileService;

// import org.springframework.stereotype.Service;

// import java.util.Optional;

// @Service
// public class ProfileServiceImpl implements ProfileService {

//     private final ProfileRepository profileRepository;
//     private final UserRepository userRepository;

//     public ProfileServiceImpl(ProfileRepository profileRepository,
//                               UserRepository userRepository) {
//         this.profileRepository = profileRepository;
//         this.userRepository = userRepository;
//     }

//     @Override
//     public ProfileResponse createOrUpdateProfile(ProfileRequest request, String email) {

//         // 🔴 Step 1: Get user (VERY IMPORTANT)
//         User user = userRepository.findByEmail(email)
//                 .orElseThrow(() -> new RuntimeException("User not found"));

//         // 🔴 Step 2: Check if profile exists
//         Optional<Profile> optionalProfile = profileRepository.findByUser(user);

//         Profile profile;

//         if (optionalProfile.isPresent()) {
//             profile = optionalProfile.get(); // update existing
//         } else {
//             profile = new Profile(); // create new
//             profile.setUser(user);   // ⚠️ MUST SET USER (fixes 500 error)
//         }

//         // 🔴 Step 3: Set fields
//         profile.setHeadline(request.getHeadline());
//         profile.setBio(request.getBio());
//         profile.setProfileImage(request.getProfileImage());
//         profile.setLocation(request.getLocation());
//         profile.setGithubLink(request.getGithubLink());
//         profile.setLinkedinLink(request.getLinkedinLink());
//         profile.setTwitterLink(request.getTwitterLink());
//         profile.setPortfolioTheme(request.getPortfolioTheme());

//         // 🔴 Step 4: Save
//         Profile savedProfile = profileRepository.save(profile);

//         // 🔴 Step 5: Convert to response
//         return mapToResponse(savedProfile);
//     }

//     @Override
//     public ProfileResponse getMyProfile(String email) {
//         User user = userRepository.findByEmail(email)
//                 .orElseThrow(() -> new RuntimeException("User not found"));

//         Profile profile = profileRepository.findByUser(user)
//                 .orElseThrow(() -> new RuntimeException("Profile not found"));

//         return mapToResponse(profile);
//     }

//     @Override
//     public ProfileResponse getPublicProfile(String username) {
//         User user = userRepository.findByUsername(username)
//                 .orElseThrow(() -> new RuntimeException("User not found"));

//         Profile profile = profileRepository.findByUser(user)
//                 .orElseThrow(() -> new RuntimeException("Profile not found"));

//         return mapToResponse(profile);
//     }

//     // ✅ Common mapper
//     private ProfileResponse mapToResponse(Profile profile) {
//         ProfileResponse res = new ProfileResponse();

//         res.setHeadline(profile.getHeadline());
//         res.setBio(profile.getBio());
//         res.setProfileImage(profile.getProfileImage());
//         res.setLocation(profile.getLocation());
//         res.setGithubLink(profile.getGithubLink());
//         res.setLinkedinLink(profile.getLinkedinLink());
//         res.setTwitterLink(profile.getTwitterLink());
//         res.setPortfolioTheme(profile.getPortfolioTheme());

//         res.setUsername(profile.getUser().getUsername());

//         return res;
//     }
// }