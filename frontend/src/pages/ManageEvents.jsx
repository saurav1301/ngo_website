// src/pages/ManageEvent.js

import React, { useEffect, useState } from 'react';
import useEventForm from '../components/useEventForm'
import '../styles/ManageEvents.css'; // Import CSS for styling
import {addEvent,getEvents,deleteSpecificEvent} from '../firebase/firebase'
import Sidebar from '../components/Sidebar'; // Adjust the path as necessary

const ManageEvent = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [eventdelete,seteventdeleted] = useState(false)
  const [eventadded,seteventadded] = useState(false)


  const { formData, formErrors, handleInputChange, handleImageChange, validateForm ,setFormData} = useEventForm();

  const handleSubmit =async (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Submit the form
      console.log('Form Data:', formData);
      await addEvent(formData)
      setFormData({
        title: '',
        location: '',
        description: '',
        image: null,
        startDate: '',
        endDate: '',
      })
      seteventadded(true)

    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Handle the logic for posting the event (e.g., sending to an API or saving to state)
  //   setMessage(`Event "${title}" has been posted successfully!`);
    
  //   // Clear the form fields
  //   setTitle('');
  //   setDate('');
  //   setLocation('');
  //   setDescription('');
  // };
  const [events, setEvents] = useState([]);

  const handleDelete = async(id,imageurl) => {
    await deleteSpecificEvent(id,imageurl)
    seteventdeleted(true)
  };

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
    }
    getdata()
  },[eventdelete,eventadded])
  return (
    <div className="manage-event-container">
      <div className="sidebar">
        <Sidebar /> {/* Include Sidebar here */}
      </div>
      <div className="eventsnegi">
      <h2>Manage Events</h2>
      
      {/* <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Location:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">Post Event</button>
      </form>
      {message && <p className="success-message">{message}</p>} */}
      <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
        />
        {formErrors.title && <p style={{ color: 'red' }}>{formErrors.title}</p>}
      </div>

      <div>
        <label>Location:</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
        />
        {formErrors.location && <p style={{ color: 'red' }}>{formErrors.location}</p>}
      </div>

      <div>
        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />
        {formErrors.description && <p style={{ color: 'red' }}>{formErrors.description}</p>}
      </div>

      <div>
        <label>Upload Image:</label>
        <input
          type="file"
          name="image"
          onChange={handleImageChange}
        />
        {formErrors.image && <p style={{ color: 'red' }}>{formErrors.image}</p>}
      </div>

      <div>
        <label>Start Date:</label>
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label>End Date:</label>
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleInputChange}
        />
        {formErrors.dateError && <p style={{ color: 'red' }}>{formErrors.dateError}</p>}
      </div>

      <button type="submit">Submit</button>
    </form>
    <div>
      <h1>Events</h1>
      <div>
        {events.map((event) => (
          <div key={event.id} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
            <h2>{event.title}</h2>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Description:</strong> {event.description}</p>
            <p><strong>Start Date:</strong> {event.startdate}</p>
            <p><strong>End Date:</strong> {event.enddate}</p>
            {event.imageurl && (
              <div>
                <img src={event.imageurl} alt={event.title} style={{ width: '200px', height: 'auto' }} />
              </div>
            )}
            <button onClick={() => handleDelete(event.id,event.imageurl)} className="delete-button">Delete</button>
          </div>
        ))}
      </div>
    </div>
      </div>
    </div>
  );
};

export default ManageEvent;
