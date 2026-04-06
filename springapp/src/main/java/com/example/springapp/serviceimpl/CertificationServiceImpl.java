package com.example.springapp.serviceimpl;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.server.ResponseStatusException;

import com.example.springapp.entity.Certification;
import com.example.springapp.entity.User;
import com.example.springapp.repository.CertificationRepository;
import com.example.springapp.repository.UserRepository;
import com.example.springapp.service.CertificationService;

@Service
public class CertificationServiceImpl implements CertificationService {

    private final CertificationRepository certificationRepository;
    private final UserRepository userRepository;

    public CertificationServiceImpl(CertificationRepository certificationRepository, UserRepository userRepository) {
        this.certificationRepository = certificationRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Certification addCertification(Certification certification, String email) {
        if (certification == null || !StringUtils.hasText(certification.getTitle())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Certification title is required");
        }

        User user = getUserByEmail(email);
        certification.setId(null);
        certification.setUser(user);
        certification.setTitle(certification.getTitle().trim());
        certification.setIssuer(trimToNull(certification.getIssuer()));
        certification.setIssueYear(trimToNull(certification.getIssueYear()));
        certification.setCredentialUrl(trimToNull(certification.getCredentialUrl()));
        return certificationRepository.save(certification);
    }

    @Override
    public List<Certification> getMyCertifications(String email) {
        User user = getUserByEmail(email);
        return certificationRepository.findByUserOrderByIdDesc(user);
    }

    @Override
    public List<Certification> getPublicCertifications(String username) {
        if (!StringUtils.hasText(username)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Username is required");
        }
        return certificationRepository.findByUserUsernameOrderByIdDesc(username.trim());
    }

    @Override
    public void deleteCertification(Long id, String email) {
        User user = getUserByEmail(email);
        Certification certification = certificationRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Certification not found for this user"));
        certificationRepository.delete(certification);
    }

    private User getUserByEmail(String email) {
        if (!StringUtils.hasText(email)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not authenticated");
        }

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }

    private String trimToNull(String value) {
        if (!StringUtils.hasText(value)) {
            return null;
        }
        return value.trim();
    }
}
