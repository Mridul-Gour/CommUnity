
import { useState, useEffect } from "react";
import "./ui/Parking.css";

const TOTAL_PARKING_LOTS = 50;

const Parking = () => {
  const [parkings, setParkings] = useState([]);
  const [blockFilter, setBlockFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [parkingId, setParkingId] = useState("");
  const [flatNumber, setFlatNumber] = useState("");

  useEffect(() => {
    fetchParkings();
  }, []);

  const fetchParkings = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/parking");
      const data = await response.json();
      setParkings(data);
    } catch (error) {
      console.error("Error fetching parking data:", error);
    }
  };

  const handleAddParking = async () => {
    if (!parkingId || !flatNumber) return;

    const newParking = { parkingId, flatNumber };

    try {
      const response = await fetch("http://localhost:8080/api/parking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newParking),
      });

      if (response.ok) {
        const savedParking = await response.json();
        setParkings((prevParkings) => [...prevParkings, savedParking]);
      }
    } catch (error) {
      console.error("Error adding parking:", error);
    }

    setParkingId("");
    setFlatNumber("");
    setShowModal(false);
  };

  const handleDeleteParking = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/parking/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setParkings((prevParkings) => prevParkings.filter((p) => p.parkingId !== id));
      }
    } catch (error) {
      console.error("Error deleting parking:", error);
    }
  };

  
  const occupiedLots = parkings.length;
  const unoccupiedLots = TOTAL_PARKING_LOTS - occupiedLots;


  const filteredParkings = parkings.filter(
    (p) => blockFilter === "All" || p.block === blockFilter
  );

  return (
    <div className="parking-container">
      <h2>Parking Lots</h2>
      <div className="parking-stats">
        <div className="stat-box total">
          <h2>{TOTAL_PARKING_LOTS}</h2>
          <p>Total no of Parking lots</p>
        </div>
        <div className="stat-box occupied">
          <h2>{occupiedLots}</h2>
          <p>No of Parking lots Occupied</p>
        </div>
        <div className="stat-box unoccupied">
          <h2>{unoccupiedLots}</h2>
          <p>No of Parking lots Unoccupied</p>
        </div>
      </div>

      <div className="filter-buttons">
        <button onClick={() => setBlockFilter("All")} className={blockFilter === "All" ? "active" : ""}>All</button>
        <button onClick={() => setBlockFilter("Block A")} className={blockFilter === "Block A" ? "active" : ""}>Block - A</button>
        <button onClick={() => setBlockFilter("Block B")} className={blockFilter === "Block B" ? "active" : ""}>Block - B</button>
        <button className="add-parking-btn" onClick={() => setShowModal(true)}>+ Add Parking</button>
      </div>

      <table className="parking-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Parking ID</th>
            <th>Flat Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredParkings.map((parking, index) => (
            <tr key={parking.parkingId}>
              <td>{index + 1}</td>
              <td>{parking.parkingId}</td>
              <td>{parking.flatNumber}</td>
              <td>
                <button className="delete-btn" onClick={() => handleDeleteParking(parking.parkingId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add Parking</h3>
            <input
              type="text"
              placeholder="Parking ID"
              value={parkingId}
              onChange={(e) => setParkingId(e.target.value)}
            />
            <input
              type="text"
              placeholder="Flat Number"
              value={flatNumber}
              onChange={(e) => setFlatNumber(e.target.value)}
            />
            <div className="modal-buttons">
              <button onClick={handleAddParking}>Submit</button>
              <button className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Parking;
