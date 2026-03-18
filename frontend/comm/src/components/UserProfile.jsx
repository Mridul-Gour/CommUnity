import React, { useEffect, useState } from 'react';
import '../components/UserProfile.css';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const storedData = localStorage.getItem('userProfile');
    if (storedData) {
      const data = JSON.parse(storedData);
      setUserData(data);
      setEditData(data); // Initialize editData with the current user data
    }
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setUserData(editData);
    localStorage.setItem('userProfile', JSON.stringify(editData));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(userData); // Reset changes if cancelled
    setIsEditing(false);
  };

  if (!userData) return <p>Loading...</p>;

  return (
    <div style={{ textAlign: 'center' }}>
      <div className='container'>
      <div className='nameofres'>
  <div>{isEditing ? editData.name : userData.name}</div>
  <br /><br/>
  <div>{isEditing ? editData.flatNo : userData.flatNo}</div>
</div>

  
        <div className='details'>
          <h3>INFORMATION</h3>
          <hr className='hrr' />
  
          <div className='info'>
            <div className='leftside'>
              <p><strong>Society Name:</strong></p>
              {isEditing ? (
                <input
                  type="text"
                  name="societyName"
                  value={editData.societyName}
                  onChange={handleChange}
                />
              ) : (
                userData.societyName
              )}
  
              <p><strong>Phone:</strong></p>
              {isEditing ? (
                <input
                  type="text"
                  name="phone"
                  value={editData.phone}
                  onChange={handleChange}
                />
              ) : (
                userData.phone
              )}
            </div>
  
            <div className='rightside'>
              <p><strong>Name:</strong></p>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={editData.name}
                  onChange={handleChange}
                />
              ) : (
                userData.name
              )}
  
              <p><strong>Flat No:</strong></p>
              {isEditing ? (
                <input
                  type="text"
                  name="flatNo"
                  value={editData.flatNo}
                  onChange={handleChange}
                />
              ) : (
                userData.flatNo
              )}
            </div>
          </div>
        </div>
      </div>
  
      {/* Button container moved outside */}
      <div className='button-container'>
        {isEditing ? (
          <>
            <button onClick={handleSave} className='save-btn'>Save</button>
            <button onClick={handleCancel} className='cancel-btn'>Cancel</button>
          </>
        ) : (
          <button onClick={handleEdit} className='edit-btn'>Edit Profile</button>
        )}
      </div>
    </div>
  );
  
};

export default UserProfile;
