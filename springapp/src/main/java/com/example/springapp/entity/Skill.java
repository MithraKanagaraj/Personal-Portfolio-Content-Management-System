
package com.example.springapp.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "skills")
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String level;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Skill() {}

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getLevel() { return level; }
    public User getUser() { return user; }

    public void setId(Long id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setLevel(String level) { this.level = level; }
    public void setUser(User user) { this.user = user; }
}