// import React from "react";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   LineElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import "../../css/CH4EmissionsGraph.css"; // Import graph styles

// ChartJS.register(LineElement, CategoryScale, LinearScale, Tooltip, Legend);

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

// interface CH4EmissionsGraphProps {
//   data: DataPoint[];
// }

// const CH4EmissionsGraph: React.FC<CH4EmissionsGraphProps> = ({ data }) => {
//   const processedData = data.map((item) => ({
//     date: new Date(item.date).toLocaleDateString(),
//     mean: item.statistics.b1.mean,
//     max: item.statistics.b1.max,
//     min: item.statistics.b1.min,
//     median: item.statistics.b1.median,
//   }));

//   const chartData = {
//     labels: processedData.map((item) => item.date),
//     datasets: [
//       {
//         label: "Mean",
//         data: processedData.map((item) => item.mean),
//         borderColor: "#ff8000",
//         fill: false,
//       },
//       {
//         label: "Max",
//         data: processedData.map((item) => item.max),
//         borderColor: "#82ca9d",
//         fill: false,
//       },
//       {
//         label: "Min",
//         data: processedData.map((item) => item.min),
//         borderColor: "#ff7300",
//         fill: false,
//       },
//       {
//         label: "Median",
//         data: processedData.map((item) => item.median),
//         borderColor: "#0088FE",
//         fill: false,
//       },
//     ],
//   };

//   return (
//     <div className="chart-container">
//       <h2 className="chart-header">CH₄ Emissions Data</h2>
//       <Line data={chartData} className="chart" />
//     </div>
//   );
// };

// export default CH4EmissionsGraph;
