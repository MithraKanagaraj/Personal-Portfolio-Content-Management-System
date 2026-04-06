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

import com.example.springapp.entity.Project;
import com.example.springapp.service.ProjectService;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @PostMapping
    public ResponseEntity<Project> addProject(@RequestBody Project project, Principal principal) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(projectService.addProject(project, getAuthenticatedEmail(principal)));
    }

    @GetMapping
    public ResponseEntity<List<Project>> getProjects(Principal principal) {
        return ResponseEntity.ok(projectService.getMyProjects(getAuthenticatedEmail(principal)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteProject(@PathVariable Long id, Principal principal) {
        projectService.deleteProject(id, getAuthenticatedEmail(principal));
        return ResponseEntity.ok(Map.of("message", "Project deleted successfully"));
    }

    private String getAuthenticatedEmail(Principal principal) {
        if (principal == null || principal.getName() == null || principal.getName().isBlank()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not authenticated");
        }
        return principal.getName();
    }
}
