package com.example.springapp.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.springapp.entity.Certification;
import com.example.springapp.entity.User;

public interface CertificationRepository extends JpaRepository<Certification, Long> {

    List<Certification> findByUserOrderByIdDesc(User user);

    List<Certification> findByUserUsernameOrderByIdDesc(String username);

    Optional<Certification> findByIdAndUser(Long id, User user);
}
