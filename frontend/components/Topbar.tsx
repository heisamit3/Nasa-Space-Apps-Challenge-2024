import React, { useState } from "react";
import { FaInfoCircle, FaEnvelope, FaUser } from "react-icons/fa"; // Importing icons
import "../css/Topbar.css"; // Topbar CSS
import LoginSignupPage from "./LoginSignupPage"; // Importing LoginSignupPage component

const Topbar: React.FC = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleCloseModal = () => {
    setShowLoginModal(false);
  };

  return (
    <>
      <div className="topbar">
        <ul className="topbar-menu">
          <li>
            <FaInfoCircle className="icon" /> About Us
          </li>
          <li>
            <FaEnvelope className="icon" /> Contact Us
          </li>
          <li onClick={handleLoginClick}>
            <FaUser className="icon" /> Sign In/Sign Up
          </li>
        </ul>
      </div>
      {showLoginModal && (
        <div className="login-modal">
          <LoginSignupPage onClose={handleCloseModal} />
        </div>
      )}
    </>
  );
};

export default Topbar;
