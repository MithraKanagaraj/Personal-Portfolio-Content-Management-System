package com.example.springapp.service;

import java.util.List;

import com.example.springapp.entity.Project;

public interface ProjectService {

    Project addProject(Project project, String email);

    List<Project> getMyProjects(String email);

    void deleteProject(Long id, String email);
}
