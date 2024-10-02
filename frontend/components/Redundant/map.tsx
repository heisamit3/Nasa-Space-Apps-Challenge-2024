// components/Map.tsx
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

const MapComponent: React.FC = () => {
  const [tileUrl, setTileUrl] = useState<string | null>(null);
  const [aoi, setAoi] = useState<any>(null);

  useEffect(() => {
    const fetchMapData = async () => {
      const { data: tile } = await axios.get("/api/tile"); // Replace with correct API
      const { data: aoiGeoJson } = await axios.get("/api/aoi"); // Replace with actual GeoJSON API

      setTileUrl(tile.tiles[0]);
      setAoi(aoiGeoJson);
    };

    fetchMapData();
  }, []);

  return (
    <div>
      <h2>Map of RH Level and Zonal Statistics</h2>
      <MapContainer
        center={[32.81, -96.93]} // Coordinates for Dallas, Texas area
        zoom={9}
        style={{ height: "400px", width: "100%" }}
      >
        {tileUrl && <TileLayer url={tileUrl} />}
        {aoi && <GeoJSON data={aoi} />}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
