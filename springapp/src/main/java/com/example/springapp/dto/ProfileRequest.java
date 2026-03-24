package com.example.springapp.dto;



public class ProfileRequest {
    private String headline;
    private String bio;
    private String profileImage;
    private String location;
    private String githubLink;
    private String linkedinLink;
    private String twitterLink;
    private String portfolioTheme;

    public ProfileRequest() {
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
}