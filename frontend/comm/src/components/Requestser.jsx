import React, { useState } from 'react';
import axios from 'axios';
import '../components/Requestser.css';

const Requestser = () => {
  const [selectedService, setSelectedService] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [requests, setRequests] = useState([]);

  const [addressError, setAddressError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [generalError, setGeneralError] = useState('');

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setGeneralError('');
  };

  const handleSendRequest = async () => {
    let valid = true;
    setAddressError('');
    setPhoneError('');
    setGeneralError('');

    if (!selectedService || !address || !phone) {
      setGeneralError('Please Select any Service!');
      valid = false;
    }

    const addressStart = address.trim().charAt(0).toUpperCase();
    if (address && addressStart !== 'A' && addressStart !== 'B') {
      setAddressError('Address must start with either "A" or "B".');
      valid = false;
    }

    const phoneDigits = phone.trim();
    const phoneRegex = /^\d{10}$/;
    if (phone && !phoneRegex.test(phoneDigits)) {
      setPhoneError('Phone number must be exactly 10 digits.');
      valid = false;
    }

    if (!valid) return;

    const newRequest = {
      service: selectedService,
      address,
      phone,
      notes,
    };

    try {
      const response = await axios.post(
        `http://localhost:8080/request/${selectedService.toLowerCase()}`,
        newRequest,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      console.log('Request sent successfully:', response.data);

      setRequests([...requests, newRequest]);
      setSelectedService('');
      setAddress('');
      setPhone('');
      setNotes('');
    } catch (error) {
      console.error('Error sending request:', error);
      setGeneralError('Request Sent Succesfully !');
    }
  };

  return (
    <div className="request-container">
      <h2>Request Services</h2>

      {/* Service Selection */}
      <h3>Select Service Type</h3>
      <div className="service-buttons">
        {['Water', 'House Keeping', 'Gas', 'Plumbing', 'Garbage Collection'].map((service) => (
          <button
            key={service}
            onClick={() => handleServiceSelect(service)}
            className={selectedService === service ? 'selected' : ''}
          >
            {service}
          </button>
        ))}
      </div>

      {/* Error on top if fields are missing */}
      {generalError && <p className="error">{generalError}</p>}

      {/* Service Request Form */}
      <h3>Service Request Details</h3>
      <div className="request-form">
        <label>Address</label>
        <input
          type="text"
          placeholder="Enter your Address here"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        {addressError && <p className="error">{addressError}</p>}

        <label>Phone No</label>
        <input
          type="text"
          placeholder="Enter your Phone No"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        {phoneError && <p className="error">{phoneError}</p>}

        <label>Additional Notes</label>
        <textarea
          placeholder="Enter additional details (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <button onClick={handleSendRequest}>Send Request</button>
      </div>

      {/* Display Submitted Requests */}
      {requests.length > 0 && (
        <div className="submitted-requests">
          <h3>Submitted Requests</h3>
          {requests.map((req, index) => (
            <div key={index} className="request-item">
              <p><strong>Service:</strong> {req.service}</p>
              <p><strong>Address:</strong> {req.address}</p>
              <p><strong>Phone:</strong> {req.phone}</p>
              {req.notes && <p><strong>Notes:</strong> {req.notes}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Requestser;
