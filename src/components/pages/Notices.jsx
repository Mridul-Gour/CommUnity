

import { useState, useEffect } from "react";
import "./ui/Notices.css";

const Notices = () => {
  const [notices, setNotices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/notices");
      const data = await response.json();
      setNotices(data);
    } catch (error) {
      console.error("Error fetching notices:", error);
    }
  };

  const handleSubmit = async () => {
    if (title.trim() === "" || description.trim() === "") return;

    const newNotice = {
      title,
      description,
      date: new Date().toLocaleString(),
    };

    try {
      const method = editIndex !== null ? "PUT" : "POST";
      const url = editIndex !== null 
        ? `http://localhost:8080/api/notices/${notices[editIndex].id}`
        : "http://localhost:8080/api/notices";
      
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newNotice),
      });

      if (response.ok) {
        fetchNotices();
      }
    } catch (error) {
      console.error("Error submitting notice:", error);
    }

    setTitle("");
    setDescription("");
    setEditIndex(null);
    setShowModal(false);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:8080/api/notices/${id}`, { method: "DELETE" });
      fetchNotices();
    } catch (error) {
      console.error("Error deleting notice:", error);
    }
  };

  const handleEdit = (index) => {
    const notice = notices[index];
    setTitle(notice.title);
    setDescription(notice.description);
    setEditIndex(index);
    setShowModal(true);
  };

  return (
    <div className="notices-page">
      <div className="notices-container">
        <h2>Notices</h2>
        <button className="create-btn" onClick={() => setShowModal(true)}>
          + Create Notice
        </button>

        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>{editIndex !== null ? "Edit Notice" : "Create Notice"}</h3>
              <input
                type="text"
                placeholder="Notice Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                placeholder="Notice Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <div className="modal-buttons">
                <button onClick={handleSubmit}>
                  {editIndex !== null ? "Update" : "Add"}
                </button>
                <button className="cancel-btn" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="notices-list">
          {notices.map((notice, index) => (
            <div key={notice.id} className="notice-card">
              <div className="notice-content">
                <h4>{notice.title}</h4>
                <p>{notice.description}</p>
                <span className="notice-date">{notice.date}</span>
                <div className="notice-actions">
                  <button className="edit-btn" onClick={() => handleEdit(index)}>
                    ✏️ Edit
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(notice.id)}>
                    ❌ Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notices;
