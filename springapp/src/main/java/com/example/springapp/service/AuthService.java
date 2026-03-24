package com.example.springapp.service;


import com.example.springapp.dto.AuthResponse;
import com.example.springapp.dto.LoginRequest;
import com.example.springapp.dto.RegisterRequest;

public interface AuthService {
    AuthResponse register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
}