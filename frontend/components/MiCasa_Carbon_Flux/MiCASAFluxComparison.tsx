import React, { useEffect, useState } from "react";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS
import { FaSpinner, FaMapMarkedAlt, FaExclamationCircle } from "react-icons/fa"; // Import React Icons
import "../../css/MiCASAFluxComparison.css";

interface MiCASAFluxData {
  micasa_flux_1: { tiles: string[]; minzoom?: number; maxzoom?: number };
  micasa_flux_2: { tiles: string[]; minzoom?: number; maxzoom?: number };
}

const MiCASAFluxComparison: React.FC = () => {
  const [data, setData] = useState<MiCASAFluxData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [map2020, setMap2020] = useState<L.Map | null>(null);
  const [map2005, setMap2005] = useState<L.Map | null>(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/carbon_data_view_micasa/")
      .then((response) => {
        console.log("API Response:", response.data); // Log API response
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch MiCASA data: " + error.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (data && !map2020) {
      const map2020 = L.map("map2020").setView([34, -118], 6); // Centering on California
      setMap2020(map2020);

      const baseLayer2020 = L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          minZoom: 0,
          maxZoom: 24,
        }
      );
      baseLayer2020.addTo(map2020);

      const layer2020 = L.tileLayer(data.micasa_flux_1.tiles[0], {
        attribution: "MiCASA Flux (2020)",
        opacity: 0.8,
        minZoom: data.micasa_flux_1.minzoom || 0,
        maxZoom: data.micasa_flux_1.maxzoom || 24,
      });
      layer2020.addTo(map2020);
    }
  }, [data, map2020]);

  useEffect(() => {
    if (data && !map2005) {
      const map2005 = L.map("map2005").setView([34, -118], 6); // Centering on California
      setMap2005(map2005);

      const baseLayer2005 = L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          minZoom: 0,
          maxZoom: 24,
        }
      );
      baseLayer2005.addTo(map2005);

      const layer2005 = L.tileLayer(data.micasa_flux_2.tiles[0], {
        attribution: "MiCASA Flux (2005)",
        opacity: 0.8,
        minZoom: data.micasa_flux_2.minzoom || 0,
        maxZoom: data.micasa_flux_2.maxzoom || 24,
      });
      layer2005.addTo(map2005);
    }
  }, [data, map2005]);

  useEffect(() => {
    if (map2020 && map2005) {
      map2020.on("move", () => {
        map2005.setView(map2020.getCenter(), map2020.getZoom(), {
          animate: false,
        });
      });
      map2005.on("move", () => {
        map2020.setView(map2005.getCenter(), map2005.getZoom(), {
          animate: false,
        });
      });
    }
  }, [map2020, map2005]);

  if (loading) {
    return (
      <div className="loading-container">
        <FaSpinner className="loading-spinner" />
        <p>Loading data, please wait...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <FaExclamationCircle className="error-icon" />
        <p>{error}</p>
      </div>
    );
  }

  if (!data) {
    return <p>No data available</p>;
  }

  return (
    <div className="micasa-container">
      <h1 className="micasa-title">
        <FaMapMarkedAlt /> MiCASA Flux Comparison (2005 vs 2020)
      </h1>
      <div className="micasa-maps-container">
        <div className="micasa-map-column">
          <div className="micasa-map-label">2020</div>
          <div id="map2020" className="micasa-map"></div>
        </div>
        <div className="micasa-map-column">
          <div className="micasa-map-label">2005</div>
          <div id="map2005" className="micasa-map"></div>
        </div>
      </div>
    </div>
  );
};

export default MiCASAFluxComparison;
