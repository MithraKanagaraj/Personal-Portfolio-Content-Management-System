package com.example.springapp.serviceimpl;

import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.server.ResponseStatusException;

import com.example.springapp.dto.LoginRequest;
import com.example.springapp.dto.RegisterRequest;
import com.example.springapp.entity.User;
import com.example.springapp.repository.UserRepository;
import com.example.springapp.security.JwtUtil;
import com.example.springapp.service.AuthService;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthServiceImpl(UserRepository userRepository,
                           PasswordEncoder passwordEncoder,
                           JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public Map<String, Object> register(RegisterRequest request) {
        validateRegisterRequest(request);

        String email = request.getEmail().trim().toLowerCase();
        String username = request.getUsername().trim();

        if (userRepository.existsByEmail(email)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email already exists");
        }

        if (userRepository.existsByUsername(username)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Username already exists");
        }

        User newUser = new User();
        newUser.setFullName(request.getFullName().trim());
        newUser.setUsername(username);
        newUser.setEmail(email);
        newUser.setPassword(passwordEncoder.encode(request.getPassword()));
        newUser.setRole("USER");

        User savedUser = userRepository.save(newUser);
        String token = jwtUtil.generateToken(savedUser.getEmail());

        return buildAuthResponse(savedUser, token, "User registered successfully");
    }

    @Override
    public Map<String, Object> login(LoginRequest request) {
        if (request == null || !StringUtils.hasText(request.getEmail()) || !StringUtils.hasText(request.getPassword())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email and password are required");
        }

        String email = request.getEmail().trim().toLowerCase();

        User existingUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), existingUser.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password");
        }

        String token = jwtUtil.generateToken(existingUser.getEmail());
        return buildAuthResponse(existingUser, token, "Login successful");
    }

    private void validateRegisterRequest(RegisterRequest request) {
        if (request == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Request body is required");
        }
        if (!StringUtils.hasText(request.getFullName())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Full name is required");
        }
        if (!StringUtils.hasText(request.getUsername())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Username is required");
        }
        if (!StringUtils.hasText(request.getEmail())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email is required");
        }
        if (!StringUtils.hasText(request.getPassword())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Password is required");
        }
    }

    private Map<String, Object> buildAuthResponse(User user, String token, String message) {
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("message", message);
        response.put("token", token);
        response.put("id", user.getId());
        response.put("fullName", user.getFullName());
        response.put("username", user.getUsername());
        response.put("email", user.getEmail());
        response.put("role", user.getRole());
        return response;
    }
}
