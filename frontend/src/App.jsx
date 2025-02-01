// src/App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route ,Navigate} from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/About";
import Events from "./pages/Events";
import Donate from "./pages/Donate";
import Volunteer from "./pages/Volunteer";
import Impact from "./pages/Impact";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import ManageEvents from "./pages/ManageEvents";
import ManageVolunteers from "./pages/ManageVolunteers";
import Messages from "./pages/Messages";
import AdminLogin from "./pages/AdminLogin"; // Ensure AdminLogin is imported
import Navigation from "./components/Navigation";
import "./App.css"; // Import global CSS here
import { useSelector } from "react-redux";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";


function App() {
  const isAdminLoggedIn = localStorage.getItem('adminLoggedIn');
  // const isAdminLoggedIn = useSelector((state) => state.auth.status);

  return (
    <Router>
      <div>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<Events />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/impact" element={<Impact />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
          
          {/* Protect admin routes */}
          {/* login fail */}
          <Route
            path="/admin"
            element={<AdminLogin />}
          />
           <Route
          path="/admin/manage-events"
          element={isAdminLoggedIn ? <ManageEvents /> : <Navigate to="/admin-login" />}
        />
        <Route
          path="/admin/manage-volunteers"
          element={isAdminLoggedIn ? <ManageVolunteers /> : <Navigate to="/admin-login" />}
        />
        <Route
          path="/admin/messages"
          element={isAdminLoggedIn ? <Messages /> : <Navigate to="/admin-login" />}
        />
          {/* login sucess */}
          <Route path="/admin-login" element={isAdminLoggedIn ? <Admin /> : <Navigate to="/admin" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
