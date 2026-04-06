package com.example.springapp.serviceimpl;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.server.ResponseStatusException;

import com.example.springapp.entity.Experience;
import com.example.springapp.entity.User;
import com.example.springapp.repository.ExperienceRepository;
import com.example.springapp.repository.UserRepository;
import com.example.springapp.service.ExperienceService;

@Service
public class ExperienceServiceImpl implements ExperienceService {

    private final ExperienceRepository experienceRepository;
    private final UserRepository userRepository;

    public ExperienceServiceImpl(ExperienceRepository experienceRepository, UserRepository userRepository) {
        this.experienceRepository = experienceRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Experience addExperience(Experience experience, String email) {
        if (experience == null || !StringUtils.hasText(experience.getRole())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Role is required");
        }

        User user = getUserByEmail(email);
        experience.setId(null);
        experience.setUser(user);
        experience.setRole(experience.getRole().trim());
        experience.setOrganization(trimToNull(experience.getOrganization()));
        experience.setDuration(trimToNull(experience.getDuration()));
        experience.setDescription(trimToNull(experience.getDescription()));
        return experienceRepository.save(experience);
    }

    @Override
    public List<Experience> getMyExperiences(String email) {
        User user = getUserByEmail(email);
        return experienceRepository.findByUserOrderByIdDesc(user);
    }

    @Override
    public List<Experience> getPublicExperiences(String username) {
        if (!StringUtils.hasText(username)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Username is required");
        }
        return experienceRepository.findByUserUsernameOrderByIdDesc(username.trim());
    }

    @Override
    public void deleteExperience(Long id, String email) {
        User user = getUserByEmail(email);
        Experience experience = experienceRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Experience not found for this user"));
        experienceRepository.delete(experience);
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
