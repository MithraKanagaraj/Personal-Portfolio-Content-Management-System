package com.example.springapp.controller;

import java.security.Principal;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.example.springapp.entity.Certification;
import com.example.springapp.service.CertificationService;

@RestController
@RequestMapping("/api/certifications")
public class CertificationController {

    private final CertificationService certificationService;

    public CertificationController(CertificationService certificationService) {
        this.certificationService = certificationService;
    }

    @PostMapping
    public ResponseEntity<Certification> addCertification(@RequestBody Certification certification, Principal principal) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(certificationService.addCertification(certification, getAuthenticatedEmail(principal)));
    }

    @GetMapping
    public ResponseEntity<List<Certification>> getCertifications(Principal principal) {
        return ResponseEntity.ok(certificationService.getMyCertifications(getAuthenticatedEmail(principal)));
    }

    @GetMapping("/public/{username}")
    public ResponseEntity<List<Certification>> getPublicCertifications(@PathVariable String username) {
        return ResponseEntity.ok(certificationService.getPublicCertifications(username));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteCertification(@PathVariable Long id, Principal principal) {
        certificationService.deleteCertification(id, getAuthenticatedEmail(principal));
        return ResponseEntity.ok(Map.of("message", "Certification deleted successfully"));
    }

    private String getAuthenticatedEmail(Principal principal) {
        if (principal == null || principal.getName() == null || principal.getName().isBlank()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not authenticated");
        }
        return principal.getName();
    }
}
