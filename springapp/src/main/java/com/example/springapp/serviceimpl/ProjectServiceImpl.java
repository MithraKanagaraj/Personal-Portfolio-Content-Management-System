package com.example.springapp.serviceimpl;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.server.ResponseStatusException;

import com.example.springapp.entity.Project;
import com.example.springapp.entity.User;
import com.example.springapp.repository.ProjectRepository;
import com.example.springapp.repository.UserRepository;
import com.example.springapp.service.ProjectService;

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
        if (project == null || !StringUtils.hasText(project.getTitle())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Project title is required");
        }

        User user = getUserByEmail(email);
        project.setId(null);
        project.setUser(user);
        project.setTitle(project.getTitle().trim());
        project.setDescription(trimToNull(project.getDescription()));
        project.setTechStack(trimToNull(project.getTechStack()));
        project.setGithubLink(trimToNull(project.getGithubLink()));
        project.setLiveLink(trimToNull(project.getLiveLink()));
        project.setImageUrl(trimToNull(project.getImageUrl()));
        return projectRepository.save(project);
    }

    @Override
    public List<Project> getMyProjects(String email) {
        User user = getUserByEmail(email);
        return projectRepository.findByUser(user);
    }

    @Override
    public void deleteProject(Long id, String email) {
        User user = getUserByEmail(email);
        Project project = projectRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Project not found for this user"));
        projectRepository.delete(project);
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
