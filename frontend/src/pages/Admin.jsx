// src/pages/Admin.js

import React, { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Admin.css';
import {logout} from '../firebase/firebase'
import {useDispatch} from 'react-redux'
// import {logout as authLogout} from '../store/authSlice'
import {getEvents} from '../firebase/firebase'
import {getAllVolunteer} from '../firebase/firebase'
import Sidebar from '../components/Sidebar'; // Adjust the path as necessary

const Admin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  // Logout functionality to clear session and redirect to login
  const handleLogout = async() => {
    // Clear session or any auth token
    // localStorage.removeItem('adminLoggedIn');
    await logout()
    localStorage.removeItem('adminLoggedIn');
    // dispatch(authLogout())
    navigate('/admin/login');
  };
  const [events, setEvents] = useState([]);
  const [allvolunterr,setallvolunteer]=useState([])
  useEffect(()=>{
    async function getdata(params) {
      const data = await getEvents()
      const result =[]
      data.forEach((doc) => {
        const subcontent = doc.data()
        console.log("########",subcontent)
        result.push({id:doc.id,title:subcontent.title,location:subcontent.location,description:subcontent.description,imageurl:subcontent.imageurl,startdate:subcontent.startdate,enddate:subcontent.enddate})
        // console.log(`${doc.id} => `, doc.data());
        });
        console.log(result)
        setEvents(result)
        // setdone(true)
        const voldata = await getAllVolunteer()
        const volresult =[]
        voldata.forEach((doc) => {
          const subcontent = doc.data()
          console.log("########",subcontent)
          volresult.push({id:doc.id,name:subcontent.name,email:subcontent.email,phone:subcontent.phone,address:subcontent.address,availability:subcontent.availability})
          // console.log(`${doc.id} => `, doc.data());
        });
        setallvolunteer(volresult)
    }
    getdata()
  },[])

  return (
    <div className="admin-page">
      <div className="sidebar">
        <Sidebar /> {/* Include Sidebar here */}
      </div>
      <header className="admin-header">
        <h1>Welcome, Admin</h1>
      </header>
      <div className="admin-content">
        {/* <nav className="admin-sidebar">
          <ul>
            <li><Link to="/admin-login">Dashboard</Link></li>
            <li><Link to="/admin/manage-events">Manage Events</Link></li>
            <li><Link to="/admin/manage-volunteers">Manage Volunteers</Link></li>
            <li><Link to="/admin/messages">Messages</Link></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </ul>
        </nav> */}
        <main className="admin-main">
          <h2>Dashboard Overview</h2>
          <div className="dashboard-stats">
            <div className="stat-card">
              <h3>Total Events</h3>
              <p>{events.length}</p>
            </div>
            <div className="stat-card">
              <h3>Total Volunteers</h3>
              <p>{allvolunterr.length}</p>
            </div>
            {/* <div className="stat-card">
              <h3>Unread Messages</h3>
              <p>5</p>
            </div> */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Admin;
