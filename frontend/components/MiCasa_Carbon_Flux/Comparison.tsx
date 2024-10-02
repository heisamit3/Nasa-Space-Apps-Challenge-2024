import React, { useEffect, useState } from "react";
import { fetchTile } from "../../Services/api"; // Ensure this path is correct
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
// import "./Comparison.css";

const Comparison: React.FC = () => {
  const [tile1, setTile1] = useState<string | null>(null);
  const [tile2, setTile2] = useState<string | null>(null);

  // Define center explicitly to avoid type issues
  const center: [number, number] = [31.9, -99.9];

  useEffect(() => {
    const loadTiles = async () => {
      const collectionName = "micasa-carbonflux-daygrid-v1";
      const assetName = "rh";
      const colorMap = "purd";
      const rescaleMin = 0;
      const rescaleMax = 1;

      const tileData1 = await fetchTile(
        collectionName,
        "2023-01-01",
        assetName,
        colorMap,
        rescaleMin,
        rescaleMax
      );
      const tileData2 = await fetchTile(
        collectionName,
        "2023-01-31",
        assetName,
        colorMap,
        rescaleMin,
        rescaleMax
      );

      setTile1(tileData1?.tiles[0] || null);
      setTile2(tileData2?.tiles[0] || null);
    };

    loadTiles();
  }, []);

  return (
    <div className="comparison-container">
      <div className="map-container">
        <MapContainer
          center={center}
          zoom={6}
          style={{ height: "300px", width: "100%" }}
        >
          {tile1 && <TileLayer url={tile1} />}
        </MapContainer>
        <p>2023-01-01</p>
      </div>
      <div className="map-container">
        <MapContainer
          center={center}
          zoom={6}
          style={{ height: "300px", width: "100%" }}
        >
          {tile2 && <TileLayer url={tile2} />}
        </MapContainer>
        <p>2023-01-31</p>
      </div>
    </div>
  );
};

export default Comparison;
