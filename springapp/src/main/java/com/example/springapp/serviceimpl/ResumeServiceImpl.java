package com.example.springapp.serviceimpl;



import com.example.springapp.entity.Resume;
import com.example.springapp.entity.User;
import com.example.springapp.repository.ResumeRepository;
import com.example.springapp.repository.UserRepository;
import com.example.springapp.service.ResumeService;

import org.springframework.stereotype.Service;

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
        User user = userRepository.findByEmail(email).orElseThrow();
        resume.setUser(user);
        return resumeRepository.save(resume);
    }

    @Override
    public Resume getMyResume(String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        return resumeRepository.findByUser(user).orElse(null);
    }
}