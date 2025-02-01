// src/pages/Contact.js

import React, { useEffect, useState } from 'react';
import '../styles/Contact.css'; // Import your CSS file for styling
import { useForm } from "react-hook-form";
import useWeb3Forms from "@web3forms/react";
import {addFeedback} from '../firebase/firebase'
import Footer from '../components/Footer'; 

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // You can add form submission logic here (e.g., send data to a server)
  //   setFormSubmitted(true);
  //   setFormData({ name: '', email: '', message: '' }); // Clear form after submission
  // };
  const {register, reset, handleSubmit} = useForm();

  const [isSuccess, setIsSuccess] = useState(false);
  const [result, setResult] = useState(null);

  const accessKey = "4ae00dbe-a2a9-42b0-bc21-d8b803bd9857";
  const onSubmit = async (data)=>{
    await addFeedback(data)
    setResult("Your Response is recored")
    reset()
  }
  // const { submit: onSubmit } = useWeb3Forms({
  //   access_key: accessKey,
  //   settings: {
  //     from_name: "Acme Inc",
  //     subject: "New Contact Message from your Website",
  //     // ... other settings
  //   },
  //   onSuccess: (msg, data) => {
  //     console.log(data)
  //     setIsSuccess(true);
  //     setResult(msg);
  //     reset();
  //   },
  //   onError: (msg, data) => {
  //     setIsSuccess(false);
  //     setResult(msg);
  //   },
  // });
  // const [jokes,setjokes]=useState([])

  // useEffect(()=>{
  //   axios.get('/api/jokes')
  //   .then((res)=>{
  //     setjokes(res.data)
  //   })
  //   .catch((error)=>{
  //     console.log(error);
  //   })
  // },[])

  return (
    <div className="contact-page">
      <header className="contact-header">
        <h1>Contact Us</h1>
        <p>We’d love to hear from you. Reach out to us with any questions or feedback.</p>
      </header>

      <section className="contact-form">
        <h2>Get in Touch</h2>
        {formSubmitted && <p className="thank-you-message">Thank you for your message. We will get back to you soon!</p>}
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='form-group'>
              <input type="text" {...register("name", { required: true })} placeholder='Name'/>
              <input type="email" {...register("email", { required: true })} placeholder='Email'/>
              <textarea {...register("message", { required: true })} placeholder='Message'></textarea>
              <button type="submit">Submit Form</button>
            </div>

        </form>

      <div>{result}</div>
        {/* <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button type="submit" className="submit-button">Send Message</button>
        </form> */}
      </section>

      <section className="contact-details">
        <h2>Our Contact Information</h2>
        <p>If you have any questions or need further assistance, feel free to reach out to us through the following channels:</p>
        <ul>
          <li><strong>Email:</strong> info@helpcarengo.org</li>
          <li><strong>Phone:</strong> +91 1234567890</li>
          <li><strong>Address:</strong> 22, Silver Oak Road, Kharadi, Pune, Maharashtra 411014</li>
        </ul>
      </section>

      {/* Footer */}
      <div>
          <Footer/>
      </div>
    </div>
  );
};

export default ContactPage;
