import React, { useState } from 'react';
import '../components/EmergencyContacts.css';

const EmergencyContacts = () => {
  const [selectedBlock, setSelectedBlock] = useState('A'); // Track active block

  const guards = [
    { id: 1, name: 'Kathir', block: 'A', phone: '12345566' },
    { id: 2, name: 'Ravi', block: 'A', phone: '67890000' },
    { id: 3, name: 'Raj', block: 'B', phone: '98765432' },
    { id: 4, name: 'Surya', block: 'B', phone: '55544333' }
  ];

  // Filter guards based on selected block
  const filteredGuards = guards.filter(guard => guard.block === selectedBlock);

  return (
    <div className="emergency-container">
      <h2>Security Guard Details</h2>

      {/* Block Tabs */}
      <div className="block-buttons">
        <button 
          className={selectedBlock === 'A' ? 'active' : ''} 
          onClick={() => setSelectedBlock('A')}
        >
          Block A
        </button>
        <button 
          className={selectedBlock === 'B' ? 'active' : ''} 
          onClick={() => setSelectedBlock('B')}
        >
          Block B
        </button>
        <button className="add-btn">+ Add Security</button>
      </div>

      {/* Security Guard List */}
      <table className="guard-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Block</th>
            <th>Phone No</th>
          </tr>
        </thead>
        <tbody>
          {filteredGuards.length > 0 ? (
            filteredGuards.map((guard, index) => (
              <tr key={guard.id}>
                <td>{index + 1}</td>
                <td>{guard.name}</td>
                <td>{guard.block}</td>
                <td>{guard.phone}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No security guards in Block {selectedBlock}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmergencyContacts;
