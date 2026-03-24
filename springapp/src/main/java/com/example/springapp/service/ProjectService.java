
package com.example.springapp.service;

import com.example.springapp.entity.Project;
import java.util.List;

public interface ProjectService {
    Project addProject(Project project, String email);
    List<Project> getMyProjects(String email);
    void deleteProject(Long id, String email);
}