
package com.example.springapp.controller;

import com.example.springapp.entity.Resume;
import com.example.springapp.service.ResumeService;

import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/resume")
@CrossOrigin("*")
public class ResumeController {

    private final ResumeService resumeService;

    public ResumeController(ResumeService resumeService) {
        this.resumeService = resumeService;
    }

    @PostMapping
    public Resume saveResume(@RequestBody Resume resume, Principal principal) {
        return resumeService.saveResume(resume, principal.getName());
    }

    @GetMapping
    public Resume getResume(Principal principal) {
        return resumeService.getMyResume(principal.getName());
    }
}