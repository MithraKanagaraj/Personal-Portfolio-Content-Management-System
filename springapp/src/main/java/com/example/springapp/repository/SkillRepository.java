package com.example.springapp.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.springapp.entity.Skill;
import com.example.springapp.entity.User;

public interface SkillRepository extends JpaRepository<Skill, Long> {

    List<Skill> findByUser(User user);

    Optional<Skill> findByIdAndUser(Long id, User user);
}
