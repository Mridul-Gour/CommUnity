package com.example.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "parking")
public class Parking {
    @Id
    private String id;
    private String parkingId;
    private String flatNumber;
    private String block; // Optional: Used for filtering (Block A, B, etc.)

    public Parking() {}

    public Parking(String parkingId, String flatNumber, String block) {
        this.parkingId = parkingId;
        this.flatNumber = flatNumber;
        this.block = block;
    }

    public String getId() {
        return id;
    }

    public String getParkingId() {
        return parkingId;
    }

    public void setParkingId(String parkingId) {
        this.parkingId = parkingId;
    }

    public String getFlatNumber() {
        return flatNumber;
    }

    public void setFlatNumber(String flatNumber) {
        this.flatNumber = flatNumber;
    }

    public String getBlock() {
        return block;
    }

    public void setBlock(String block) {
        this.block = block;
    }
}
