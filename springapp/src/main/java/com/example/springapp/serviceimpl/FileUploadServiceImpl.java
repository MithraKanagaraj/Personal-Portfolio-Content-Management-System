package com.example.springapp.serviceimpl;


import com.example.springapp.entity.UploadedFile;
import com.example.springapp.entity.User;
import com.example.springapp.repository.UploadedFileRepository;
import com.example.springapp.repository.UserRepository;
import com.example.springapp.service.FileUploadService;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
public class FileUploadServiceImpl implements FileUploadService {

    private final UploadedFileRepository uploadedFileRepository;
    private final UserRepository userRepository;

    @Value("${file.upload-dir}")
    private String uploadDir;

    public FileUploadServiceImpl(UploadedFileRepository uploadedFileRepository,
                                 UserRepository userRepository) {
        this.uploadedFileRepository = uploadedFileRepository;
        this.userRepository = userRepository;
    }

    @Override
    public UploadedFile uploadFile(MultipartFile file, String category, String email) throws Exception {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String originalName = file.getOriginalFilename();
        String extension = "";

        if (originalName != null && originalName.contains(".")) {
            extension = originalName.substring(originalName.lastIndexOf("."));
        }

        String newFileName = UUID.randomUUID() + extension;
        Path uploadPath = Paths.get(uploadDir);

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        Path filePath = uploadPath.resolve(newFileName);
        Files.copy(file.getInputStream(), filePath);

        UploadedFile uploadedFile = new UploadedFile();
        uploadedFile.setFileName(originalName);
        uploadedFile.setFileType(file.getContentType());
        uploadedFile.setFilePath(filePath.toString());
        uploadedFile.setCategory(category);
        uploadedFile.setUser(user);

        return uploadedFileRepository.save(uploadedFile);
    }

    @Override
    public List<UploadedFile> getMyFiles(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return uploadedFileRepository.findByUser(user);
    }

    @Override
    public void deleteFile(Long fileId, String email) throws Exception {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        UploadedFile file = uploadedFileRepository.findById(fileId)
                .orElseThrow(() -> new RuntimeException("File not found"));

        if (!file.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        Path path = Paths.get(file.getFilePath());
        Files.deleteIfExists(path);
        uploadedFileRepository.delete(file);
    }
}