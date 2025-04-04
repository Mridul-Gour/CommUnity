package com.example.repository;

import com.example.model.Signup;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface SignupRepository extends MongoRepository<Signup, String> {
    Optional<Signup> findByEmail(String email);
}
