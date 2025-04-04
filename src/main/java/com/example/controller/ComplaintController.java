package com.example.controller;

import com.example.model.Complaint;
import com.example.repository.ComplaintRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173") 
@RestController
@RequestMapping("/api/complaints")
public class ComplaintController {

    @Autowired
    private ComplaintRepository complaintRepository;

    // Fetch all complaints
    @GetMapping
    public List<Complaint> getAllComplaints() {
        return complaintRepository.findAll();
    }

    // Fetch a single complaint by ID
    @GetMapping("/{id}")
    public Optional<Complaint> getComplaintById(@PathVariable String id) {
        return complaintRepository.findById(id);
    }

    // Add a new complaint
    @PostMapping
    public Complaint addComplaint(@RequestBody Complaint complaint) {
        return complaintRepository.save(complaint);
    }

    // Delete a complaint by ID
    @DeleteMapping("/{id}")
    public String deleteComplaint(@PathVariable String id) {
        complaintRepository.deleteById(id);
        return "Complaint deleted successfully!";
    }
}
