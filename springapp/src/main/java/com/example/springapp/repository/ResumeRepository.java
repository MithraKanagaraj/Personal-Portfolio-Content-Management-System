package com.example.springapp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.springapp.entity.Resume;
import com.example.springapp.entity.User;

public interface ResumeRepository extends JpaRepository<Resume, Long> {

    Optional<Resume> findByUser(User user);
}
