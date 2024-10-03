import React, { useState } from "react";
import { MapContainer, TileLayer, useMapEvents, Circle } from "react-leaflet";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import "leaflet/dist/leaflet.css";
import { FaSpinner } from "react-icons/fa"; // Import React Icons for loading
import "../../css/CH4UnifiedPage.css"; // Import unified page styles

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
);

const OPENCAGE_API_KEY = "8b1f52f170994f3cadba95ab435a97e3"; // Replace with your OpenCage API Key

interface StatisticsB1 {
  mean: number;
  max: number;
  min: number;
  median: number;
}

interface DataPoint {
  statistics: {
    b1: StatisticsB1;
  };
  datetime: string;
  date: string;
}

interface Area {
  lat: number;
  lng: number;
  radius: number;
}

const CH4MapWithDataPage: React.FC = () => {
  const [area, setArea] = useState<Area | null>(null);
  const [emissionsData, setEmissionsData] = useState<DataPoint[] | null>(null);
  const [previousEmissionsData, setPreviousEmissionsData] = useState<
    DataPoint[] | null
  >(null); // Store previous data
  const [currentRegion, setCurrentRegion] = useState<string | null>(null); // Store current region name
  const [previousRegion, setPreviousRegion] = useState<string | null>(null); // Store previous region name
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isComparing, setIsComparing] = useState<boolean>(false); // Track comparison state
  const [compareMode, setCompareMode] = useState<boolean>(false); // Compare button state

  // Fetch region name using OpenCage Geocoding API
  const fetchRegionName = async (
    lat: number,
    lng: number
  ): Promise<string | null> => {
    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${OPENCAGE_API_KEY}`
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        return data.results[0].formatted; // Return formatted address or region name
      }
      return "Unknown Region";
    } catch (error) {
      console.error("Error fetching region name:", error);
      return null;
    }
  };

  // Handle map click and fetch emissions data and region name
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

        setIsLoading(true); // Start loading animation

        // Fetch region name using reverse geocoding
        const regionName = await fetchRegionName(lat, lng);

        // Simulate data fetching delay for emissions data
        setTimeout(async () => {
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
              throw new Error(`Network response was not ok`);
            }

            const data = await response.json();

            if (compareMode) {
              // If we're comparing, store the previous emissions data
              setPreviousEmissionsData(emissionsData);
              setPreviousRegion(currentRegion);
            }

            // Set new emissions data and region name
            setEmissionsData(data.data);
            setCurrentRegion(regionName || "Unknown Region");

            setCompareMode(true); // Enable comparison mode after first click
          } catch (error) {
            console.error("Error fetching data:", error);
            setEmissionsData(null);
          } finally {
            setIsLoading(false);
          }
        }, 2000); // Simulated 2-second delay
      },
    });
    return null;
  };

  // Emission Graph Component
  const CH4EmissionsGraph = ({
    data,
    region,
  }: {
    data: DataPoint[];
    region: string;
  }) => {
    if (!data) return null;

    const processedData = data.map((item) => ({
      date: new Date(item.date).toLocaleDateString(),
      mean: item.statistics.b1.mean,
      max: item.statistics.b1.max,
      min: item.statistics.b1.min,
      median: item.statistics.b1.median,
    }));

    const chartData = {
      labels: processedData.map((item) => item.date),
      datasets: [
        {
          label: "Mean",
          data: processedData.map((item) => item.mean),
          borderColor: "#3b82f6", // Blue for Mean
          backgroundColor: "rgba(59, 130, 246, 0.2)",
          borderWidth: 2,
          pointBackgroundColor: "#ffffff",
          pointBorderColor: "#3b82f6",
          tension: 0.4, // Smooth curve
          fill: true,
        },
        {
          label: "Max",
          data: processedData.map((item) => item.max),
          borderColor: "#22c55e", // Green for Max
          backgroundColor: "rgba(34, 197, 94, 0.2)",
          borderWidth: 2,
          pointBackgroundColor: "#ffffff",
          pointBorderColor: "#22c55e",
          tension: 0.4,
          fill: true,
        },
        {
          label: "Min",
          data: processedData.map((item) => item.min),
          borderColor: "#ef4444", // Red for Min
          backgroundColor: "rgba(239, 68, 68, 0.2)",
          borderWidth: 2,
          pointBackgroundColor: "#ffffff",
          pointBorderColor: "#ef4444",
          tension: 0.4,
          fill: true,
        },
        {
          label: "Median",
          data: processedData.map((item) => item.median),
          borderColor: "#fbbf24", // Yellow for Median
          backgroundColor: "rgba(251, 191, 36, 0.2)",
          borderWidth: 2,
          pointBackgroundColor: "#ffffff",
          pointBorderColor: "#fbbf24",
          tension: 0.4,
          fill: true,
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            font: {
              size: 14,
              family: "Arial, sans-serif",
              weight: "bold",
            },
            color: "#fff", // White text for the legend
            padding: 20,
          },
        },
        tooltip: {
          backgroundColor: "#333",
          titleFont: { size: 16 },
          bodyFont: { size: 14 },
          cornerRadius: 6,
          borderColor: "#ff8000",
          borderWidth: 1,
        },
        title: {
          display: true,
          text: `CH₄ Emissions Trends for ${region}`,
          color: "#ff8000",
          font: {
            size: 20,
            weight: "bold",
          },
          padding: {
            top: 10,
            bottom: 20,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            font: {
              size: 14,
            },
            color: "#fff", // White axis labels
          },
          grid: {
            color: "rgba(255, 255, 255, 0.1)", // Light grid lines
          },
        },
        y: {
          ticks: {
            font: {
              size: 14,
            },
            color: "#fff", // White axis labels
          },
          grid: {
            color: "rgba(255, 255, 255, 0.1)",
          },
        },
      },
    };

    return (
      <div className="chart-container">
        <Line data={chartData} options={chartOptions} className="chart" />
      </div>
    );
  };

  return (
    <div className="map-data-container">
      <h1 className="text-2xl font-bold p-4 text-orange-500">
        Click on the map to view CH₄ emissions data
      </h1>

      {/* Map Section */}
      <MapContainer center={[20, 0]} zoom={2} className="map-box">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapEvents />
        {area && (
          <Circle
            center={[area.lat, area.lng]}
            radius={area.radius}
            pathOptions={{
              color: "#ff8000",
              fillColor: "#1a1a1a",
              fillOpacity: 0.6,
            }}
          />
        )}
      </MapContainer>

      {/* Display emissions graphs and comparison if available */}
      {isLoading && (
        <div className="loading-container">
          <FaSpinner className="loading-spinner" />
          <p className="loading-text">Loading data, please wait...</p>
        </div>
      )}

      {!isLoading && emissionsData && !compareMode && (
        <div>
          {emissionsData.length > 0 ? (
            <CH4EmissionsGraph
              data={emissionsData}
              region={currentRegion || "Current Region"}
            />
          ) : (
            <p>No data available for this region.</p>
          )}
          <button
            className="compare-button"
            onClick={() => setIsComparing(true)}
          >
            Compare
          </button>
        </div>
      )}

      {!isLoading && emissionsData && compareMode && (
        <div>
          {isComparing ? (
            <div className="graph-comparison-container">
              <div className="graph-column">
                <h3 className="text-lg font-semibold">Previous Graph</h3>
                {previousEmissionsData && previousEmissionsData.length > 0 ? (
                  <CH4EmissionsGraph
                    data={previousEmissionsData}
                    region={previousRegion || "Previous Region"}
                  />
                ) : (
                  <p>No previous data available.</p>
                )}
              </div>

              <div className="graph-column">
                <h3 className="text-lg font-semibold">Current Graph</h3>
                {emissionsData.length > 0 ? (
                  <CH4EmissionsGraph
                    data={emissionsData}
                    region={currentRegion || "Current Region"}
                  />
                ) : (
                  <p>No current data available.</p>
                )}
              </div>
            </div>
          ) : (
            <CH4EmissionsGraph
              data={emissionsData}
              region={currentRegion || "Current Region"}
            />
          )}

          {/* Compare/Not Compare Buttons */}
          <div className="button-group">
            <button
              className="compare-button"
              onClick={() => setIsComparing(true)}
            >
              Compare
            </button>
            <button
              className="not-compare-button"
              onClick={() => setIsComparing(false)}
            >
              Not Compare
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CH4MapWithDataPage;
