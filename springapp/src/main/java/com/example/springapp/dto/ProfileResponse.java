package com.example.springapp.dto;


public class ProfileResponse {
    private String fullName;
    private String username;
    private String email;
    private String headline;
    private String bio;
    private String profileImage;
    private String location;
    private String githubLink;
    private String linkedinLink;
    private String twitterLink;
    private String portfolioTheme;

    public ProfileResponse() {
    }

    public ProfileResponse(String fullName, String username, String email, String headline, String bio,
                           String profileImage, String location, String githubLink,
                           String linkedinLink, String twitterLink, String portfolioTheme) {
        this.fullName = fullName;
        this.username = username;
        this.email = email;
        this.headline = headline;
        this.bio = bio;
        this.profileImage = profileImage;
        this.location = location;
        this.githubLink = githubLink;
        this.linkedinLink = linkedinLink;
        this.twitterLink = twitterLink;
        this.portfolioTheme = portfolioTheme;
    }

    public String getFullName() {
        return fullName;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getHeadline() {
        return headline;
    }

    public String getBio() {
        return bio;
    }

    public String getProfileImage() {
        return profileImage;
    }

    public String getLocation() {
        return location;
    }

    public String getGithubLink() {
        return githubLink;
    }

    public String getLinkedinLink() {
        return linkedinLink;
    }

    public String getTwitterLink() {
        return twitterLink;
    }

    public String getPortfolioTheme() {
        return portfolioTheme;
    }
}