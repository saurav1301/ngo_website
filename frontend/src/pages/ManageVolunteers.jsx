// src/pages/ManageVolunteers.js

import React, { useEffect, useState } from 'react';
import {getAllVolunteer,deleteSpecificVolunteer} from '../firebase/firebase'
import Sidebar from '../components/Sidebar'; // Adjust the path as necessary
import '../styles/ManageVolunteer.css'; // Import CSS for styling

const ManageVolunteers = () => {

  const [allvolunterr,setallvolunteer]=useState([])
  const [volunteerdelete,setdeletevoiunteer]=useState(false)


  const handleDelete = async(id) => {
    await deleteSpecificVolunteer(id)
    setdeletevoiunteer(true)
  };

  useEffect(()=>{
    async function getdata(params) {
      const data = await getAllVolunteer()
      const result =[]
      data.forEach((doc) => {
        const subcontent = doc.data()
        console.log("########",subcontent)
        result.push({id:doc.id,name:subcontent.name,email:subcontent.email,phone:subcontent.phone,address:subcontent.address,availability:subcontent.availability})
        // console.log(`${doc.id} => `, doc.data());
      });
      setallvolunteer(result)
    }
    getdata()
  },[volunteerdelete])
  return (
    <div className="manage-page">
      <div className="sidebar">
        <Sidebar /> {/* Include Sidebar here */}
      </div>
      <div className="volnegi">
      <h2>Manage Volunteers</h2>
      {/* Add functionality for managing volunteers here */}
      {allvolunterr.length > 0 ? (
            allvolunterr.map(volunteer => (
              <div className='volunteer' key={volunteer.id}>
                <h3>{volunteer.name}</h3>
                <h3>{volunteer.email}</h3>
                <h3>{volunteer.phone}</h3>
                {/* <button onClick={() => openModal(story.story)}>Read More</button> */}
                <button onClick={() => handleDelete(volunteer.id)} className="delete-button">Delete</button>
              </div>
            ))
          ) : (
            <p>No volunteer is registered</p>
          )}
      </div>
    </div>
  );
};

export default ManageVolunteers;
