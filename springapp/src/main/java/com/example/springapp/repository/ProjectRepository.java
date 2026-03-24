
package com.example.springapp.repository;

import com.example.springapp.entity.Project;
import com.example.springapp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByUser(User user);
}