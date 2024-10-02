import React, { useState } from "react";
import { FaInfoCircle, FaEnvelope, FaUser, FaSignOutAlt } from "react-icons/fa"; // Importing icons
import "../css/Topbar.css"; // Topbar CSS
import { useNavigate } from "react-router-dom"; // Import useNavigate
import LoginSignupPage from "../Separate_Pages/LoginSignupPage"; // Import your login/signup component
import Logo from "../images/logo1.png"; // Import your logo

interface TopbarProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
}

const Topbar: React.FC<TopbarProps> = ({ isLoggedIn, setIsLoggedIn }) => {
  const [showLoginModal, setShowLoginModal] = useState(false); // State to show/hide login modal
  const navigate = useNavigate(); // Hook for navigation

  // Handle logo click navigation
  const handleLogoClick = () => {
    if (isLoggedIn) {
      navigate("/dashboard"); // Navigate to dashboard if logged in
    } else {
      navigate("/"); // Redirect to homepage if not logged in
    }
  };

  // Handle option clicks like login, logout, settings
  const handleOptionClick = (option: string) => {
    if (option === "login") {
      setShowLoginModal(true); // Show the login/signup modal when "Login" is clicked
    } else if (option === "logout") {
      setIsLoggedIn(false); // Handle log out
      localStorage.removeItem("isLoggedIn"); // Remove login state from localStorage
      navigate("/"); // Redirect to homepage after logout
    } else if (option === "settings") {
      navigate("/settings"); // Navigate to the settings page
    }
  };

  // Close the login modal
  const handleCloseModal = () => {
    setShowLoginModal(false); // Close modal
  };

  return (
    <>
      <div className="topbar">
        {/* Logo */}
        <img
          src={Logo}
          alt="Logo"
          className="logo-image"
          onClick={handleLogoClick}
        />
        <ul className="topbar-menu">
          <li onClick={() => navigate("/about-us")}>
            <FaInfoCircle className="icon" /> About Us
          </li>
          <li onClick={() => navigate("/contact-us")}>
            <FaEnvelope className="icon" /> Contact Us
          </li>

          {/* Conditionally render menu options based on login state */}
          {isLoggedIn ? (
            <>
              <li onClick={() => navigate("/account-info")}>
                <FaUser className="icon" /> My Account
              </li>

              <li onClick={() => handleOptionClick("logout")}>
                <FaSignOutAlt className="icon" /> Log Out
              </li>
            </>
          ) : (
            <>
              <li onClick={() => handleOptionClick("login")}>
                <FaUser className="icon" /> Sign In/Sign Up
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Display the Login/Signup Modal */}
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
