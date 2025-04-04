import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../components/SignUp.css";

const SignUp = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        role: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: formData.email, 
                    password: formData.password,
                    role: formData.role
                }) // FIXED: Sending form data properly
            });

            

            if (response.ok) {
                //alert("Signup successful!");
                const textData = await response.text();
                alert(textData);

                if (formData.role === "Admin") {
                    navigate("/adminlogin");
                } else if (formData.role === "Resident") {
                    navigate("/userlogin");
                }
            } else {
                alert(data.message || "Signup failed. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="signup_section">
            <div className="signup_img">
                <img src="https://assets-news.housing.com/news/wp-content/uploads/2022/03/28143140/Difference-between-flat-and-apartment-686x400.jpg" alt="" />
            </div>
            <div className="signup_form">
                <h3>Sign Up</h3>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                    
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                    
                    <label htmlFor="role">Role</label>
                    <select name="role" id="role" value={formData.role} onChange={handleChange} required>
                        <option value="">Select</option>
                        <option value="Admin">Admin</option>
                        <option value="Resident">Resident</option>
                    </select>
                    
                    <button className='formInfo' type="submit">Sign Up</button>
                </form>
                <p className='formInfo'>Existing User?</p>
                <Link to="/login">Login</Link>
            </div>
        </div>
    );
};

export default SignUp;
