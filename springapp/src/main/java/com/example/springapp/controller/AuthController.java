// package com.example.springapp.controller;



// import com.example.springapp.dto.AuthResponse;
// import com.example.springapp.dto.LoginRequest;
// import com.example.springapp.dto.RegisterRequest;
// import com.example.springapp.service.AuthService;

// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// @RestController
// @RequestMapping("/api/auth")
// @CrossOrigin("*")
// public class AuthController {

//     private final AuthService authService;

//     public AuthController(AuthService authService) {
//         this.authService = authService;
//     }

//     @PostMapping("/register")
//     public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
//         return ResponseEntity.ok(authService.register(request));
//     }

//     @PostMapping("/login")
//     public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
//         return ResponseEntity.ok(authService.login(request));
//     }
// }
package com.example.springapp.controller;

import com.example.springapp.entity.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        System.out.println("REGISTER HIT");
        System.out.println("Name: " + user.getFullName());
        System.out.println("Username: " + user.getUsername());
        System.out.println("Email: " + user.getEmail());
        return ResponseEntity.ok("Register request reached controller");
    }
}