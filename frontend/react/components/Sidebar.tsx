import React from "react";
import "../css/Sidebar.css";
import logo from "../images/Untitled.png"; // Adjust the path to your logo image
import { FaChartLine, FaClock, FaMapMarkerAlt, FaBook } from "react-icons/fa"; // Importing icons

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <img src={logo} alt="Logo" className="logo-image" />
      </div>
      <ul className="sidebar-menu">
        <li>
          <FaChartLine className="sidebar-icon" /> Interactive Data
        </li>
        <li>
          <FaClock className="sidebar-icon" /> Time Lapse
        </li>
        <li>
          <FaMapMarkerAlt className="sidebar-icon" /> Localized Stories
        </li>
        <li>
          <FaBook className="sidebar-icon" /> Educational Resources
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
