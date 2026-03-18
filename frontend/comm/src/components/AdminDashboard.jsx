import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get('http://localhost:8080/complaints');
        setComplaints(response.data);
      } catch (error) {
        console.error('Error fetching complaints:', error);
      }
    };
    fetchComplaints();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:8080/complaints/${id}?status=${status}`);
      alert(`Complaint marked as ${status}`);
      window.location.reload();
    } catch (error) {
      console.error('Error updating complaint:', error);
    }
  };

  return (
    <div className="admin-container">
      <h2>Admin Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((complaint) => (
            <tr key={complaint.id}>
              <td>{complaint.name}</td>
              <td>{complaint.title}</td>
              <td>{complaint.description}</td>
              <td>{complaint.status}</td>
              <td>
                {complaint.status === 'unsolved' && (
                  <button onClick={() => handleUpdateStatus(complaint.id, 'solved')}>Mark as Solved</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
