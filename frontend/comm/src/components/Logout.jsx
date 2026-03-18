import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/Logout.css'

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user session (Example: Removing user data from localStorage)
    localStorage.removeItem('userProfile');

    // Navigate to SignUp page
    navigate('/signup');
  };

  return (
    <div className="logout-container">
      <div className="logout-box">
        <h2>Are you sure you want to log out?</h2>
        <div className="logout-buttons">
          <button className="logout-yes" onClick={handleLogout}>Yes</button>
          <button className="logout-no" onClick={() => navigate(-1)}>No</button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
