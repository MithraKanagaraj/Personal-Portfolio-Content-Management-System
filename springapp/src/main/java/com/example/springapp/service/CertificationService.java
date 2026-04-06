package com.example.springapp.service;

import java.util.List;

import com.example.springapp.entity.Certification;

public interface CertificationService {

    Certification addCertification(Certification certification, String email);

    List<Certification> getMyCertifications(String email);

    List<Certification> getPublicCertifications(String username);

    void deleteCertification(Long id, String email);
}
