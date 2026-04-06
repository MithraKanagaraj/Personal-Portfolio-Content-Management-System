package com.example.springapp.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.springapp.entity.Experience;
import com.example.springapp.entity.User;

public interface ExperienceRepository extends JpaRepository<Experience, Long> {

    List<Experience> findByUserOrderByIdDesc(User user);

    List<Experience> findByUserUsernameOrderByIdDesc(String username);

    Optional<Experience> findByIdAndUser(Long id, User user);
}
