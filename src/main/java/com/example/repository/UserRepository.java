package com.example.repository;
 
import java.util.Optional;
import com.example.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
 
public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByPhoneNumber(String phoneNumber); // Find user by phone number
    Optional<User> findByEmail(String email);

}
