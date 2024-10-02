// components/MapDisplay.tsx
import React, { useEffect, useState } from "react";
import { fetchTile } from "../../Services/api";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapDisplay: React.FC = () => {
  const [tile, setTile] = useState<string | null>(null);

  useEffect(() => {
    const loadMapData = async () => {
      const collectionName = "micasa-carbonflux-daygrid-v1";
      const assetName = "rh";
      const colorMap = "purd";
      const rescaleMin = 0;
      const rescaleMax = 1;

      const tileData = await fetchTile(
        collectionName,
        "2023-01-01",
        assetName,
        colorMap,
        rescaleMin,
        rescaleMax
      );

      // If tileData or tiles[0] is undefined, set it to null
      setTile(tileData?.tiles[0] || null);
    };

    loadMapData();
  }, []);

  return (
    <div>
      {tile ? (
        <MapContainer
          center={[31.9, -99.9]}
          zoom={6}
          style={{ height: "500px", width: "100%" }}
        >
          <TileLayer url={tile} attribution="GHG" />
        </MapContainer>
      ) : (
        <p>Loading Map...</p>
      )}
    </div>
  );
};

export default MapDisplay;
