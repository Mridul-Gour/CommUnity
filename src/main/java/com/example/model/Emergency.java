package com.example.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "emergency")
public class Emergency {
    @Id
    private String id;
    private String name;
    private String block;
    private String phone;

    public Emergency() {}

    public Emergency(String name, String block, String phone) {
        this.name = name;
        this.block = block;
        this.phone = phone;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getBlock() { return block; }
    public void setBlock(String block) { this.block = block; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
}
