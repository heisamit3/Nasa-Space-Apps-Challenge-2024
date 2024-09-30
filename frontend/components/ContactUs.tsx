import React from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa"; // Importing icons
import "../css/ContactUs.css"; // Import the CSS for the Contact Us page

const ContactUs: React.FC = () => {
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>We'd love to hear from you! Here's how you can reach us:</p>
      <div className="contact-info">
        <div className="contact-item">
          <FaPhone className="icon" />
          <span>Phone: +1 123 456 7890</span>
        </div>
        <div className="contact-item">
          <FaEnvelope className="icon" />
          <span>Email: contact@example.com</span>
        </div>
        <div className="contact-item">
          <FaMapMarkerAlt className="icon" />
          <span>Address: 1234 Street Name, City, Country</span>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
