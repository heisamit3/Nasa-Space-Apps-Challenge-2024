import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowRight, FiBarChart } from "react-icons/fi";
// Importing icons from react-icons
import { FaGlobe } from "react-icons/fa";
import "../../css/Home.css"; // Adjust the path accordingly
import ch4 from "../../images/emit_above_planet_v4-1.27e631c8.png";
import co2 from "../../images/urban-1.eed0ef37.jpeg"; // Correcting the variable name for consistency
import SpinningEarth from "./SpinningEarth";

const HomePage: React.FC<{
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}> = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  const handleStatBoxClick = () => {
    if (!isLoggedIn) {
      alert("Please log in or sign up to access the dashboard.");
      navigate("/login");
    } else {
      navigate("/dashboard");
    }
  };

  const handleClimateDataClick = () => {
    if (!isLoggedIn) {
      alert("Please log in or sign up to explore the climate data.");
      navigate("/login");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="content-area">
      <div className="header">
        <h1 className="title">SunClimate Chronicles - Climate Change </h1>
        <button className="navigate-button" onClick={handleClimateDataClick}>
          Explore Climate Data <FiArrowRight />{" "}
          {/* Adding the icon to the button */}
        </button>
      </div>
      <div className="earth-container">
        <SpinningEarth />
      </div>

      <div className="data-section">
        <h2 className="section-title">Climate Insights</h2>
        <p className="section-text">
          The Earth is warming at an unprecedented rate. Here are some key
          metrics:
        </p>
        <div className="climate-stats">
          <div
            className="stat-box"
            onClick={handleStatBoxClick}
            style={{ cursor: "pointer" }}
          >
            <img src={ch4} alt="CH4 levels" />
            <h3>
              Methane (CH₄) Levels <FaGlobe /> {/* Adding icon to the title */}
            </h3>
            <p>
              Discovering large methane emission events with remote measurement
              techniques is critical in identifying the sources of emissions and
              mitigating their impact on climate change.
            </p>
          </div>
          <div
            className="stat-box"
            onClick={handleStatBoxClick}
            style={{ cursor: "pointer" }}
          >
            <img src={co2} alt="CO2 levels" />
            <h3>
              CO₂ Levels <FiBarChart /> {/* Adding icon to the title */}
            </h3>
            <p>
              Carbon dioxide emissions data are now available at a granular
              level, from city blocks to entire counties across the contiguous
              U.S. The latest dataset from the Vulcan Project, called Vulcan
              4.0, helps researchers to analyze annual CO₂ emissions at fine
              scales and helps decision-makers to develop localized carbon
              management strategies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
