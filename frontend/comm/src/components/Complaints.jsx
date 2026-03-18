import React, { useState, useEffect } from 'react';
import './Complaints.css';

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [formData, setFormData] = useState({ name: '', title: '', description: '' });
  const [userData, setUserData] = useState(null);

  
  useEffect(() => {
    const storedComplaints = JSON.parse(localStorage.getItem('complaints')) || [];
    setComplaints(storedComplaints);


    const storedUser = JSON.parse(localStorage.getItem('userProfile'));
    setUserData(storedUser);
  }, []);

  const updateComplaints = (updatedComplaints) => {
    localStorage.setItem('complaints', JSON.stringify(updatedComplaints));
    setComplaints(updatedComplaints);
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();

   
    const newComplaint = { 
      id: Date.now(),  // Unique ID for deletion
      name: formData.name, 
      title: formData.title, 
      description: formData.description, 
      status: 'unsolved' 
    };

   
    const updatedComplaints = [...complaints, newComplaint];
    updateComplaints(updatedComplaints);

  
    setFormData({ name: '', title: '', description: '' });
    alert("Complaint Submitted! It will be resolved.");
  };

  const markAsSolved = (complaintId) => {
    const updatedComplaints = complaints.map((c) => 
      c.id === complaintId ? { ...c, status: 'solved' } : c
    );
    updateComplaints(updatedComplaints);
  };

  
  const deleteComplaint = (complaintId) => {
    const updatedComplaints = complaints.filter((c) => c.id !== complaintId);
    updateComplaints(updatedComplaints);
  };

  // Count total, solved, and unsolved complaints
  const totalComplaints = complaints.length;
  const solvedComplaints = complaints.filter(c => c.status === 'solved').length;
  const unsolvedComplaints = totalComplaints - solvedComplaints;

  return (
    <div className="complaints-container">
      {/* Complaint Summary */}
      <div className="complaint-summary">
        <div className="summary-box">Total Complaints: {totalComplaints}</div>
        <div className="summary-box solved">Solved: {solvedComplaints}</div>
        <div className="summary-box unsolved">Unsolved: {unsolvedComplaints}</div>
      </div>

      {/* Complaint Form (Visible to all users) */}
      {/* Complaint Form (Visible only to non-admin users) */}
{userData?.role !== "admin" && (
  <div className="complaint-form">
    <h2>Submit a Complaint</h2>
    <form onSubmit={handleSubmit}>
      <label>Name</label>
      <input 
        type="text" 
        value={formData.name} 
        onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
        required 
      />

      <label>Title</label>
      <input 
        type="text" 
        value={formData.title} 
        onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
        required 
      />

      <label>Description</label>
      <textarea 
        value={formData.description} 
        onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
        required 
      ></textarea>

      <button type="submit">Submit Complaint</button>
    </form>
  </div>
)}


      {/* Complaint List */}
      <div className="complaint-list">
        <h2>Complaints</h2>
        {complaints.length > 0 ? (
          complaints.map((complaint) => (
            <div key={complaint.id} className={`complaint-item ${complaint.status}`}>
              <h3>{complaint.title}</h3>
              <p><strong>Name:</strong> {complaint.name}</p>
              <p><strong>Description:</strong> {complaint.description}</p>
              <p><strong>Status:</strong> {complaint.status}</p>

              {/* Show Solve & Delete options only for Admins */}
              {userData?.role === "admin" && (
                <>
                  {complaint.status === "unsolved" && (
                    <button className="solve-btn" onClick={() => markAsSolved(complaint.id)}>
                      Mark as Solved
                    </button>
                  )}
                  <button className="delete-btn" onClick={() => deleteComplaint(complaint.id)}>
                    Delete
                  </button>
                </>
              )}
            </div>
          ))
        ) : (
          <p>No complaints yet.</p>
        )}
      </div>
    </div>
  );
};

export default Complaints;
