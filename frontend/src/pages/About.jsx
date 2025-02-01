import React from 'react';
import '../styles/About.css';
import aboutImage from '../assets/images/about-us.jpg'; // Adjust the path as needed
import indiaImage from '../assets/images/india.png'; // Importing India image
import usaImage from '../assets/images/usa.png'; // Importing USA image
import ukImage from '../assets/images/uk.png'; // Importing UK image
import australiaImage from '../assets/images/australia.png'; // Importing Australia image
import Footer from '../components/Footer'; 

const AboutUs = () => {
  return (
    <div className="about-us">
      <div className='title'>
        <h1>About Us</h1>
      </div>
      <div className='info'>
        <p>
          HelpCare NGO is dedicated to improving the lives of children and families in need. Our mission is to provide support, resources, and care to those who require it the most. With a commitment to making a difference, we work tirelessly to bring hope and positive change to communities around the world. Our initiatives focus on education, health, and well-being, ensuring that every individual has the opportunity to thrive and lead a fulfilling life.
        </p>
      </div>
      <img src={aboutImage} alt="About HelpCare NGO" className="about-image" />
      <div className="our-sections">
        <div className="section">
          <h2>Our Vision</h2>
          <p>Our vision is to create a world where every child has the opportunity to succeed and reach their full potential, regardless of their circumstances.</p>
        </div>
        <div className="section">
          <h2>Our Mission</h2>
          <p>Our mission is to provide essential support and resources to children and families in need, fostering an environment of growth, education, and well-being.</p>
        </div>
        <div className="section">
          <h2>Our Values</h2>
          <p>We believe in compassion, integrity, and dedication. Our values drive us to act with empathy, honesty, and a commitment to making a positive impact in the world.</p>
        </div>
      </div>
      <div className="our-branches">
        <h2>Our Branches</h2>
        <div className="branches">
          <div className="branch">
            <h3>India</h3>
            <img src={indiaImage} alt="India" className="branch-image" />
            <p>Gateway of India, Colaba, Mumbai, Maharashtra 400001</p>
          </div>
          <div className="branch">
            <h3>United States</h3>
            <img src={usaImage} alt="USA" className="branch-image" />
            <p>1234 Main St, Suite 500, New York, NY 10001</p>
          </div>
          <div className="branch">
            <h3>United Kingdom</h3>
            <img src={ukImage} alt="UK" className="branch-image" />
            <p>5678 High St, London, W1A 1AA</p>
          </div>
          <div className="branch">
            <h3>Australia</h3>
            <img src={australiaImage} alt="Australia" className="branch-image" />
            <p>1122 George St, Sydney, NSW 2000</p>
          </div>
        </div>
      </div>
      <div >
        <Footer/>
      </div>
    </div>
  );
};

export default AboutUs;
