import { useState } from "react";
import "../registerpg/adminlogin.css";

const AdminLogin = () => {
    const [formData, setFormData] = useState({
        name: "",
        phoneNumber: "",
        
        societyName: "",
        societyAddress: "",
        city: "",
        district: "",
        postal:"",
        role: "admin" 
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");
            
            if (!token) {
                alert("Unauthorized: Please log in first.");
                return;
            }

            const response = await fetch("http://localhost:8080/api/admin", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${"token"}`
                 },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                //const textData = await response.text();
                const responseData = await response.json();
                alert("Admin registered successfully!");
                navigate("/dashboard");
                setFormData({
                    name: "",
                    phoneNumber: "",
                    societyName: "",
                    societyAddress: "",
                    city: "",
                    district: "",
                    postal:"",
                    role: "admin"
                });
            } else {
                console.error("Failed to register admin:", responseData);
                alert(`Error: ${responseData.length ? responseData[0].defaultMessage : "Validation failed"}`);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="login_sec">
            <div className="login_imgg">
                <img src="https://assets-news.housing.com/news/wp-content/uploads/2022/03/28143140/Difference-between-flat-and-apartment-686x400.jpg" alt="" />
            </div>
            <div className="login_frm">
               <div className="ttl">
                <h3>Fill These Details To Continue</h3>
               </div> 
              <form className="form" onSubmit={handleSubmit}>
                <label>Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />

                <label>Phone Number</label>
                <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />

                <label>Society Name</label>
                <input type="text" name="societyName" value={formData.societyName} onChange={handleChange} required />

                <label>Society Address</label>
                <input type="text" name="societyAddress" value={formData.societyAddress} onChange={handleChange} required />

                <label>City</label>
                <input type="text" name="city" value={formData.city} onChange={handleChange} required />

                <label>District</label>
                <input type="text" name="district" value={formData.district} onChange={handleChange} required />

                <label>Postal</label>
                <input type="text" name="postal" value={formData.postal} onChange={handleChange} required />

                <button>Register</button>
              </form> 
            </div>
        </div>
    );
}

export default AdminLogin;
