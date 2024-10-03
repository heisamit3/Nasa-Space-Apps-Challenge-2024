import React, { useState } from "react";
import { MapContainer, TileLayer, useMapEvents, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const CH4MapComponent: React.FC = () => {
  const [area, setArea] = useState<any | null>(null); // State to store the area information

  // Custom hook to handle map events
  const MapEvents = () => {
    useMapEvents({
      dblclick: async (event) => {
        const { lat, lng } = event.latlng; // Get latitude and longitude from the event

        try {
          const response = await fetch("http://127.0.0.1:8000/carbon_data_stats_CH4/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              aoi: {
                type: "FeatureCollection",
                features: [
                  {
                    type: "Feature",
                    geometry: {
                      type: "Point",
                      coordinates: [lng, lat], // Send coordinates in [longitude, latitude] format
                    },
                  },
                ],
              },
            }),
          });

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const data = await response.json();
          // Set the area state with data from the server
          setArea({
            lat: data.lat,
            lng: data.lng,
            radius: data.radius,
          });
        } catch (error) {
          console.error("Error:", error);
        }
      },
    });
    return null; // This component does not render anything
  };

  return (
    <MapContainer 
      center={[20, 0]} // Center of the map (20°N, 0°E) for a global view
      zoom={2} // Set a lower zoom level to show the whole world
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapEvents /> {/* Include the event handler */}

      {/* Render a circle for the marked area */}
      {area && (
        <Circle 
          center={[area.lat, area.lng]} 
          radius={area.radius} 
          pathOptions={{ color: 'blue', fillColor: 'blue', fillOpacity: 0.5 }} 
        />
      )}
    </MapContainer>
  );
};

export default CH4MapComponent;
