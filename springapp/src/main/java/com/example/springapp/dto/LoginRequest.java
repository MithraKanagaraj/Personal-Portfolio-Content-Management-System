package com.example.springapp.dto;

import io.swagger.v3.oas.annotations.media.Schema;

public class LoginRequest {

    @Schema(example = "mithra123@gmail.com", requiredMode = Schema.RequiredMode.REQUIRED)
    private String email;

    @Schema(example = "mithra123", requiredMode = Schema.RequiredMode.REQUIRED)
    private String password;

    public LoginRequest() {
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
