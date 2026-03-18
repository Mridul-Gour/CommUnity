import React, { useState, useEffect } from 'react';
import '../components/Notices.css';

const Notices = () => {
  const [userRole, setUserRole] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [noticeText, setNoticeText] = useState('');
  const [notices, setNotices] = useState([]);

  // Load role and notices from localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userProfile'));
    if (user?.role) {
      setUserRole(user.role.toUpperCase());
    }

    const storedNotices = JSON.parse(localStorage.getItem('notices')) || [];
    setNotices(storedNotices);
  }, []);

  // Save notices to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('notices', JSON.stringify(notices));
  }, [notices]);

  const handleCreateNotice = () => {
    setShowInput(true);
  };

  const handleAddNotice = () => {
    if (noticeText.trim() !== '') {
      const newNotice = {
        id: Date.now(),
        text: noticeText,
      };
      setNotices([...notices, newNotice]);
      setNoticeText('');
      setShowInput(false);
    }
  };

  const handleDeleteNotice = (id) => {
    const updated = notices.filter((n) => n.id !== id);
    setNotices(updated);
  };

  return (
    <div className="notices-container">
      {/* Create Notice Button (Visible to all roles) */}
      <div className="create_notice" onClick={handleCreateNotice}>
        + Create Notice
      </div>

      {/* Input box to add notice */}
      {showInput && (
        <div className="notice-input-box">
          <textarea
            placeholder="Enter notice description..."
            value={noticeText}
            onChange={(e) => setNoticeText(e.target.value)}
            className="notice-textarea"
          />
          <button className="add-notice-btn" onClick={handleAddNotice}>
            Add Notice
          </button>
        </div>
      )}

      {/* Display Notices */}
      <div className="notices-list">
        {notices.map((notice) => (
          <div key={notice.id} className="notice-item">
            <div className="notice-text">{notice.text}</div>
            <button
              className="delete-notice-btn"
              onClick={() => handleDeleteNotice(notice.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notices;
