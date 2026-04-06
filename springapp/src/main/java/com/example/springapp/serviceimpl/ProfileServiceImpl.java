package com.example.springapp.serviceimpl;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.server.ResponseStatusException;

import com.example.springapp.entity.Profile;
import com.example.springapp.entity.User;
import com.example.springapp.repository.ProfileRepository;
import com.example.springapp.repository.UserRepository;
import com.example.springapp.service.ProfileService;

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
    public Profile createOrUpdateProfile(Profile profile, String email) {
        if (profile == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Profile body is required");
        }

        User user = getUserByEmail(email);
        Profile existingProfile = profileRepository.findByUser(user).orElseGet(Profile::new);

        existingProfile.setUser(user);
        existingProfile.setHeadline(trimToNull(profile.getHeadline()));
        existingProfile.setBio(trimToNull(profile.getBio()));
        existingProfile.setProfileImage(trimToNull(profile.getProfileImage()));
        existingProfile.setLocation(trimToNull(profile.getLocation()));
        existingProfile.setGithubLink(trimToNull(profile.getGithubLink()));
        existingProfile.setLinkedinLink(trimToNull(profile.getLinkedinLink()));
        existingProfile.setTwitterLink(trimToNull(profile.getTwitterLink()));
        existingProfile.setPortfolioTheme(trimToNull(profile.getPortfolioTheme()));

        return profileRepository.save(existingProfile);
    }

    @Override
    public Profile getMyProfile(String email) {
        User user = getUserByEmail(email);
        return profileRepository.findByUser(user)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Profile not found"));
    }

    @Override
    public Profile getPublicProfile(String username) {
        if (!StringUtils.hasText(username)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Username is required");
        }

        return profileRepository.findByUserUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Profile not found"));
    }

    private User getUserByEmail(String email) {
        if (!StringUtils.hasText(email)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not authenticated");
        }

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }

    private String trimToNull(String value) {
        if (!StringUtils.hasText(value)) {
            return null;
        }
        return value.trim();
    }
}
