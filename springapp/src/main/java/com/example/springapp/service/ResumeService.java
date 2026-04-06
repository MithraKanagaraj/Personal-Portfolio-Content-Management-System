package com.example.springapp.service;

import com.example.springapp.entity.Resume;

public interface ResumeService {

    Resume saveResume(Resume resume, String email);

    Resume getMyResume(String email);
}
