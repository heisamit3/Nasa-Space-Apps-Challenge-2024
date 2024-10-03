import React from "react";
import { useLocation, Link } from "react-router-dom";
import CO2EmissionsGraph from "./CO2EmissionsGraph";


interface StatisticsB1 {
  mean: number;
  max: number;
  min: number;
  median: number;
}

interface DataPoint {
  statistics: {
    b1: StatisticsB1;
  };
  datetime: string;
  date: string;
}

const CH4DataPage: React.FC = () => {
  const location = useLocation();
  const { emissionsData, coordinates } = location.state as {
    emissionsData: DataPoint[];
    coordinates: number[][];
  };

  return (
    <div className="container mx-auto p-4">
      <Link
        to="/ch4-map"
        className="text-blue-500 hover:underline mb-4 inline-block"
      >
        ← Back to Map
      </Link>
      <h1 className="text-2xl font-bold mb-4">CH4 Emissions Data</h1>
      <div className="bg-gray-100 p-4 rounded mb-4">
        <h2 className="font-semibold mb-2">Selected Area Coordinates:</h2>
        <p>
          Center: {coordinates[0][1].toFixed(4)}°N, {coordinates[0][0].toFixed(4)}°E
        </p>
      </div>
      <CO2EmissionsGraph data={emissionsData} />
    </div>
  );
};

export default CH4DataPage;