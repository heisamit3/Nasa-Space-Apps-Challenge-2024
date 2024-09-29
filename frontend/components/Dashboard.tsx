import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import 'leaflet/dist/leaflet.css'; 
import '../css/Dashboard.css'; 

Chart.register(...registerables);

const Dashboard: React.FC = () => {
  // CO2 data from 2000 to 2023
  const co2Data = {
    labels: [
      '2000', '2001', '2002', '2003', '2004', '2005', '2006',
      '2007', '2008', '2009', '2010', '2011', '2012', '2013',
      '2014', '2015', '2016', '2017', '2018', '2019', '2020',
      '2021', '2022', '2023'
    ],
    datasets: [
      {
        label: 'CO2 Levels (ppm)',
        data: [
          368, 370, 375, 378, 381, 384, 387, 390,
          393, 396, 400, 404, 408, 412, 416, 420,
          424, 428, 432, 436, 440, 444, 448
        ],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.3,
      },
      {
        label: 'Heat Rise (°C)',
        data: [
          14.5, 14.6, 14.7, 14.8, 14.9, 15.0, 15.1, 15.2,
          15.3, 15.4, 15.5, 15.6, 15.7, 15.8, 15.9, 16.0,
          16.1, 16.2, 16.3, 16.4, 16.5, 16.6, 16.7
        ], // Sample data for heat rise from 2000 to 2023
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="dashboard">
      <h1>Climate Change Dashboard</h1>
      
      <div className="graph-container">
        <h2>CO2 Levels and Heat Rise (2000 - 2023)</h2>
        <Line data={co2Data} options={{ responsive: true }} />
      </div>
    </div>
  );
};

export default Dashboard;
