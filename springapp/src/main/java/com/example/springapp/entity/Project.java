
package com.example.springapp.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "projects")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String techStack;
    private String githubLink;
    private String liveLink;
    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Project() {}

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public String getTechStack() { return techStack; }
    public String getGithubLink() { return githubLink; }
    public String getLiveLink() { return liveLink; }
    public String getImageUrl() { return imageUrl; }
    public User getUser() { return user; }

    public void setId(Long id) { this.id = id; }
    public void setTitle(String title) { this.title = title; }
    public void setDescription(String description) { this.description = description; }
    public void setTechStack(String techStack) { this.techStack = techStack; }
    public void setGithubLink(String githubLink) { this.githubLink = githubLink; }
    public void setLiveLink(String liveLink) { this.liveLink = liveLink; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public void setUser(User user) { this.user = user; }
}