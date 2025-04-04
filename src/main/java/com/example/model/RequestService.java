package com.example.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "requests")
public class RequestService {
    @Id
    private String id;
    private String type;
    private String name;
    private String flatNo;
    private String phone;
    private String notes;

    // Constructors
    public RequestService() {}

    public RequestService(String type, String name, String flatNo, String phone, String notes) {
        this.type = type;
        this.name = name;
        this.flatNo = flatNo;
        this.phone = phone;
        this.notes = notes;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getFlatNo() { return flatNo; }
    public void setFlatNo(String flatNo) { this.flatNo = flatNo; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}
