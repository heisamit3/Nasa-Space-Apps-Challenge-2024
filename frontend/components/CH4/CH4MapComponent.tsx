// import React, { useState } from "react";
// import { MapContainer, TileLayer, useMapEvents, Circle } from "react-leaflet";
// import { useNavigate } from "react-router-dom";
// import "leaflet/dist/leaflet.css";
// import "../../css/CH4MapComponent.css"; // Import map styles

// interface Area {
//   lat: number;
//   lng: number;
//   radius: number;
// }

// const LoadingSpinner: React.FC = () => (
//   <div className="flex justify-center items-center h-20">
//     <div className="loader"></div> {/* Loading spinner */}
//   </div>
// );

// interface EmissionDataPoint {
//   timestamp: string;
//   value: number;
// }

// const CH4MapComponent: React.FC = () => {
//   const navigate = useNavigate();
//   const [area, setArea] = useState<Area | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(false);

//   const MapEvents = () => {
//     useMapEvents({
//       click: async (event) => {
//         const { lat, lng } = event.latlng;

//         const coordinates = [
//           [lng, lat],
//           [lng, lat + 4],
//           [lng - 4, lat + 4],
//           [lng - 4, lat],
//           [lng, lat],
//         ];

//         setArea({
//           lat: lat,
//           lng: lng,
//           radius: 50000,
//         });

//         setIsLoading(true); // Start loading animation

//         // Simulate a network request with a delay for loading
//         setTimeout(async () => {
//           try {
//             const response = await fetch(
//               "http://127.0.0.1:8000/compute_stats_view/",
//               {
//                 method: "POST",
//                 headers: {
//                   "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                   coordinates: coordinates,
//                 }),
//               }
//             );

//             if (!response.ok) {
//               throw new Error(`Network response was not ok`);
//             }

//             const data = await response.json();

//             // Navigate to the data page with state after loading
//             navigate("/ch4-data-show", {
//               state: { emissionsData: data.data, coordinates },
//             });
//           } catch (error) {
//             console.error("Error fetching data:", error);
//           } finally {
//             setIsLoading(false); // Stop loading animation
//           }
//         }, 2000); // 2 second delay to simulate loading
//       },
//     });
//     return null;
//   };

//   return (
//     <div className="map-container">
//       <h1 className="text-2xl font-bold p-4 text-orange-500">
//         Click on the map to view CH₄ emissions data
//       </h1>
//       <MapContainer center={[20, 0]} zoom={2} className="map-box">
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />
//         <MapEvents />
//         {area && (
//           <Circle
//             center={[area.lat, area.lng]}
//             radius={area.radius}
//             pathOptions={{
//               color: "#ff8000",
//               fillColor: "#1a1a1a",
//               fillOpacity: 0.6,
//             }}
//           />
//         )}
//       </MapContainer>
//       {isLoading && <LoadingSpinner />} {/* Show spinner while loading */}
//     </div>
//   );
// };

// export default CH4MapComponent;
