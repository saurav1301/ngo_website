// src/pages/Volunteer.js

import React, { useState } from 'react';
import '../styles/Volunteer.css'; // Import your CSS file for styling
import Modal from 'react-modal';
import {useForm} from 'react-hook-form'
import {addVolunteer} from '../firebase/firebase' 
import Footer from '../components/Footer'; 
// Bind modal to app element for accessibility
Modal.setAppElement('#root');



const VolunteerPage = () => {

  const {register,handleSubmit,watch,setValue,control,getValues,reset} = useForm({
    defaultValues:{
        name:'',
        email:'',
    }
  })

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    availability: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit2 = async (data) => {
    // e.preventDefault();
    // Handle form submission, e.g., sending data to a server
    try {
      const response = await fetch('api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(data)
        // body: JSON.stringify(formData), // Send the form data as JSON
      });

      if (response.ok) {
        const result = await response.json();
        await addVolunteer(data)
        console.log('Form submitted successfully:', result);
        setModalContent('Thank you for your interest in volunteering with us!');
        setModalIsOpen(true);
        reset()
        setFormData({
          name: '',
          email: '',
          phone: '',
          address: '',
          availability: '',
        });
      } else {
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
    
  };

  const openModal = (content) => {
    setModalContent(content);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalContent('');
  };
  const onSubmit = (data)=>{
    console.log("React hook form",data)
  }

  return (
    <div className="volunteer-page">
      {/* Header Section */}
      <header className="volunteer-header">
        <h1>Become a Volunteer</h1>
        <p>Join us in making a difference in the lives of those in need.</p>
      </header>

      {/* Volunteer Benefits Section */}
      <section className="volunteer-benefits">
        <h2>Why Volunteer With Us?</h2>
        <ul>
          <li>Make a meaningful impact in your community.</li>
          <li>Gain valuable experience and skills.</li>
          <li>Meet like-minded individuals and build connections.</li>
          <li>Receive training and support from our team.</li>
        </ul>
      </section>

      {/* Volunteer Opportunities Section */}
      <section className="volunteer-opportunities">
        <h2>Current Opportunities</h2>
        <div className="opportunity-list">
          <div className="opportunity">
            <h3>Community Outreach</h3>
            <p>Assist in organizing community events and outreach programs.</p>
            <button onClick={() => openModal('Community Outreach: Assist in organizing community events and outreach programs.')}>Learn More</button>
          </div>
          <div className="opportunity">
            <h3>Fundraising Events</h3>
            <p>Help plan and execute fundraising events to support our initiatives.</p>
            <button onClick={() => openModal('Fundraising Events: Help plan and execute fundraising events to support our initiatives.')}>Learn More</button>
          </div>
          <div className="opportunity">
            <h3>Administrative Support</h3>
            <p>Provide administrative support to ensure smooth operation of our office.</p>
            <button onClick={() => openModal('Administrative Support: Provide administrative support to ensure smooth operation of our office.')}>Learn More</button>
          </div>
        </div>
      </section>

      {/* Volunteer Registration Form Section */}
      <section className="volunteer-form">
        <h2>Register as a Volunteer</h2>
        {/* <form onSubmit={handleSubmit(onSubmit)}>
            <div className='form-group'>
              <input type="text" {...register("name", { required: true })} placeholder='Name'/>
              <input type="email" {...register("email", { required: true })} placeholder='Email'/>
              <button type="submit">Submit Form</button>
            </div>
        </form> */}
        <form onSubmit={handleSubmit(handleSubmit2)}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              // value={formData.name}
              // onChange={handleChange}
              {...register("name", { required: true })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              // value={formData.email}
              // onChange={handleChange}
              {...register("email", { required: true })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              // value={formData.phone}
              // onChange={handleChange}
              {...register("phone", { required: true })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              // value={formData.address}
              // onChange={handleChange}
              // required
              {...register("address", { required: true })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="availability">Age:</label>
            <input
              type="text"
              id="availability"
              name="availability"
              // value={formData.availability}
              // onChange={handleChange}
              // required
              {...register("availability", { required: true })}
            />
          </div>
          <button type="submit" className="volunteer-button">Submit</button>
        </form>
      </section>

      {/* Thank You Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Thank You"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2>Thank You!</h2>
        <p>{modalContent}</p>
        <button onClick={closeModal} className="modal-close-button">Close</button>
      </Modal>

      {/* Footer */}
      <div>
        <Footer/>
      </div>
    </div>
  );
};

export default VolunteerPage;
