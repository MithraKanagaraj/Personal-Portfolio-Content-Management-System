package com.example.springapp.repository;

import com.example.springapp.entity.Skill;
import com.example.springapp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SkillRepository extends JpaRepository<Skill, Long> {
    List<Skill> findByUser(User user);
}