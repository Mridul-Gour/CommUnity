import  { useState } from "react";
 import "./ui/Home.css";

const Home = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="home-contain">
           
            <div className="profile-icon" onClick={() => {
        console.log("Profile icon clicked!");
        setShowModal(true);
    }}
        >
                👤 
            </div>

          
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>User Details</h3>
                        <p>Name: Ram kr</p>
                        <p>Email: ram765e@example.com</p>
                        <p>Role: Admin</p>
                        <button className="closebtn" onClick={() => setShowModal(false)}>Close</button>
                    </div>
                </div>
            )}

       
            <div className="stats-grid">
                <div className="stat-block">Total Blocks: <span>40</span></div>
                <div className="stat-block">Total Flats: <span>3</span></div>
                <div className="stat-block">Occupied Flats: <span>2</span></div>
                <div className="stat-block">Total People: <span>50</span></div>
                <div className="stat-block">Total Complaints: <span>0</span></div>
                <div className="stat-block">Total Parking Plots: <span>0</span></div>
                <div className="stat-block">Total Vendors: <span>1</span></div>
                <div className="stat-block">Upcoming Events: <span>0</span></div>
                <div className="stat-block">Total Securities: <span>0</span></div>
            </div>
        </div>
    );
};

export default Home;
