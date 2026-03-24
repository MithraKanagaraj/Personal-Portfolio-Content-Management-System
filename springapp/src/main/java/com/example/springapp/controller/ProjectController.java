package com.example.springapp.controller;



import com.example.springapp.entity.Project;
import com.example.springapp.service.ProjectService;

import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin("*")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @PostMapping
    public Project addProject(@RequestBody Project project, Principal principal) {
        return projectService.addProject(project, principal.getName());
    }

    @GetMapping
    public List<Project> getProjects(Principal principal) {
        return projectService.getMyProjects(principal.getName());
    }

    @DeleteMapping("/{id}")
    public String deleteProject(@PathVariable Long id, Principal principal) {
        projectService.deleteProject(id, principal.getName());
        return "Deleted";
    }
}