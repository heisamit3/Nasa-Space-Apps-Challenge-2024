import React, { useEffect, useState } from "react";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../../css/CH4FluxComparison.css"; // Import the CSS file for custom styling
import {
  FaSpinner,
  FaMapMarkedAlt,
  FaExclamationTriangle,
} from "react-icons/fa"; // Import necessary icons

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

  // Fetch CH₄ flux data from API
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/carbon_data_CH4/")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch CH₄ data: " + error.message);
        setLoading(false);
      });
  }, []);

  // Initialize map for 2016 data
  useEffect(() => {
    if (data && !map2016) {
      const map2016 = L.map("map2016").setView([34, -118], 6); // California as default center
      setMap2016(map2016);

      // Add base layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
        minZoom: 0,
        maxZoom: 24,
      }).addTo(map2016);

      // Add CH₄ flux layer for 2016
      L.tileLayer(data.ch4_flux_1.tiles[0], {
        attribution: "CH₄ Flux (2016)",
        opacity: 0.8,
        minZoom: data.ch4_flux_1.minzoom || 0,
        maxZoom: data.ch4_flux_1.maxzoom || 24,
      }).addTo(map2016);
    }
  }, [data, map2016]);

  // Initialize map for 1999 data
  useEffect(() => {
    if (data && !map1999) {
      const map1999 = L.map("map1999").setView([34, -118], 6); // California as default center
      setMap1999(map1999);

      // Add base layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
        minZoom: 0,
        maxZoom: 24,
      }).addTo(map1999);

      // Add CH₄ flux layer for 1999
      L.tileLayer(data.ch4_flux_2.tiles[0], {
        attribution: "CH₄ Flux (1999)",
        opacity: 0.8,
        minZoom: data.ch4_flux_2.minzoom || 0,
        maxZoom: data.ch4_flux_2.maxzoom || 24,
      }).addTo(map1999);
    }
  }, [data, map1999]);

  // Sync both maps (pan and zoom together)
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

  if (loading) {
    return (
      <div className="loading-container">
        <FaSpinner className="loading-spinner" />
        <p>Loading CH₄ Flux Data...</p>
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
    <div className="ch4-container">
      <h1 className="ch4-title">
        <FaMapMarkedAlt /> CH₄ Flux Comparison (1999 vs 2016)
      </h1>
      <div className="ch4-maps-container">
        {/* 2016 Map */}
        <div className="ch4-map-column">
          <h2 className="ch4-map-label">2016</h2>
          <div id="map2016" className="ch4-map"></div>
        </div>

        {/* 1999 Map */}
        <div className="ch4-map-column">
          <h2 className="ch4-map-label">1999</h2>
          <div id="map1999" className="ch4-map"></div>
        </div>
      </div>
    </div>
  );
};

export default CH4FluxComparison;
