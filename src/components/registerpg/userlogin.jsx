import { useState } from "react";
import "../registerpg/adminlogin.css";

const UserLogin = () => {
    const [formData, setFormData] = useState({
        name: "",
        phoneNumber: "",
        password:"",
        societyName: "",
        flatNo: "",
        postalcode: "",
        role: "resident" 
       
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting form data:", formData); 
        try {
            const response = await fetch("http://localhost:8080/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
                mode: "cors",
            });

            const responseData = await response.json();
            console.log("Response:", responseData); 

            if (response.ok) {
                alert("User registered successfully!");
                setFormData({
                    name: "",
                    phoneNumber: "",
                    societyName: "",
                    flatNo: "",
                    postalcode: "",
                    role: "resident"
                   
                });
            } else {
                alert(`Error: ${responseData.length ? responseData[0] : "Validation failed"}`);
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
                <h3>Sign Up</h3>
               </div> 
               <form className="form" onSubmit={handleSubmit}>
                <label htmlFor="name">Name </label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />

                <label htmlFor="phoneNumber">Phone Number </label>
                <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />

                <label htmlFor="societyName">Society Name </label>
                <input type="text" name="societyName" value={formData.societyName} onChange={handleChange} required />

                <label htmlFor="flatNo">Flat No </label>
                <input type="text" name="flatNo" value={formData.flatNo} onChange={handleChange} required />

                <label htmlFor="postalcode">Postal Code </label>
                <input type="text" name="postalcode" value={formData.postalcode} onChange={handleChange} required />

                <button>Register</button>
               </form>
            </div>
        </div> 
    );
};

export default UserLogin;
