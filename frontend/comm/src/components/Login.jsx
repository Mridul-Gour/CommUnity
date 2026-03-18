import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../components/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  const validate = () => {
    let formErrors = {};
    let isValid = true;

    if (!email) {
      formErrors.email = 'Email is required.';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formErrors.email = 'Email is not valid.';
      isValid = false;
    }

    if (!password) {
      formErrors.password = 'Password is required.';
      isValid = false;
    } else if (password.length < 6) {
      formErrors.password = 'Password must be at least 6 characters.';
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        const response = await axios.post('http://localhost:8080/api/auth/login', { email, password }, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        });

        console.log('Login successful:', response.data);

        // Store user details in localStorage
        localStorage.setItem('userProfile', JSON.stringify(response.data));

        // Redirect to events page after login
        navigate('/events');

      } catch (error) {
        console.error('Login failed:', error.response ? error.response.data : error.message);
        alert('Invalid credentials. Please try again.');
      }
    }
  };

  return (
    <div className="login_section">
      <div className="login_image">
        <img
          src="https://img.staticmb.com/mbcontent/images/uploads/2022/7/difference-between-flat-and-apartment.jpg"
          alt=""
        />
      </div>
      <div className="login_form">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEPnJztpWSqZ8Mtwxyc-qAqT5fI-PG8dHWNQ&s"
          alt=""
        />
        <h3>Login</h3>
        <h2>Welcome Back!</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleInputChange}
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleInputChange}
            required
          />
          {errors.password && <p className="error">{errors.password}</p>}

          <button type="submit">Login</button>
        </form>

        <p>Don't have an account? <Link to="/signup">SignUp</Link></p>
      </div>
    </div>
  );
};

export default Login;
