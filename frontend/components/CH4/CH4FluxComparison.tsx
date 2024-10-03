import React, { useEffect, useState } from "react";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS

interface CH4FluxData {
  ch4_flux_1: { tiles: string[]; minzoom?: number; maxzoom?: number };
  ch4_flux_2: { tiles: string[]; minzoom?: number; maxzoom?: number };
}

const CH4FluxComparison: React.FC = () => {
  const [data, setData] = useState<CH4FluxData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [map2016, setMap2016] = useState<L.Map | null>(null);
  const [map1999, setMap1999] = useState<L.Map | null>(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/carbon_data_CH4/")
      .then((response) => {
        console.log("API Response:", response.data); // Log API response
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch CH₄ data: " + error.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (data && !map2016) {
      console.log("Initializing the 2016 map...");
      const map2016 = L.map("map2016").setView([34, -118], 6); // Centering on California
      setMap2016(map2016);

      // Add OpenStreetMap base layer
      const baseLayer2016 = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        minZoom: 0,
        maxZoom: 24,
      });
      baseLayer2016.addTo(map2016);

      const layer2016 = L.tileLayer(data.ch4_flux_1.tiles[0], {
        attribution: "CH₄ Flux (2016)",
        opacity: 0.8,
        minZoom: data.ch4_flux_1.minzoom || 0, // Use default value if not provided
        maxZoom: data.ch4_flux_1.maxzoom || 24, // Use default value if not provided
      });

      layer2016.addTo(map2016);
    }
  }, [data, map2016]);

  // Initialize the 1999 map once the data is available
  useEffect(() => {
    if (data && !map1999) {
      console.log("Initializing the 1999 map...");
      const map1999 = L.map("map1999").setView([34, -118], 6); // Centering on California
      setMap1999(map1999);

      // Add OpenStreetMap base layer
      const baseLayer1999 = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        minZoom: 0,
        maxZoom: 24,
      });
      baseLayer1999.addTo(map1999);

      const layer1999 = L.tileLayer(data.ch4_flux_2.tiles[0], {
        attribution: "CH₄ Flux (1999)",
        opacity: 0.8,
        minZoom: data.ch4_flux_2.minzoom || 0, // Use default value if not provided
        maxZoom: data.ch4_flux_2.maxzoom || 24, // Use default value if not provided
      });

      layer1999.addTo(map1999);
    }
  }, [data, map1999]);

  // Synchronize both maps (pan and zoom)
  useEffect(() => {
    if (map2016 && map1999) {
      map2016.on("move", () => {
        map1999.setView(map2016.getCenter(), map2016.getZoom(), {
          animate: false,
        });
      });
      map1999.on("move", () => {
        map2016.setView(map1999.getCenter(), map1999.getZoom(), {
          animate: false,
        });
      });
    }
  }, [map2016, map1999]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!data) return <p>No data available</p>;

  return (
    <div>
      <h1>CH₄ Flux Comparison (1999 vs 2016)</h1>
      <div style={{ display: "flex" }}>
        {/* Create two side-by-side maps */}
        <div id="map2016" style={{ height: "600px", width: "50%" }}></div>
        <div id="map1999" style={{ height: "600px", width: "50%" }}></div>
      </div>
    </div>
  );
};

export default CH4FluxComparison;
