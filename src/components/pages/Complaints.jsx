
import { useState, useEffect } from "react"; 
import "./ui/Complaints.css"; 

const API_URL = "http://localhost:8080/api/complaints";

const Complaints = () => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [complaints, setComplaints] = useState([]);

  // Fetch complaints from backend
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setComplaints(data))
      .catch((err) => console.error("Error fetching complaints:", err));
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !title || !description) return;

    const newComplaint = { name, title, description };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newComplaint),
      });

      if (response.ok) {
        const savedComplaint = await response.json();
        setComplaints([savedComplaint, ...complaints]); // Add new complaint to state
        setName("");
        setTitle("");
        setDescription("");
      }
    } catch (error) {
      console.error("Error submitting complaint:", error);
    }
  };

  // Handle complaint deletion
  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setComplaints(complaints.filter((comp) => comp.id !== id));
    } catch (error) {
      console.error("Error deleting complaint:", error);
    }
  };

  return (
   
      <div className="complaints-page">
        <div className="complaints-container">
          <h2 className="complaints-title">Submit a Complaint</h2>
          <form className="complaints-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name *"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
              required
            />
            <input
              type="text"
              placeholder="Title *"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input-field"
              required
            />
            <textarea
              placeholder="Description *"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="textarea-field"
              required
            ></textarea>
            <button type="submit" className="submit-btn">Submit Complaint</button>
          </form>
    
          <h3 className="complaints-title">Complaint History</h3>
          <div className="complaints-list">
            {complaints.length === 0 ? (
              <p className="no-complaints">No complaints submitted yet.</p>
            ) : (
              complaints.map((comp) => (
                <div key={comp.id} className="complaint-item">
                  <strong>{comp.title}</strong>
                  <p><strong>Name:</strong> {comp.name}</p>
                  <p><strong>Description:</strong> {comp.description}</p>
                  <button onClick={() => handleDelete(comp.id)} className="delete-btn">
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
    
};

export default Complaints;
