import React from "react";
import { FaInfoCircle, FaEnvelope, FaUser } from "react-icons/fa"; // Importing icons
import "../css/Topbar.css"; // Ensure this path is correct


const Topbar: React.FC = () => {
  return (
    <div className="topbar">
      <ul className="topbar-menu">
        <li>
          <FaInfoCircle className="icon" /> About Us
        </li>
        <li>
          <FaEnvelope className="icon" /> Contact Us
        </li>
        <li>
          <FaUser className="icon" /> Sign In/Sign Up
        </li>
      </ul>
    </div>
  );
};


export default Topbar;
