package com.example.repository;  

import com.example.model.RequestService;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RequestServiceRepository extends MongoRepository<RequestService, String> {
}
