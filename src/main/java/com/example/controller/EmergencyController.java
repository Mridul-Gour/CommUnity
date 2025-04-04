package com.example.controller;

import com.example.model.Emergency;
import com.example.repository.EmergencyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/emergency")
@CrossOrigin(origins = "http://localhost:5173")

public class EmergencyController {

    @Autowired
    private EmergencyRepository repository;

    // Add Security Guard
    @PostMapping("/add")
    public Emergency addGuard(@RequestBody Emergency guard) {
        return repository.save(guard);
    }

    // Get All Security Guards
    @GetMapping("/all")
    public List<Emergency> getAllGuards() {
        return repository.findAll();
    }

    // Get Guards by Block
    @GetMapping("/block/{block}")
    public List<Emergency> getGuardsByBlock(@PathVariable String block) {
        return repository.findByBlock(block);
    }

    // Delete Security Guard
    @DeleteMapping("/delete/{id}")
    public void deleteGuard(@PathVariable String id) {
        repository.deleteById(id);
    }
}
