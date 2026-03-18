import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "../components/Events.css";
import { SideBarData } from "./SideBarData";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [userData, setUserData] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [ratings, setRatings] = useState({}); // Store event ratings
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/events");
        const backendEvents = response.data;

        const storedEvents = JSON.parse(localStorage.getItem("events")) || [];

        const ugadiEvent = {
          id: "ugadi-default",
          name: "Ugadi Celebration",
          date: "March 25, 2025",
          description: "Join us for a vibrant Ugadi festival!",
          imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrKfH4qgjeXTHYsBkbkUZpVGxTQSCSaQMV4g&s"
        };

        setEvents([ugadiEvent, ...backendEvents, ...storedEvents]);

        // Load ratings from localStorage
        const storedRatings = JSON.parse(localStorage.getItem("eventRatings")) || {};
        setRatings(storedRatings);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();

    const storedUser = localStorage.getItem("userProfile");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  const handleDelete = (eventId) => {
    const updatedEvents = events.filter((event) => event.id !== eventId);
    setEvents(updatedEvents);

    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    const filteredStoredEvents = storedEvents.filter((event) => event.id !== eventId);
    localStorage.setItem("events", JSON.stringify(filteredStoredEvents));
  };

  const handleRating = (eventId, rating) => {
    const updatedRatings = { ...ratings, [eventId]: rating };
    setRatings(updatedRatings);
    localStorage.setItem("eventRatings", JSON.stringify(updatedRatings));
  };

  return (
    <div className="app">
      <div className="top-bar">
        <h2>Upcoming Events</h2>
        <div className="user-info">
          <span>Welcome, {userData?.name || "Guest"}!</span>
          <FaUserCircle className="user-icon" onClick={() => setShowProfile(!showProfile)} />
        </div>

        {showProfile && (
          <div className="profile-dropdown">
            <p>{userData?.name}</p>
            <p>{userData?.email}</p>
            <button onClick={() => navigate("/userprofile")}>View Profile</button>
          </div>
        )}
      </div>

      <div className="sidebar">
        <ul className="SidebarList">
          {SideBarData.map((val, key) => (
            <li
              key={key}
              className="row"
              id={window.location.pathname === val.link ? "active" : ""}
              onClick={() => {
                window.location.pathname = val.link;
              }}
            >
              <div className="icon">{val.icon}</div>
              <div className="title">{val.title}</div>
            </li>
          ))}
        </ul>
      </div>

      <div className="main-content">
        {events.length > 0 ? (
          events.map((event, index) => (
            <div key={index} className="event-card">
              <h2>{event.name}</h2>
              <p><strong>Date:</strong> {event.date}</p>
              <p><strong>Description:</strong> {event.description}</p>
              {event.imageUrl && <img src={event.imageUrl} alt="Event" className="event-img" />}
              
              {/* Show delete button only for admins */}
              {userData?.role === "admin" && (
                <>
                  <button className="delete-btn" onClick={() => handleDelete(event.id)}>
                    Delete
                  </button>
                  {ratings[event.id] && <p><strong>Average Rating:</strong> {ratings[event.id]} ⭐</p>}
                </>
              )}

              {/* Show star rating only for residents */}
              {userData?.role === "resident" && (
                <div className="rating-container">
                  <p><strong>Rate this event:</strong></p>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={star <= (ratings[event.id] || 0) ? "star selected" : "star"}
                      onClick={() => handleRating(event.id, star)}
                    >
                      ★
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No upcoming events.</p>
        )}
      </div>
    </div>
  );
};

export default Events;
