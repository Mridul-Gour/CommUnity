package com.example.controller;

import com.example.model.Parking;
import com.example.repository.ParkingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/parking")
@CrossOrigin(origins = "http://localhost:5173") // Adjust if your frontend URL differs
public class ParkingController {

    @Autowired
    private ParkingRepository parkingRepository;

    // ✅ Fetch All Parking Lots
    @GetMapping
    public List<Parking> getAllParking() {
        return parkingRepository.findAll();
    }

    // ✅ Fetch Parking Lots by Block (Optional)
    @GetMapping("/block/{block}")
    public List<Parking> getParkingByBlock(@PathVariable String block) {
        return parkingRepository.findByBlock(block);
    }

    // ✅ Add New Parking Lot
    @PostMapping
    public Parking addParking(@RequestBody Parking parking) {
        return parkingRepository.save(parking);
    }

    // ✅ Update Parking Lot Details
    @PutMapping("/{id}")
    public Parking updateParking(@PathVariable String id, @RequestBody Parking updatedParking) {
        Optional<Parking> existingParking = parkingRepository.findById(id);
        if (existingParking.isPresent()) {
            Parking parking = existingParking.get();
            parking.setParkingId(updatedParking.getParkingId());
            parking.setFlatNumber(updatedParking.getFlatNumber());
            parking.setBlock(updatedParking.getBlock());
            return parkingRepository.save(parking);
        }
        return null; // Handle properly in production
    }

    // ✅ Delete Parking Lot
    @DeleteMapping("/{id}")
    public void deleteParking(@PathVariable String id) {
        parkingRepository.deleteById(id);
    }
}
