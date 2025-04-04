package com.example.controller;

import com.example.model.User;
import com.example.repository.UserRepository;
import com.example.security.jwt.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    public AdminController(JwtUtil jwtUtil, UserRepository userRepository) {
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
    }

    @GetMapping("/dashboard")
    @PreAuthorize("hasAuthority('Admin')")
    public ResponseEntity<String> getDashboard() {
        return ResponseEntity.ok("Welcome Admin!");
    }

    //System.out.println("JWT Role Extracted: " + jwtUtil.extractRole(token));

    
    @GetMapping("/profile")
    @PreAuthorize("hasAuthority('Admin')")
    public ResponseEntity<?> getAdminProfile(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Missing or invalid Authorization header"));
        }

        String token = authHeader.substring(7);
        String email;
        String role;

        try {
            email = jwtUtil.extractUsername(token);
            role = jwtUtil.extractRole(token);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Invalid or expired token"));
        }

        System.out.println("Extracted Role from JWT: " + role);

        if (!"Admin".equals(role)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("error", "Access Denied: You are not an Admin"));
        }

        return userRepository.findByEmail(email)
                .map(admin -> {
                    Map<String, Object> response = new HashMap<>();
                    response.put("id", admin.getId());
                    response.put("email", admin.getEmail());
                    response.put("role", admin.getRole());
                    return ResponseEntity.ok(response);
                })
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("error", "Admin user not found")));
    }
}
