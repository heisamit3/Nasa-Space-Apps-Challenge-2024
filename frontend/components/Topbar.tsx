import React, { useState } from "react";
import { FaInfoCircle, FaEnvelope, FaUser } from "react-icons/fa"; // Importing icons
import "../css/Topbar.css"; // Topbar CSS
import LoginSignupPage from "./LoginSignupPage"; // Importing LoginSignupPage component
import logo from "../images/logo1.png"; // Adjust the path to your logo image
import { useNavigate } from "react-router-dom"; // Import useNavigate

interface TopbarProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
}

const Topbar: React.FC<TopbarProps> = ({ isLoggedIn, setIsLoggedIn }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleCloseModal = () => {
    setShowLoginModal(false);
  };

  const handleLogoClick = () => {
    if (isLoggedIn) {
      navigate("/dashboard");
    } else {
      navigate("/"); // Redirect to homepage if not logged in
    }
  };

  const handleUserClick = () => {
    navigate("/dashboard");
  };

  return (
    <>
      <div className="topbar">
        <img
          src={logo}
          alt="Logo"
          className="logo-image"
          onClick={handleLogoClick} // Add click event to logo
        />
        <ul className="topbar-menu">
          <li>
            <FaInfoCircle className="icon" /> About Us
          </li>
          <li>
            <FaEnvelope className="icon" /> Contact Us
          </li>
          {isLoggedIn ? (
            <li onClick={handleUserClick}>
              <FaUser className="icon" /> My Account
            </li>
          ) : (
            <li onClick={handleLoginClick}>
              <FaUser className="icon" /> Sign In/Sign Up
            </li>
          )}
        </ul>
      </div>
      {showLoginModal && (
        <div className="login-modal">
          <LoginSignupPage
            onClose={handleCloseModal}
            setIsLoggedIn={setIsLoggedIn}
          />
        </div>
      )}
    </>
  );
};

export default Topbar;
