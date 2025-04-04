
import { Outlet } from "react-router-dom";
import Sidebar from "./pages/Sidebar";
import "./pages/ui/adminDashboard.css";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <Sidebar />
      <div className="admin-content">
        <Outlet /> 
      </div>
    </div>
  );
};

export default AdminDashboard;
