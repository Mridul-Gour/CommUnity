import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../components/SignUp.css';

const SignUp = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: ''
    });

    const [errors, setErrors] = useState({
        email: '',
        password: '',
        role: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' }); // Clear individual field error
    };

    const validate = () => {
        let valid = true;
        const newErrors = { email: '', password: '', role: '' };

        if (!formData.email) {
            newErrors.email = 'Email is required!';
            valid = false;
        } else if (!formData.email.includes('@') || !formData.email.includes('.')) {
            newErrors.email = 'Email must include "@" and "."';
            valid = false;
        }

        if (!formData.password) {
            newErrors.password = 'Please enter the password!';
            valid = false;
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters.';
            valid = false;
        }

        if (!formData.role) {
            newErrors.role = 'Select the role!';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        const endpoint = formData.role === "admin"
            ? 'http://localhost:8080/auth/admin/signup'
            : 'http://localhost:8080/auth/resident/signup';

        try {
            const response = await axios.post(endpoint, formData, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });

            if (response.status === 200) {
                alert("Signup successful! Please complete your profile.");
                navigate('/signup_first');
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert("User already exists! Redirecting to login...");
                navigate('/login');
            } else {
                console.error("Signup Error:", error.response?.data || error.message);
                alert("Signup failed. Please try again.");
            }
        }
    };

    return (
        <div className='signup_section'>
            <div className='signup_img'>
                <img src="https://img.staticmb.com/mbcontent/images/uploads/2022/7/difference-between-flat-and-apartment.jpg" alt="Apartment" />
            </div>
            <div className='signup_form'>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEPnJztpWSqZ8Mtwxyc-qAqT5fI-PG8dHWNQ&s" alt="Signup" />
                <h3>Signup</h3>
                <form onSubmit={handleSubmit} noValidate> {/* Disabled browser validation */}
                    <label>Email</label>
                    <input
                        type='email'
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? 'error-field' : ''}
                    />
                    {errors.email && <p className="error">{errors.email}</p>}

                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={errors.password ? 'error-field' : ''}
                    />
                    {errors.password && <p className="error">{errors.password}</p>}

                    <label>Role</label>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className={errors.role ? 'error-field' : ''}
                    >
                        <option value="">Select</option>
                        <option value="admin">Admin</option>
                        <option value="resident">Resident</option>
                    </select>
                    {errors.role && <p className="error">{errors.role}</p>}

                    <button type="submit">Signup</button>
                </form>
                <p>Already have an account? <Link to="/login">Login here</Link></p>
            </div>
        </div>
    );
};

export default SignUp;
