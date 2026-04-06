package com.example.springapp.service;

import java.util.Map;

import com.example.springapp.dto.LoginRequest;
import com.example.springapp.dto.RegisterRequest;

public interface AuthService {

    Map<String, Object> register(RegisterRequest request);

    Map<String, Object> login(LoginRequest request);
}
