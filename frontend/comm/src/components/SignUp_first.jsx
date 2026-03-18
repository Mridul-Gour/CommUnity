import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/SignUp_first.css';

const SignUp_first = () => {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    name: '',
    phone: '',
    societyName: '',
    role: '',
    flatNo: '',
    postal: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    societyName: '',
    role: '',
    flatNo: '',
    postal: '',
  });

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.id]: e.target.value });
    setErrors({ ...errors, [e.target.id]: '' }); // Clear errors on change
  };

  const validate = () => {
    let valid = true;
    const newErrors = {};

    // Check for empty fields
    for (const [key, value] of Object.entries(userDetails)) {
      if (!value.trim()) {
        newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required.`;
        valid = false;
      }
    }

    // Name validation (only letters)
    if (userDetails.name && !/^[A-Za-z\s]+$/.test(userDetails.name)) {
      newErrors.name = 'Name can only contain letters and spaces.';
      valid = false;
    }

    // Phone number validation (10 digits)
    if (userDetails.phone && !/^\d{10}$/.test(userDetails.phone)) {
      newErrors.phone = 'Phone number must be exactly 10 digits.';
      valid = false;
    }

    // Flat No validation (starts with A or B, followed by digits)
    if (userDetails.flatNo && !/^[AB]\d+$/.test(userDetails.flatNo.trim())) {
      newErrors.flatNo = 'Flat No must start with "A" or "B" followed by digits.';
      valid = false;
    }

    // Postal code validation (6 digits)
    if (userDetails.postal && !/^\d{6}$/.test(userDetails.postal)) {
      newErrors.postal = 'Postal code must be exactly 6 digits.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    localStorage.setItem('userProfile', JSON.stringify(userDetails));
    navigate('/events');
  };

  return (
    <div className='signupf_section'>
      <div className='signupf_img'>
        <img
          src="https://img.staticmb.com/mbcontent/images/uploads/2022/7/difference-between-flat-and-apartment.jpg"
          alt="Apartment"
        />
      </div>
      <div className='signupf_form'>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEPnJztpWSqZ8Mtwxyc-qAqT5fI-PG8dHWNQ&s"
          alt="Signup"
        />
        <h3>Fill Your Details !!</h3>

        {Object.keys(userDetails).map((key) => (
          <div key={key} className="input-group">
            <input
              type={key === 'phone' || key === 'postal' ? 'number' : 'text'}
              placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
              id={key}
              value={userDetails[key]}
              onChange={handleChange}
              className={errors[key] ? 'error-field' : ''}
            />
            {errors[key] && <p className="error">{errors[key]}</p>}
          </div>
        ))}

        <button onClick={handleSubmit}>Add Details</button>
      </div>
    </div>
  );
};

export default SignUp_first;
