import React from "react";
import "./UserProfile.css"; 

const UserProfile = () => {
  return (
    <div className="user-profile-container">
      <h2 className="profile-title">User Profile</h2>
      <div className="profile-card">
        <div className="profile-sidebar">
          <h3 className="user-name">Pavani</h3>
          <p className="flat-info">Flat - A234</p>
        </div>
        <div className="profile-details">
          <h4 className="info-heading">INFORMATION</h4>
          <div className="info-grid">
            <div className="info-item">
              <span className="label">Society Name</span>
              <span className="value">Aravali Hills</span>
            </div>
            <div className="info-item">
              <span className="label">Name</span>
              <span className="value">Pavani</span>
            </div>
            <div className="info-item">
              <span className="label">Block</span>
              <span className="value">Block A</span>
            </div>
            <div className="info-item">
              <span className="label">Flat No</span>
              <span className="value">A234</span>
            </div>
            <div className="info-item">
              <span className="label">Phone</span>
              <span className="value">9728134546</span>
            </div>
            <div className="info-item">
              <span className="label">Email</span>
              <span className="value">pavani@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
