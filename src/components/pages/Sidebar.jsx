

import { NavLink } from "react-router-dom";
import "./ui/sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Dashboard</h2>
      <ul>
        <li><NavLink to="/admin">🏠 Home</NavLink></li>
        <li><NavLink to="/admin/requests">📌 Request Services</NavLink></li>
        <li><NavLink to="/admin/complaints">⚠️ Complaints</NavLink></li>
        <li><NavLink to="/admin/events">🎉 Events</NavLink></li>
        <li><NavLink to="/admin/notices">📢 Notices</NavLink></li>
        <li><NavLink to="/admin/posts">📝 Posts</NavLink></li>
        <li><NavLink to="/admin/parking">🚗 Parking</NavLink></li>
        <li><NavLink to="/admin/emergency">🚑 Emergency Contacts</NavLink></li>
        <li><NavLink to="/admin/billing">💰 Billing</NavLink></li>
        <li className="logout-btn">
        <NavLink to="/">🚪 Log Out</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
