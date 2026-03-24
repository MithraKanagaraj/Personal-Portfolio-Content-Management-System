
package com.example.springapp.repository;

import com.example.springapp.entity.ContactMessage;
import com.example.springapp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> {
    List<ContactMessage> findByUser(User user);
}