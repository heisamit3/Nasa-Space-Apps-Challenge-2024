import React, { useState } from "react";
import { FaInfoCircle, FaEnvelope, FaUser } from "react-icons/fa";
import "../css/Topbar.css"; // Ensure this path is correct
import LoginSignupPage from "./LoginSignupPage"; // Import the LoginSignup page

const Topbar: React.FC = () => {
  const [showLoginPage, setShowLoginPage] = useState(false);

  const toggleLoginPage = () => {
    setShowLoginPage(!showLoginPage); // Toggle visibility of the login/signup page
  };

  return (
    <div>
      {/* Topbar */}
      <div className="topbar">
        <ul className="topbar-menu">
          <li>
            <FaInfoCircle className="icon" /> About Us
          </li>
          <li>
            <FaEnvelope className="icon" /> Contact Us
          </li>
          <li onClick={toggleLoginPage}>
            <FaUser className="icon" /> Sign In/Sign Up
          </li>
        </ul>
      </div>

      {/* Render the LoginSignupPage directly below the topbar when clicked */}
      {showLoginPage && (
        <div className="login-signup-wrapper">
          <LoginSignupPage onClose={toggleLoginPage} /> {/* Pass onClose to LoginSignupPage */}
        </div>
      )}
    </div>
  );
};

export default Topbar;
