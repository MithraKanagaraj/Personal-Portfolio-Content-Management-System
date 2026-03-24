package com.example.springapp.repository;


import com.example.springapp.entity.UploadedFile;
import com.example.springapp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UploadedFileRepository extends JpaRepository<UploadedFile, Long> {
    List<UploadedFile> findByUser(User user);
    List<UploadedFile> findByUserAndCategory(User user, String category);
}