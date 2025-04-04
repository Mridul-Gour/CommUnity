package com.example.repository;

import com.example.model.Emergency;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface EmergencyRepository extends MongoRepository<Emergency, String> {
    List<Emergency> findByBlock(String block);
}
