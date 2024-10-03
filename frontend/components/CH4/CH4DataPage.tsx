// import React from "react";
// import { useLocation, Link } from "react-router-dom";
// import CH4EmissionsGraph from "./CH4EmissionsGraph";
// import "../../css/CH4DataPage.css"; // Import data page styles

// interface StatisticsB1 {
//   mean: number;
//   max: number;
//   min: number;
//   median: number;
// }

// interface DataPoint {
//   statistics: {
//     b1: StatisticsB1;
//   };
//   datetime: string;
//   date: string;
// }

// const CH4DataPage: React.FC = () => {
//   const location = useLocation();
//   const { emissionsData, coordinates } = location.state as {
//     emissionsData: DataPoint[];
//     coordinates: number[][];
//   };

//   return (
//     <div className="data-container">
//       <Link to="/ch4-map" className="back-link">
//         ← Back to Map
//       </Link>
//       <h1 className="data-header">CH₄ Emissions Data</h1>
//       <div className="coordinates-box">
//         <h2 className="coordinates-header">Selected Area Coordinates:</h2>
//         <p>
//           Center: {coordinates[0][1].toFixed(4)}°N,{" "}
//           {coordinates[0][0].toFixed(4)}°E
//         </p>
//       </div>
//       <CH4EmissionsGraph data={emissionsData} />
//     </div>
//   );
// };

// export default CH4DataPage;
