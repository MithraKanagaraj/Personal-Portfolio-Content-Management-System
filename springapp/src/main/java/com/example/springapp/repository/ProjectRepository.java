package com.example.springapp.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.springapp.entity.Project;
import com.example.springapp.entity.User;

public interface ProjectRepository extends JpaRepository<Project, Long> {

    List<Project> findByUser(User user);

    Optional<Project> findByIdAndUser(Long id, User user);
}
