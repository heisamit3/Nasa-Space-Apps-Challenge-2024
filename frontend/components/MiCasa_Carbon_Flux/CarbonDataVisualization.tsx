// frontend/src/components/CarbonDataVisualization.tsx
import React, { useEffect, useState } from "react";
import ChartComponent from "./ChartComponent";
import MapBoxMap from "./MapBoxMap";

interface Stat {
  datetime: string;
  max: number;
}

interface CarbonDataPoint {
  coordinates: [number, number]; // Longitude, Latitude
  value: number; // Carbon data measurement
}

interface ApiResponse {
  item_count: number;
  stats: Stat[];
  date1_tile: { tiles: string[] };
  date2_tile: { tiles: string[] };
  bounds: [[number, number], [number, number]];
  carbonDataPoints: CarbonDataPoint[]; // Updated interface
}

const CarbonDataVisualization: React.FC = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:8000/carbon_data/") // Ensure trailing slash
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch data: " + error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!data) return <p>No data available</p>;

  return (
    <div>
      <h1>Carbon Data Visualization</h1>
      <MapBoxMap
        date1TileUrl={data.date1_tile.tiles[0]}
        bounds={data.bounds}
        carbonDataPoints={data.carbonDataPoints}
      />
      <ChartComponent data={data.stats} />
    </div>
  );
};

export default CarbonDataVisualization;
