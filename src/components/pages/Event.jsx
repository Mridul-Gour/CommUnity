import { useState, useEffect } from "react";
import axios from "axios";
import "./ui/EventModal.css";

const EventPage = () => {
    const [events, setEvents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newEvent, setNewEvent] = useState({ name: "", date: "", description: "", imageUrl: "" });
    const [feedbacks, setFeedbacks] = useState([]);
    const [feedback, setFeedback] = useState("");
    const [showFeedback, setShowFeedback] = useState(false);
    
   
    useEffect(() => {
        fetchEvents();
    }, []);

    // Fetch events from MongoDB
    const fetchEvents = async () => {
        try {
            const response = await axios.get("http://localhost:8080/events");
            setEvents(response.data);
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    };

   
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return; 
    
        const formData = new FormData();
        formData.append("image", file);
    
        try {
            const response = await axios.post("http://localhost:8080/events/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
    
            if (response.data && response.data.imageUrl) {
                setNewEvent((prevEvent) => ({
                    ...prevEvent,
                    imageUrl: response.data.imageUrl,
                }));
            } else {
                console.error("Image upload response missing imageUrl:", response.data);
            }
        } catch (error) {
            console.error("Error uploading image:", error.response?.data || error.message);
        }
    };
    

   
    const handleCreateEvent = async () => {
        if (!newEvent.name || !newEvent.date || !newEvent.description) {
            alert("Please fill in all fields!");
            return;
        }
    
        try {
            await axios.post("http://localhost:8080/events", newEvent);
            setNewEvent({ name: "", date: "", description: "", imageUrl: "" }); 
            setShowModal(false);
            setShowFeedback(true);
            setTimeout(fetchEvents, 500); 
        } catch (error) {
            console.error("Error adding event:", error);
        }
    };
  
    
    // const handleDeleteEvent = async (id) => {
    //     try {
    //         await axios.delete(`http://localhost:8080/events/${id}`);
    //         fetchEvents();
    //     } catch (error) {
    //         console.error("Error deleting event:", error);
    //     }
    // };
     
    const handleDeleteEvent = async (id) => {
        if (!id) {
            console.error("Error: No event ID provided for deletion.");
            return;
        }
    
        try {
            await axios.delete(`http://localhost:8080/events/${id}`);
            setEvents((prevEvents) => prevEvents.filter((event) => event._id !== id));
        } catch (error) {
            console.error("Error deleting event:", error.response?.data || error.message);
        }
    };
    
  

    // Handle submitting feedback
    const handleFeedbackSubmit = () => {
        setFeedbacks([...feedbacks, feedback]);
        setFeedback("");
    };

    return (
        <div className="event-container">
          <h2>Events</h2>
            <button className="create-event-btn" onClick={() => setShowModal(true)}>Create Event</button>
            
           
<div className="events-section">
  {events.map((event) => (
    <div key={event._id || event.id} className="event-card">
      <h3>{event.name}</h3>
      <p>{new Date(event.date).toLocaleDateString()}</p>
      <p>{event.description}</p>

      {/* Display Image */}
      {event.imageUrl && (
        <img
          src={event.imageUrl}
          alt={event.name}
          style={{
            width: "150px",
            height: "150px",
            objectFit: "cover",
            borderRadius: "10px",
          }}
        />
      )}

      <button onClick={() => handleDeleteEvent(event._id)}>Delete</button>
    </div>
  ))}
</div>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowModal(false)}>&times;</span>
                        <input type="text" placeholder="Event Name" onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })} />
                        <input type="date" onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} />
                        <textarea placeholder="Description" onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}></textarea>
                        <input type="file" onChange={handleImageUpload} />
                        <button onClick={handleCreateEvent}>Add Event</button>
                    </div>
                </div>
            )}

            {showFeedback && (
                <div className="feedback-section">
                    <h2>Feedback</h2>
                    <input type="text" value={feedback} onChange={(e) => setFeedback(e.target.value)} placeholder="Enter feedback" />
                    <button onClick={handleFeedbackSubmit}>Submit Feedback</button>
                    <ul>
                        {feedbacks.map((fb, index) => (
                            <li key={index}>{fb}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default EventPage;
