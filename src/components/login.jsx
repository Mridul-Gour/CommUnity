


import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/login.css";

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const user = await response.json();
                alert("Login successful!");
    
                localStorage.setItem("user", JSON.stringify(user));
                // Redirect based on user role
                if (user.role === "Admin") {
                    navigate("/admin");
                } else if (user.role === "Resident") {
                    navigate("/userlogin");  // Redirect to resident dashboard
                } else {
                    alert("Invalid role assigned. Please contact support.");
                }
            } else {
                alert("Invalid email or password.");
            }
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    return (
        <div className="login_section">
            <div className="login_img">
                <img
                    src="https://assets-news.housing.com/news/wp-content/uploads/2022/03/28143140/Difference-between-flat-and-apartment-686x400.jpg"
                    alt="Login"
                />
            </div>
            <div className="login_form">
                <div className="title">
                    <h4>Login</h4>
                    <h3>Welcome Back</h3>
                </div>
                <form className="logfrm" onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />

                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />

                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;

