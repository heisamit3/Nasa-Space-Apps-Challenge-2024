import React, { useEffect, useState } from "react";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../../css/AirSeaCO2.css"; // Custom styling for the page
import {
  FaSpinner,
  FaMapMarkedAlt,
  FaExclamationTriangle,
} from "react-icons/fa";

interface CO2FluxData {
  observation_1: {
    tile: { tiles: string[]; minzoom?: number; maxzoom?: number };
    rescale: { min: number; max: number };
  };
  observation_2: {
    tile: { tiles: string[]; minzoom?: number; maxzoom?: number };
    rescale: { min: number; max: number };
  };
}

const AirSeaCO2FluxComparison: React.FC = () => {
  const [data, setData] = useState<CO2FluxData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [map2022, setMap2022] = useState<L.Map | null>(null);
  const [map2021, setMap2021] = useState<L.Map | null>(null);

  // Fetch CO2 flux data from API
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/airsea_data_CO2/")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch air-sea data: " + error.message);
        setLoading(false);
      });
  }, []);

  // Initialize map for 2022 data
  useEffect(() => {
    if (data && !map2022) {
      const map2022 = L.map("map2022").setView([34, -118], 6); // Default center: California
      setMap2022(map2022);

      // Add base layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
        minZoom: 0,
        maxZoom: 24,
      }).addTo(map2022);

      // Add CO₂ flux layer for 2022
      if (data.observation_1 && data.observation_1.tile.tiles[0]) {
        L.tileLayer(data.observation_1.tile.tiles[0], {
          attribution: "CO₂ Flux (2022)",
          opacity: 0.8,
          minZoom: data.observation_1.tile.minzoom || 0,
          maxZoom: data.observation_1.tile.maxzoom || 24,
        }).addTo(map2022);
      }

      // Add custom color legend to map2022
      const legend = createColorLegend();
      legend.addTo(map2022);
    }
  }, [data, map2022]);

  // Initialize map for 2021 data
  useEffect(() => {
    if (data && !map2021) {
      const map2021 = L.map("map2021").setView([34, -118], 6); // Default center: California
      setMap2021(map2021);

      // Add base layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
        minZoom: 0,
        maxZoom: 24,
      }).addTo(map2021);

      // Add CO₂ flux layer for 2021
      if (data.observation_2 && data.observation_2.tile.tiles[0]) {
        L.tileLayer(data.observation_2.tile.tiles[0], {
          attribution: "CO₂ Flux (2021)",
          opacity: 0.8,
          minZoom: data.observation_2.tile.minzoom || 0,
          maxZoom: data.observation_2.tile.maxzoom || 24,
        }).addTo(map2021);
      }

      // Add custom color legend to map2021
      const legend = createColorLegend();
      legend.addTo(map2021);
    }
  }, [data, map2021]);

  // Sync both maps (pan and zoom together)
  useEffect(() => {
    if (map2022 && map2021) {
      map2022.on("move", () => {
        map2021.setView(map2022.getCenter(), map2022.getZoom(), {
          animate: false,
        });
      });
      map2021.on("move", () => {
        map2022.setView(map2021.getCenter(), map2021.getZoom(), {
          animate: false,
        });
      });
    }
  }, [map2022, map2021]);

  // Function to create the color legend
  const createColorLegend = () => {
    const legend = new L.Control({ position: "bottomright" });
    legend.onAdd = function () {
      const div = L.DomUtil.create("div", "info legend");

      div.innerHTML = `
        <div style="display: inline-block; background: linear-gradient(to right, blue, lightblue, white, lightpink, pink); width: 300px; height: 20px; border-radius: 5px;"></div>
        <div style="display: flex; justify-content: space-between; width: 300px; margin-top: 5px;">
          <span>-0.0007</span>
          <span>-0.00035</span>
          <span>0</span>
          <span>0.00035</span>
          <span>0.0007</span>
        </div>
        <div style="text-align: center; margin-top: 5px;">
          <span>Millimoles per meter squared per second (mmol m²/s)</span>
        </div>
      `;

      return div;
    };
    return legend;
  };

  if (loading) {
    return (
      <div className="loading-container">
        <FaSpinner className="loading-spinner" />
        <p>Loading air-sea CO₂ Flux Data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <FaExclamationTriangle className="error-icon" />
        <p>{error}</p>
      </div>
    );
  }

  if (!data) return <p>No data available</p>;

  return (
    <div className="airsea-container">
      <h1 className="airsea-title">
        <FaMapMarkedAlt /> Air Sea CO₂ Flux Comparison (2021 vs 2022)
      </h1>
      <div className="airsea-maps-container">
        {/* 2022 Map */}
        <div className="airsea-map-column">
          <h2 className="airsea-map-label">2022</h2>
          <div id="map2022" className="airsea-map"></div>
        </div>

        {/* 2021 Map */}
        <div className="airsea-map-column">
          <h2 className="airsea-map-label">2021</h2>
          <div id="map2021" className="airsea-map"></div>
        </div>
      </div>
    </div>
  );
};

export default AirSeaCO2FluxComparison;
