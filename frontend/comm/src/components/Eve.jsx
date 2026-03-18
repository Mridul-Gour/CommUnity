import React, { useState, useEffect } from 'react';
import './Eve.css';

const Eve = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('userProfile');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.role) {
        setUserRole(user.role.toUpperCase());
      } else {
        console.error("User role is missing:", user);
      }
    }
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile)); // Show preview
    }
  };

  const handleAddEvent = () => {
    if (!eventName || !eventDate || !eventDescription) {
      alert('Please fill in all fields');
      return;
    }

    if (userRole !== 'ADMIN') {
      alert("Access Denied: Only admins can add events.");
      return;
    }

    const newEvent = {
      id: Date.now(),
      name: eventName,
      date: eventDate,
      description: eventDescription,
      imageUrl: preview || '', // Store preview as image
    };

    // Store in Local Storage
    const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
    storedEvents.push(newEvent);
    localStorage.setItem('events', JSON.stringify(storedEvents));

    alert(`Event Added: ${eventName} on ${eventDate}`);

    // Clear inputs
    setEventName('');
    setEventDate('');
    setEventDescription('');
    setPreview(null);
  };

  if (userRole !== 'ADMIN') {
    return <h2 className="access-denied">Access Denied: Only admins can add events.</h2>;
  }

  return (
    <div className="eve-container">
      <h2>Add Event</h2>

      <div className="event-header">
        <label className="upload-box">
          {preview ? <img src={preview} alt="Preview" /> : "Upload"}
          <input type="file" className="file-input" accept="image/*" onChange={handleFileChange} />
        </label>

        <div className="event-info">
          <input type="text" className="event-input" placeholder="Event Name" value={eventName} onChange={(e) => setEventName(e.target.value)} />
          <input type="date" className="event-input" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
        </div>
      </div>

      <textarea className="event-descr" placeholder="Event Description" value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} />

      <button className="add-event-btn" onClick={handleAddEvent}>Add Event</button>
    </div>
  );
};

export default Eve;
