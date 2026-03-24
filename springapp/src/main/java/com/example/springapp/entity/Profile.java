package com.example.springapp.entity;
import jakarta.persistence.*;

@Entity
@Table(name = "profiles")
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String headline;

    @Column(length = 2000)
    private String bio;

    private String profileImage;

    private String location;

    private String githubLink;
    private String linkedinLink;
    private String twitterLink;
    private String portfolioTheme;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    public Profile() {
    }

    public Profile(Long id, String headline, String bio, String profileImage, String location,
                   String githubLink, String linkedinLink, String twitterLink,
                   String portfolioTheme, User user) {
        this.id = id;
        this.headline = headline;
        this.bio = bio;
        this.profileImage = profileImage;
        this.location = location;
        this.githubLink = githubLink;
        this.linkedinLink = linkedinLink;
        this.twitterLink = twitterLink;
        this.portfolioTheme = portfolioTheme;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getHeadline() {
        return headline;
    }

    public void setHeadline(String headline) {
        this.headline = headline;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getProfileImage() {
        return profileImage;
    }

    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getGithubLink() {
        return githubLink;
    }

    public void setGithubLink(String githubLink) {
        this.githubLink = githubLink;
    }

    public String getLinkedinLink() {
        return linkedinLink;
    }

    public void setLinkedinLink(String linkedinLink) {
        this.linkedinLink = linkedinLink;
    }

    public String getTwitterLink() {
        return twitterLink;
    }

    public void setTwitterLink(String twitterLink) {
        this.twitterLink = twitterLink;
    }

    public String getPortfolioTheme() {
        return portfolioTheme;
    }

    public void setPortfolioTheme(String portfolioTheme) {
        this.portfolioTheme = portfolioTheme;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}