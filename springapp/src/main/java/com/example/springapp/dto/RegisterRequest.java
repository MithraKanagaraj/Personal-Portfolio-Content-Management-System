package com.example.springapp.dto;

import io.swagger.v3.oas.annotations.media.Schema;

public class RegisterRequest {

    @Schema(example = "Mithra K", requiredMode = Schema.RequiredMode.REQUIRED)
    private String fullName;

    @Schema(example = "mithra123", requiredMode = Schema.RequiredMode.REQUIRED)
    private String username;

    @Schema(example = "mithra123@gmail.com", requiredMode = Schema.RequiredMode.REQUIRED)
    private String email;

    @Schema(example = "mithra123", requiredMode = Schema.RequiredMode.REQUIRED)
    private String password;

    public RegisterRequest() {
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
