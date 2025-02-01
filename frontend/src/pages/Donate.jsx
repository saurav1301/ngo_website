import React, { useState } from 'react';
import '../styles/Donate.css'; // Import your CSS file for styling
import donationImage from '../assets/images/donate.jpg'; // Example image
import Modal from '../components/Modal'; // Import the Modal component
import { loadStripe } from '@stripe/stripe-js';
import Footer from '../components/Footer'; 

// Stripe public key (replace with yours)
const stripePromise = loadStripe('pk_test_51Q55lxB6pbsjje06o4cSw0h9hR3pQzwKNOwsHIFO1kmWlrbsoqJ6AN4j1WQ9o8YG82VyO9WPm0GmCee7Oee8AfAn00KacWhB47');

const DonationPage = () => {
  const [donationAmount, setDonationAmount] = useState('');
  const [donationFrequency, setDonationFrequency] = useState('one-time');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    amount: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.amount) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const stripe = await stripePromise;

      const response = await fetch('http://localhost:5000/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          amount: formData.amount,
        }),
      });

      const session = await response.json();
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        setError(result.error.message);
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');
    }
  };


  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Here you would normally handle the form submission, e.g., sending data to a server
    setIsModalOpen(true); // Open the modal when form is submitted
    setDonationAmount(''); // Clear form fields
    setDonationFrequency('one-time'); // Reset frequency to default
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="donation-page">
      {/* Page Header */}
      <header className="donation-header">
        <h1>Donate</h1>
        <p>Your contribution makes a real difference in the lives of those we serve.</p>
      </header>

      {/* Main Content */}
      <div className="donation-content">
        {/* Donation Form Section */}
        <div className="donation-form-section">
          <h2>Make a Donation</h2>
          <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className='form-group' >
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className='form-group'>
          <label>Donation Amount:</label>
          <input type="number" name="amount" value={formData.amount} onChange={handleChange} required />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Donate</button>
      </form>

          {/* <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="amount">Donation Amount:</label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={donationAmount}
                onChange={(e) => setDonationAmount(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="donate-button">Donate Now</button>
          </form> */}
        </div>

        {/* Image and Content Section */}
        <div className="image-content-section">
          <img src={donationImage} alt="Donation" className="donation-image" />
          <div className="image-content">
            <h2>Why Donate?</h2>
            <p>Your donation helps us fund vital programs and services for those in need. Every contribution, no matter the size, makes a significant impact. Join us in our mission to create positive change and support our initiatives.</p>
          </div>
        </div>
      </div>

      {/* Modal for Thank You Message */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        message="Thank you for your generous donation!" 
      />

      {/* Footer */}
      <div>
      <Footer/>
      </div>
    </div>
  );
};

export default DonationPage;
