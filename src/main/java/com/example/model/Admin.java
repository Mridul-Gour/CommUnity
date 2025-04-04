package com.example.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

@Document(collection = "admins") 
public class Admin {

    @Id
    private String id;
    private String email;
    private String password;

    public Admin() {}

    public Admin(String email, String password) {
        this.email = email;
        this.password = password;
    }

    // Getter for Email
    public String getEmail() {
        return email;
    }

    // Setter for Email
    public void setEmail(String email) {
        this.email = email;
    }

    // Getter for Password
    public String getPassword() {
        return password;
    }

    // Setter for Password
    public void setPassword(String password) {
        this.password = password;
    }


    @NotBlank(message = "Name is mandatory")
    private String name;

    @NotBlank(message = "Phone number is mandatory")
    @Pattern(regexp = "^\\d{10}$", message = "Phone number must be a 10-digit number")
    private String phoneNumber;

    @NotBlank(message = "Society name is mandatory")
    private String societyName;

    @NotBlank(message = "Society address is mandatory")
    private String societyAddress;

    @NotBlank(message = "City is mandatory")
    private String city;

    @NotBlank(message = "District is mandatory")
    private String district;
     
    @NotBlank(message = "Postal is mandatory")
    private String postal;
    
    @NotBlank(message = "Role is mandatory")
    private String role; 

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public String getSocietyName() { return societyName; }
    public void setSocietyName(String societyName) { this.societyName = societyName; }

    public String getSocietyAddress() { return societyAddress; }
    public void setSocietyAddress(String societyAddress) { this.societyAddress = societyAddress; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getDistrict() { return district; }
    public void setDistrict(String district) { this.district = district; }
    
    public String getPostal() { return postal; }
    public void setPostal(String postal) { this.postal = postal; }
}
