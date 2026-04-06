package com.example.springapp.service;

import java.util.List;

import com.example.springapp.entity.Experience;

public interface ExperienceService {

    Experience addExperience(Experience experience, String email);

    List<Experience> getMyExperiences(String email);

    List<Experience> getPublicExperiences(String username);

    void deleteExperience(Long id, String email);
}
