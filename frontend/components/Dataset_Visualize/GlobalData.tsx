// import React from 'react';

// const GlobalData: React.FC = () => {
//     return (
//         <div>
//             <h1>Global Data</h1>
//             <p>This is a dummy page for the Global Data component.</p>
//         </div>
//     );
// };

// export default GlobalData;
import React from "react";
import { FaMap, FaChartBar, FaInfoCircle } from "react-icons/fa"; // Importing icons
import { useNavigate } from "react-router-dom"; // For navigation
import "../../css/GlobalData.css"; // Assuming you have a CSS file for GlobalData styling

const GlobalData: React.FC = () => {
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  // Function to handle button clicks
  const handleButtonClick = (path: string) => {
    navigate(path); // Redirect to the specified path
  };

  return (
    <div className="global-data">
      <h1>Global Data</h1>

      <div className="button-container">
        <div className="button" onClick={() => handleButtonClick("/map")}>
          <FaMap className="icon" />
          <h3>Map</h3>
        </div>
        <div className="button" onClick={() => handleButtonClick("/graph")}>
          <FaChartBar className="icon" />
          <h3>Graph</h3>
        </div>
        <div className="button" onClick={() => handleButtonClick("/statistics")}>
          <FaInfoCircle className="icon" />
          <h3>Statistics</h3>
        </div>
      </div>
    </div>
  );
};

export default GlobalData;
