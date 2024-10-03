import React, { useState } from "react";
import { MapContainer, TileLayer, useMapEvents, Circle } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import CH4EmissionsGraph from "./CH4EmissionsGraph";

interface Area {
  lat: number;
  lng: number;
  radius: number;
}

const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center h-20">
    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
  </div>
);

interface EmissionDataPoint {
  timestamp: string;
  value: number;
}

const CH4MapComponent: React.FC = () => {
  const navigate = useNavigate();

  const [area, setArea] = useState<Area | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [emissionsData, setEmissionsData] = useState<
    EmissionDataPoint[] | null
  >(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const MapEvents = () => {
    useMapEvents({
      click: async (event) => {
        const { lat, lng } = event.latlng;

        const coordinates = [
          [lng, lat],
          [lng, lat + 4],
          [lng - 4, lat + 4],
          [lng - 4, lat],
          [lng, lat],
        ];

        setArea({
          lat: lat,
          lng: lng,
          radius: 50000,
        });

        setIsLoading(true);
        setError(null);

        try {
          const response = await fetch(
            "http://127.0.0.1:8000/compute_stats_view/",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                coordinates: coordinates,
              }),
            }
          );

          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Network response was not ok: ${errorText}`);
          }

          const data = await response.json();
          console.log(data);
          setEmissionsData(data.data);

          // Navigate to a new route with state
          navigate("/ch4-data-show", {
            state: { emissionsData: data.data, coordinates },
          });
        } catch (error) {
          if (error instanceof Error) {
            setError(error.message);
          } else {
            setError("An unknown error occurred.");
          }
          setEmissionsData(null);
        } finally {
          setIsLoading(false);
        }
      },
    });
    return null;
  };

  return (
    <div className="flex flex-col h-screen">
      <h1 className="text-2xl font-bold p-4">
        Click on the map to view CH4 emissions data
      </h1>
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: "60vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapEvents />
        {area && (
          <Circle
            center={[area.lat, area.lng]}
            radius={area.radius}
            pathOptions={{ color: "blue", fillColor: "blue", fillOpacity: 0.5 }}
          />
        )}
      </MapContainer>

      {isLoading && <LoadingSpinner />}
      {error && <div className="text-red-500 p-4">{error}</div>}
    </div>
  );
};

export default CH4MapComponent;
