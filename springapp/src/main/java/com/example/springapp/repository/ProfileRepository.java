package com.example.springapp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.springapp.entity.Profile;
import com.example.springapp.entity.User;

public interface ProfileRepository extends JpaRepository<Profile, Long> {

    Optional<Profile> findByUser(User user);

    Optional<Profile> findByUserUsername(String username);
}
