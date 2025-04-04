package com.example.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "roles")
public class Role {
    @Id
    private String id;
    private String name;

    // Constructors
    public Role() {}

    public Role(String name) {
        this.name = "ROLE_" + name.toUpperCase(); // ✅ Ensure proper format
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = "ROLE_" + name.toUpperCase();
    }
}
