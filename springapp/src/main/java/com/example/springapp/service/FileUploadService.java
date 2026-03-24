package com.example.springapp.service;



import com.example.springapp.entity.UploadedFile;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface FileUploadService {
    UploadedFile uploadFile(MultipartFile file, String category, String email) throws Exception;
    List<UploadedFile> getMyFiles(String email);
    void deleteFile(Long fileId, String email) throws Exception;
}