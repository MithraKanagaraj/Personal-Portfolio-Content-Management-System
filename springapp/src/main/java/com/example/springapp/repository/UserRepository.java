package com.example.springapp.repository;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.springapp.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByUsername(String username);
    boolean existsByEmail(String email);
    boolean existsByUsername(String username);
}