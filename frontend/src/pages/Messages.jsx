// src/pages/Messages.js

import React, { useState,useEffect } from 'react';
import {getAllFeedback,deleteSpecificFeedback} from '../firebase/firebase'
import '../styles/Message.css'; // Import CSS for styling
import Sidebar from '../components/Sidebar'; // Adjust the path as necessary


const Messages = () => {

  const [allmsg,setallmsg] = useState([])

  const [msgdelete,setdeletemsg]=useState(false)


  const handleDelete = async(id) => {
    await deleteSpecificFeedback(id)
    setdeletemsg(true)
  };

  useEffect(()=>{
    async function getdata(params) {
      const data = await getAllFeedback()
      const result =[]
      data.forEach((doc) => {
        const subcontent = doc.data()
        console.log("########",subcontent)
        result.push({id:doc.id,name:subcontent.name,email:subcontent.email,message:subcontent.message})
        // console.log(`${doc.id} => `, doc.data());
      });
      setallmsg(result)
    }
    getdata()
  },[msgdelete])

  return (
    <div className="messages-page">
      <div className="sidebar">
        <Sidebar /> {/* Include Sidebar here */}
      </div>
      <div className="negimsg">
      <h2>Messages</h2>
      <p>View unread messages from users or volunteers.</p>
      {/* Add functionality to view and reply to messages here */}
      {allmsg.length > 0 ? (
            allmsg.map(msg => (
              <div key={msg.id} className='message'>
                <h3>{msg.name}</h3>
                <h3>{msg.email}</h3>
                <h3>{msg.message}</h3>
                <h1>{}</h1>
                {/* <button onClick={() => openModal(story.story)}>Read More</button> */}
                <button onClick={() => handleDelete(msg.id)} className="delete-button">Delete</button>
              </div>
            ))
          ) : (
            <p>No message</p>
          )}
      </div>
    </div>
  );
};

export default Messages;
