
package com.example.springapp.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "resumes")
public class Resume {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileUrl;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Resume() {}

    public Long getId() { return id; }
    public String getFileUrl() { return fileUrl; }
    public User getUser() { return user; }

    public void setId(Long id) { this.id = id; }
    public void setFileUrl(String fileUrl) { this.fileUrl = fileUrl; }
    public void setUser(User user) { this.user = user; }
}