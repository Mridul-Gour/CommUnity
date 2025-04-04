import { useState, useEffect } from "react";
import axios from "axios";
import "./ui/Emergency.css";

const Emergency = () => {
  const [guards, setGuards] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newGuard, setNewGuard] = useState({ name: "", block: "A", phone: "" });
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchGuards();
  }, []);

  const fetchGuards = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/emergency/all");
      setGuards(response.data);
    } catch (error) {
      console.error("Error fetching security guards", error);
    }
  };

  const addSecurityGuard = async (e) => {
    e.preventDefault();
    if (!newGuard.name || !newGuard.phone) return;

    try {
      await axios.post("http://localhost:8080/api/emergency/add", newGuard);
      fetchGuards(); // Refresh the list
      setNewGuard({ name: "", block: "A", phone: "" });
      setShowModal(false);
    } catch (error) {
      console.error("Error adding security guard", error);
    }
  };

  const filteredGuards = guards.filter(
    (guard) => filter === "All" || guard.block === filter
  );

  return (
    <div className="emergency-page">
      <div className="emergency-container">
        <h2 className="title">Security Guard Details</h2>

        <div className="btn-group">
          <button className={`filter-btn ${filter === "All" ? "active" : ""}`} onClick={() => setFilter("All")}>
            All
          </button>
          <button className={`filter-btn ${filter === "A" ? "active" : ""}`} onClick={() => setFilter("A")}>
            Block - A
          </button>
          <button className={`filter-btn ${filter === "B" ? "active" : ""}`} onClick={() => setFilter("B")}>
            Block - B
          </button>
          <button className="add-btn" onClick={() => setShowModal(true)}>
            + Add Security
          </button>
        </div>

        <h3 className="block-title">{filter === "All" ? "All Blocks" : `Block - ${filter}`}</h3>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Block</th>
              <th>Phone no</th>
            </tr>
          </thead>
          <tbody>
            {filteredGuards.map((guard, index) => (
              <tr key={guard.id}>
                <td>{index + 1}</td>
                <td>{guard.name}</td>
                <td>{guard.block}</td>
                <td>{guard.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>Add Security Guard</h3>
              <form onSubmit={addSecurityGuard}>
                <input
                  type="text"
                  placeholder="Name"
                  value={newGuard.name}
                  onChange={(e) => setNewGuard({ ...newGuard, name: e.target.value })}
                  required
                />
                <select
                  value={newGuard.block}
                  onChange={(e) => setNewGuard({ ...newGuard, block: e.target.value })}
                >
                  <option value="A">Block A</option>
                  <option value="B">Block B</option>
                </select>
                <input
                  type="text"
                  placeholder="Phone no"
                  value={newGuard.phone}
                  onChange={(e) => setNewGuard({ ...newGuard, phone: e.target.value })}
                  required
                />
                <button type="submit" className="submit-btn">Add Guard</button>
                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Emergency;
