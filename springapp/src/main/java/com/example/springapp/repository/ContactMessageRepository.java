package com.example.springapp.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.springapp.entity.ContactMessage;
import com.example.springapp.entity.User;

public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> {

    List<ContactMessage> findByUser(User user);

    Optional<ContactMessage> findByIdAndUser(Long id, User user);
}
