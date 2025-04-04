

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import App from "./App";
import FirstPage from "./components/FirstPage";
import AdminDashboard from "./components/AdminDashboard";
import SignUp from "./components/SignUp";
import Login from "./components/login";
import AdminLogin from "./components/registerpg/adminlogin";
import UserLogin from "./components/registerpg/userlogin";
import Apartments from "./components/residents/Apartments";
import UserProfile from "./components/residents/UserProfile";
import Home from "./components/pages/Home"; 
import Event from "./components/pages/Event";
import RequestServices from "./components/pages/RequestServices";
import Complaints from "./components/pages/Complaints";
import Notices from "./components/pages/Notices";
import Posts from "./components/pages/Posts";
import Parkings from "./components/pages/Parkings";
import Emergency from "./components/pages/Emergency";
import Billings from "./components/pages/Billings";


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        {/* Public Routes */}
        {/* <Route path="/" element={<App />} /> */}
        <Route path="/" element={<FirstPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/userlogin" element={<UserLogin />} />
        <Route path="/apartments" element={<Apartments />} />
        <Route path="/profile" element={<UserProfile />} />

        {/* Admin Dashboard */}
        <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<Home />} />
          <Route path="requests" element={<RequestServices />} />
          <Route path="complaints" element={<Complaints />} />
          <Route path="events" element={<Event />} />
          <Route path="notices" element={<Notices />} />
          <Route path="posts" element={<Posts />} />
          <Route path="parking" element={<Parkings />} />
          <Route path="emergency" element={<Emergency />} />
          <Route path="billing" element={<Billings />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
