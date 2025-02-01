// src/components/Sidebar.js

import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Sidebar.css'; // Make sure this path is correct

const Sidebar = () => {
  return (
    <nav className="admin-sidebar">
      <ul>
        <li>
          <NavLink to="/admin" activeClassName="active">Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/admin/manage-events" activeClassName="active">Manage Events</NavLink>
        </li>
        <li>
          <NavLink to="/admin/manage-volunteers" activeClassName="active">Manage Volunteers</NavLink>
        </li>
        <li>
          <NavLink to="/admin/messages" activeClassName="active">Messages</NavLink>
        </li>
        <li>
          <button onClick={() => { localStorage.removeItem('adminLoggedIn'); window.location.href = '/admin-login'; }}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
