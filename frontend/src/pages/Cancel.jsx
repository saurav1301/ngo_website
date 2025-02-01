import React from 'react';
import { useNavigate } from 'react-router-dom';

const Cancel = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/donate');
  };

  return (
    <div>
      <h2>Payment Cancelled</h2>
      <p>Your donation process was cancelled. Please try again.</p>
      <button onClick={handleRedirect}>Back to Donation Page</button>
    </div>
  );
};

export default Cancel;
