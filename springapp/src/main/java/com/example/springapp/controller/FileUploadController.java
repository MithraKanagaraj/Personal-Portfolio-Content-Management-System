package com.example.springapp.controller;



import com.example.springapp.entity.UploadedFile;
import com.example.springapp.service.FileUploadService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/files")
@CrossOrigin("*")
public class FileUploadController {

    private final FileUploadService fileUploadService;

    public FileUploadController(FileUploadService fileUploadService) {
        this.fileUploadService = fileUploadService;
    }

    @PostMapping("/upload")
    public ResponseEntity<UploadedFile> uploadFile(@RequestParam("file") MultipartFile file,
                                                   @RequestParam("category") String category,
                                                   Principal principal) throws Exception {
        return ResponseEntity.ok(
                fileUploadService.uploadFile(file, category, principal.getName())
        );
    }

    @GetMapping("/my-files")
    public ResponseEntity<List<UploadedFile>> getMyFiles(Principal principal) {
        return ResponseEntity.ok(fileUploadService.getMyFiles(principal.getName()));
    }

    @DeleteMapping("/{fileId}")
    public ResponseEntity<String> deleteFile(@PathVariable Long fileId,
                                             Principal principal) throws Exception {
        fileUploadService.deleteFile(fileId, principal.getName());
        return ResponseEntity.ok("File deleted successfully");
    }
}