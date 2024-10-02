// import React, { useState } from "react";
// import { MapContainer, TileLayer, useMapEvents, Circle } from "react-leaflet";
// import "leaflet/dist/leaflet.css";

// const CH4MapComponent: React.FC = () => {
//   const [area, setArea] = useState<any | null>(null); // State to store the area information

//   // Custom hook to handle map events
//   const MapEvents = () => {
//     useMapEvents({
//       dblclick: async (event) => {
//         const { lat, lng } = event.latlng; // Get latitude and longitude from the event

//         try {
//           const response = await fetch("http://127.0.0.1:8000/carbon_data_stats_CH4/", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//               aoi: {
//                 type: "FeatureCollection",
//                 features: [
//                   {
//                     type: "Feature",
//                     geometry: {
//                       type: "Point",
//                       coordinates: [lng, lat], // Send coordinates in [longitude, latitude] format
//                     },
//                   },
//                 ],
//               },
//             }),
//           });

//           if (!response.ok) {
//             throw new Error("Network response was not ok");
//           }

//           const data = await response.json();
//           console.log("Response Data:", data); // Log the response data for debugging

//           // Set the area state with data from the server
//           setArea({
//             lat: data.lat,
//             lng: data.lng,
//             radius: data.radius,
//           });
//         } catch (error) {
//           console.error("Error:", error);
//         }
//       },
//     });
//     return null; // This component does not render anything
//   };

//   return (
//     <MapContainer 
//       center={[20, 0]} // Center of the map (20°N, 0°E) for a global view
//       zoom={2} // Set a lower zoom level to show the whole world
//       style={{ height: "100vh", width: "100%" }}
//     >
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       />
//       <MapEvents /> {/* Include the event handler */}

//       {/* Render a circle for the marked area */}
//       {area && (
//         <Circle 
//           center={[area.lat, area.lng]} 
//           radius={area.radius} 
//           pathOptions={{ color: 'blue', fillColor: 'blue', fillOpacity: 0.5 }} 
//         />
//       )}
//     </MapContainer>
//   );
// };

// export default CH4MapComponent;













import React, { useState } from "react";
import { MapContainer, TileLayer, useMapEvents, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const CH4MapComponent: React.FC = () => {
  const [area, setArea] = useState<any | null>(null); // State to store the area information
  const [error, setError] = useState<string | null>(null); // State to store error messages

  // Custom hook to handle map events
  const MapEvents = () => {
    useMapEvents({
      dblclick: async (event) => {
        const { lat, lng } = event.latlng; // Get latitude and longitude from the event

        // Define the coordinates in the required format
        const coordinates = [
          [lng, lat], // Bottom left
          [lng, lat + 4], // Top left
          [lng - 4, lat + 4], // Top right
          [lng - 4, lat], // Bottom right
          [lng, lat], // Closing the polygon
        ];

        try {
          const response = await fetch("http://127.0.0.1:8000/compute_stats_view/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              coordinates: coordinates, // Send coordinates
            }),
          });

          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Network response was not ok: ${errorText}`);
          }

          const data = await response.json();
          console.log("Response Data:", data); // Log the response data for debugging

          // Set the area state with data from the server
          setArea({
            lat: lat,
            lng: lng,
            radius: 50000, // Set your desired radius here
          });
          setError(null); // Reset error state on successful request
        } catch (error: unknown) {
          // Use type assertion to handle the error correctly
          if (error instanceof Error) {
            console.error("Error:", error.message);
            setError(error.message); // Set error state
          } else {
            console.error("Unknown error:", error);
            setError("An unknown error occurred."); // Handle unknown errors
          }
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

      {/* Display error message if any */}
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </MapContainer>
  );
};

export default CH4MapComponent;
