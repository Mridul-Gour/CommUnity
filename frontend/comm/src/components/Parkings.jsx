import React, { useState, useEffect } from "react";
import "./Parkings.css";

const Parkings = () => {
  const [selectedBlock, setSelectedBlock] = useState("A");
  const [parkingData, setParkingData] = useState({
    A: [
      { id: "P-A101", flatNumber: "A101" },
      { id: "P-A102", flatNumber: "A102" },
    ],
    B: [
      { id: "P-B201", flatNumber: "B201" },
      { id: "P-B202", flatNumber: "B202" },
    ],
  });

  const [newFlatNumber, setNewFlatNumber] = useState("");
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userProfile"));
    if (user?.role) {
      setUserRole(user.role.toUpperCase());
    }
  }, []);

  // Add Parking Lot
  const addParkingLot = () => {
    if (!newFlatNumber.trim()) return;
    const newParkingID = `P-${selectedBlock}${Math.floor(100 + Math.random() * 900)}`;
    const newParkingLot = { id: newParkingID, flatNumber: newFlatNumber };

    setParkingData((prevData) => ({
      ...prevData,
      [selectedBlock]: [...prevData[selectedBlock], newParkingLot],
    }));

    setNewFlatNumber("");
  };

  // Delete Parking Lot
  const deleteParkingLot = (parkingID) => {
    setParkingData((prevData) => ({
      ...prevData,
      [selectedBlock]: prevData[selectedBlock].filter((lot) => lot.id !== parkingID),
    }));
  };

  return (
    <div className="parking-container">
      {/* Block Switcher */}
      <div className="block-switcher">
        <button
          className={selectedBlock === "A" ? "active" : ""}
          onClick={() => setSelectedBlock("A")}
        >
          Block A
        </button>
        <button
          className={selectedBlock === "B" ? "active" : ""}
          onClick={() => setSelectedBlock("B")}
        >
          Block B
        </button>
      </div>

      {/* Parking Summary */}
      <div className="parking-summary">
        <h2>Parking Overview</h2>
        <p><strong>Total Parking Lots:</strong> 50</p>
        <p><strong>Occupied Lots:</strong> {parkingData[selectedBlock].length}</p>
        <p><strong>Available Lots:</strong> {50 - parkingData[selectedBlock].length}</p>
        <p><strong>Selected Block:</strong> {selectedBlock}</p>
      </div>

      {/* Only Admins Can Add Parking */}
      {userRole === "ADMIN" && (
        <div className="add-parking">
          <input
            type="text"
            placeholder="Enter Flat Number"
            value={newFlatNumber}
            onChange={(e) => setNewFlatNumber(e.target.value)}
          />
          <button onClick={addParkingLot}>Add Parking Lot</button>
        </div>
      )}

      {/* Parking List Table */}
      <div className="parking-list">
        <h2>Parking Lot List - Block {selectedBlock}</h2>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Parking ID</th>
              <th>Flat Number</th>
              {userRole === "ADMIN" && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {parkingData[selectedBlock].map((lot, index) => (
              <tr key={lot.id}>
                <td>{index + 1}</td>
                <td>{lot.id}</td>
                <td>{lot.flatNumber}</td>
                {userRole === "ADMIN" && (
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => deleteParkingLot(lot.id)}
                    >
                      ❌ Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Parkings;
