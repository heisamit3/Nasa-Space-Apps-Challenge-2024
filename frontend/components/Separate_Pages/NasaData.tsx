import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaMapMarkedAlt,
  FaChartBar,
  FaPlay,
  FaChevronDown,
} from "react-icons/fa"; // Import React Icons
import "../../css/NasaData.css"; // Importing the CSS file

const NasaData: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="container">
      <h1 className="title">NASA Data</h1>
      <h2 className="subtitle">Datasets</h2>

      <ul className="list">
        <li className="list-item">
          <div className="dropdown">
            <span className="dropdown-label">
              Air sea CO2 <FaChevronDown className="icon" />
            </span>
            <div className="dropdown-content">
              <a onClick={() => handleNavigation("/air-sea-co2-comparison")}>
                <FaMapMarkedAlt className="icon" /> Map
              </a>
              <a onClick={() => handleNavigation("/globalTemp/monthly")}>
                <FaChartBar className="icon" /> Statistics
              </a>
              <a onClick={() => handleNavigation("/globalTemp/daily")}>
                <FaPlay className="icon" /> Simulation
              </a>
            </div>
          </div>
        </li>

        <li className="list-item">
          <div className="dropdown">
            <span className="dropdown-label">
              MiCasa Land Carbon Flux <FaChevronDown className="icon" />
            </span>
            <div className="dropdown-content">
              <a onClick={() => handleNavigation("/carbon-micasa-comparison")}>
                <FaMapMarkedAlt className="icon" /> Map
              </a>
              <a onClick={() => handleNavigation("/micasa-map-with-data")}>
                <FaChartBar className="icon" /> Statistics
              </a>
              <a onClick={() => handleNavigation("/micasa/daily")}>
                <FaPlay className="icon" /> Simulation
              </a>
            </div>
          </div>
        </li>

        <li className="list-item">
          <div className="dropdown">
            <span className="dropdown-label">
              CH4 <FaChevronDown className="icon" />
            </span>
            <div className="dropdown-content">
              <a onClick={() => handleNavigation("/ch4-flux-comparison")}>
                <FaMapMarkedAlt className="icon" /> Map
              </a>
              <a onClick={() => handleNavigation("/ch4-map-with-data")}>
                <FaChartBar className="icon" /> Statistics
              </a>
              <a onClick={() => handleNavigation("/ch4-simul")}>
                <FaPlay className="icon" /> Simulation
              </a>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default NasaData;
