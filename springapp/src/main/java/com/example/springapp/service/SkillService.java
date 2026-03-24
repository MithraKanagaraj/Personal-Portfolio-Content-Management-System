package com.example.springapp.service;

import com.example.springapp.entity.Skill;

import java.util.List;

public interface SkillService {
    Skill addSkill(Skill skill, String email);
    List<Skill> getMySkills(String email);
    void deleteSkill(Long id, String email);
}

