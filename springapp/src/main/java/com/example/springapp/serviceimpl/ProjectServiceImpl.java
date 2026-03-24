package com.example.springapp.serviceimpl;



import com.example.springapp.entity.Project;
import com.example.springapp.entity.User;
import com.example.springapp.repository.ProjectRepository;
import com.example.springapp.repository.UserRepository;
import com.example.springapp.service.ProjectService;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    public ProjectServiceImpl(ProjectRepository projectRepository, UserRepository userRepository) {
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Project addProject(Project project, String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        project.setUser(user);
        return projectRepository.save(project);
    }

    @Override
    public List<Project> getMyProjects(String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        return projectRepository.findByUser(user);
    }

    @Override
    public void deleteProject(Long id, String email) {
        projectRepository.deleteById(id);
    }
}