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
import React from "react";// Importing icons
import { useNavigate } from "react-router-dom"; // For navigation
import "../../css/GlobalData.css"; // Assuming you have a CSS file for GlobalData styling

const GlobalData: React.FC = () => {
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  

  return (
    <div className="global-data">
      <h1>Global Data</h1>


    </div>
  );
};

export default GlobalData;
