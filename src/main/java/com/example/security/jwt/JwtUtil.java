package com.example.security.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.example.model.User;
import com.example.repository.UserRepository;
import java.security.Key;
import java.util.Date;
import java.util.Optional;
import java.util.function.Function;
import java.util.Base64;

@Service
public class JwtUtil {

    @Autowired
    private UserRepository userRepository;

    private final String SECRET_KEY = "ZgBRGS7YWhvmZIPPgbqWOcOnGVYQYXH3Qi9G242BT+Y=";

    private Key getSigningKey() {
        byte[] decodedKey = Base64.getDecoder().decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(decodedKey);
    }

    public String generateToken(UserDetails userDetails) {
        Optional<User> optionalUser = userRepository.findByEmail(userDetails.getUsername());
        if (optionalUser.isEmpty()) {
            throw new UsernameNotFoundException("User not found with email: " + userDetails.getUsername());
        }

        User user = optionalUser.get();
        String role = user.getRole();  // ✅ Fetches "ADMIN" from DB

        return Jwts.builder()
            .setSubject(user.getEmail())
            .claim("role", role)  // ✅ Stores "ADMIN" directly, without "ROLE_"
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 10 hours
            .signWith(getSigningKey(), SignatureAlgorithm.HS256)
            .compact();
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public String extractRole(String token) {
        return extractClaim(token, claims -> claims.get("role", String.class));
    }
    
    public boolean validateToken(String token, UserDetails userDetails) {
        try {
            String username = extractUsername(token);
            return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
        } catch (JwtException e) {
            System.out.println("Invalid JWT Token: " + e.getMessage());
            return false;
        }
    }

    private boolean isTokenExpired(String token) {
        return extractClaim(token, Claims::getExpiration).before(new Date());
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claimsResolver.apply(claims);
    }
}
