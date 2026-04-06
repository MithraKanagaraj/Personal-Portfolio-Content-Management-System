package com.example.springapp.service;

import java.util.List;

import com.example.springapp.entity.Skill;

public interface SkillService {

    Skill addSkill(Skill skill, String email);

    List<Skill> getMySkills(String email);

    void deleteSkill(Long id, String email);
}
