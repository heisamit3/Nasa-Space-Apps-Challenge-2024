// src/CarbonFluxMap.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";

interface RescaleValues {
  max: number;
  min: number;
}

interface TileData {
  tiles: string[];
}

interface CarbonFluxData {
  start_date_tile: TileData;
  end_date_tile: TileData;
  rescale_values: RescaleValues;
}

const CarbonFluxMap = () => {
  const [data, setData] = useState<CarbonFluxData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/carbon-flux/")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError("Failed to fetch data");
      });
  }, []);

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Land-Atmosphere Carbon Flux Visualization</h1>
      {data ? (
        <div>
          <div>
            <h2>Data from {data.start_date_tile.tiles[0]}</h2>
            <img
              src={data.start_date_tile.tiles[0]}
              alt="Carbon Flux on Start Date"
            />
          </div>
          <div>
            <h2>Data from {data.end_date_tile.tiles[0]}</h2>
            <img
              src={data.end_date_tile.tiles[0]}
              alt="Carbon Flux on End Date"
            />
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CarbonFluxMap;
