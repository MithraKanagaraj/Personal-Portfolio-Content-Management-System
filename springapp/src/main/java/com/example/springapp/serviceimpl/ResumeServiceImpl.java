package com.example.springapp.serviceimpl;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.server.ResponseStatusException;

import com.example.springapp.entity.Resume;
import com.example.springapp.entity.User;
import com.example.springapp.repository.ResumeRepository;
import com.example.springapp.repository.UserRepository;
import com.example.springapp.service.ResumeService;

@Service
public class ResumeServiceImpl implements ResumeService {

    private final ResumeRepository resumeRepository;
    private final UserRepository userRepository;

    public ResumeServiceImpl(ResumeRepository resumeRepository, UserRepository userRepository) {
        this.resumeRepository = resumeRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Resume saveResume(Resume resume, String email) {
        if (resume == null || !StringUtils.hasText(resume.getFileUrl())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Resume fileUrl is required");
        }

        User user = getUserByEmail(email);
        Resume existingResume = resumeRepository.findByUser(user).orElseGet(Resume::new);
        existingResume.setUser(user);
        existingResume.setFileUrl(resume.getFileUrl().trim());
        return resumeRepository.save(existingResume);
    }

    @Override
    public Resume getMyResume(String email) {
        User user = getUserByEmail(email);
        return resumeRepository.findByUser(user)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Resume not found"));
    }

    private User getUserByEmail(String email) {
        if (!StringUtils.hasText(email)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not authenticated");
        }

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }
}
