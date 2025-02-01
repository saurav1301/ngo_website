// src/components/Footer.js

import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import '../styles/Footer.css'; // Import the CSS file for styling

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>© 2024 HelpCare NGO. All rights reserved.</p>
                <div className="social-media">
                    <p>Follow us on:</p>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                        <FaFacebook />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                        <FaTwitter />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                        <FaInstagram />
                    </a>
                </div>
                <div className="contact-info">
                    <p>Contact us: <a href="https://avc.ac.in/">info@helpcarengo.org</a> | Phone: <a href="tel:+1234567890">+91 1234567890</a></p>
                </div>
                <div className="quick-links">
                    <p>Quick Links:</p>
                    <a href="/">Home</a>
                    <a href="/about">About Us</a>
                    <a href="/contact">Contact</a>
                    <a href="/volunteer">Volunteer</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
