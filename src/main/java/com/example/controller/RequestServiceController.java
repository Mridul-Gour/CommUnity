package com.example.controller;
import com.example.model.RequestService;
import com.example.repository.RequestServiceRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173") 
@RestController
@RequestMapping("/api/requests")
public class RequestServiceController {

    @Autowired
    private RequestServiceRepository requestServiceRepository;

    @GetMapping
    public ResponseEntity<List<RequestService>> getAllRequests() {
        return ResponseEntity.ok(requestServiceRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getRequestById(@PathVariable("id") String id) {
        Optional<RequestService> requestService = requestServiceRepository.findById(id);
        
        if (requestService.isPresent()) {
            return ResponseEntity.ok(requestService.get()); 
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Request not found"); 
        }
    }
    
    

    @PostMapping
    public ResponseEntity<?> addRequest(@RequestBody RequestService requestService) {
        if (requestService.getName() == null || requestService.getPhone() == null || requestService.getFlatNo() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid request data");
        }
        RequestService savedRequest = requestServiceRepository.save(requestService);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedRequest);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRequest(@PathVariable String id) {
        if (!requestServiceRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Request not found");
        }
        requestServiceRepository.deleteById(id);
        return ResponseEntity.ok("Service request deleted successfully!");
    }
}
