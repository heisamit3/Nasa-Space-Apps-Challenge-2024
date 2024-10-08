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
import { FaSpinner, FaSearch, FaExchangeAlt, FaTimes } from "react-icons/fa"; // Import React Icons for UI
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

// Add state types for filtering
interface Filters {
  region: string;
  typeOfGas: string;// Add other variables as needed
  typeOfSector: string; // Add typeOfSector property
}

const GlobalCH4: React.FC = () => {
  const [area, setArea] = useState<Area | null>(null);
  const [emissionsData, setEmissionsData] = useState<DataPoint[] | null>(null);
  const [previousEmissionsData, setPreviousEmissionsData] = useState<
    DataPoint[] | null
  >(null);
  const [currentRegion, setCurrentRegion] = useState<string | null>(null);
  const [previousRegion, setPreviousRegion] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isComparing, setIsComparing] = useState<boolean>(false);
  const [compareMode, setCompareMode] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filters, setFilters] = useState<Filters>({
    region: "",
    typeOfGas: "",
    typeOfSector: ""
  }); // State for filters

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

  // Update fetch function to include filters
  const fetchEmissionsData = async (
    coordinates: number[][],
    regionName: string | null
  ) => {
    setIsLoading(true); // Start loading animation

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
            filters: filters, // Send filters to backend
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Network response was not ok`);
      }

      const data = await response.json();

      if (compareMode) {
        setPreviousEmissionsData(emissionsData);
        setPreviousRegion(currentRegion);
      }

      setEmissionsData(data.data);
      setCurrentRegion(regionName || "Unknown Region");
      setCompareMode(true);
    } catch (error) {
      console.error("Error fetching data:", error);
      setEmissionsData(null);
    } finally {
      setIsLoading(false);
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

        setIsLoading(true);

        const regionName = await fetchRegionName(lat, lng);

        fetchEmissionsData(coordinates, regionName);
      },
    });
    return null;
  };

  // Filter inputs change handler
  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    filterType: keyof Filters
  ) => {
    setFilters({ ...filters, [filterType]: e.target.value });
  };

  // Handle search functionality
  const handleSearch = async () => {
    if (!searchQuery) return;

    setIsLoading(true);

    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${searchQuery}&key=${OPENCAGE_API_KEY}`
      );
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const result = data.results[0];
        const { lat, lng } = result.geometry;

        setArea({ lat, lng, radius: 50000 });

        const coordinates = [
          [lng, lat],
          [lng, lat + 4],
          [lng - 4, lat + 4],
          [lng - 4, lat],
          [lng, lat],
        ];

        setCurrentRegion(result.formatted);
        fetchEmissionsData(coordinates, result.formatted);
      } else {
        alert("No results found for your query.");
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setIsLoading(false);
    }
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

  // UI elements for filters and the rest of your application
  return (
    <div className="map-data-container">
      <h1 className="text-2xl font-bold p-4 text-orange-500">
        Search or click on the map to view CH₄ emissions data
      </h1>

      {/* Filter Section */}
      <div className="filter-container flex justify-between items-center p-4 bg-gray-800 rounded-lg shadow-md">
        <div className="filter-item">
          <label htmlFor="typeOfGas" className="text-white font-medium">
            Type of Gas:
          </label>
          <select
            id="typeOfGas"
            value={filters.typeOfGas}
            onChange={(e) => handleFilterChange(e, "typeOfGas")}
            className="ml-2 p-2 rounded border border-gray-300 focus:border-blue-500 focus:outline-none"
          >
            <option value="">Select Gas Type</option>
            <option value="methane">Methane</option>
            <option value="carbonDioxide">Carbon Dioxide</option>
            <option value="nitrousOxide">Nitrous Oxide</option>
            {/* Add other gas types as needed */}
          </select>
        </div>
        <div className="filter-item">
          <label htmlFor="typeOfSector" className="text-white font-medium">
            Type of Sector:
          </label>
          <select
            id="typeOfSector"
            value={filters.typeOfSector}
            onChange={(e) => handleFilterChange(e, "typeOfSector")}
            className="ml-2 p-2 rounded border border-gray-300 focus:border-blue-500 focus:outline-none"
          >
            <option value="">Select Sector Type</option>
            <option value="energy">Energy</option>
            <option value="agriculture">Agriculture</option>
      
            {/* Add other gas types as needed */}
          </select>
        </div>
        {/* You can add more filters as needed, following the pattern above */}
      </div>

      {/* Search Bar Section */}
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search for a location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          <FaSearch /> {/* Search icon */}
        </button>
      </div>

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

      {/* Loading spinner */}
      {isLoading && (
        <div className="loading-container">
          <FaSpinner className="loading-spinner" />
          <p className="loading-text">Loading data, please wait...</p>
        </div>
      )}

      {/* Emissions Data */}
      {!isLoading && emissionsData && (
        <CH4EmissionsGraph
          data={emissionsData}
          region={currentRegion || "Current Region"}
        />
      )}

      {/* Display emissions graphs and comparison if available */}
      {emissionsData && (
        <div className="button-group">
          <button
            className="compare-button"
            onClick={() => setIsComparing(true)}
          >
            <FaExchangeAlt /> Compare
          </button>
          <button
            className="not-compare-button"
            onClick={() => setIsComparing(false)}
          >
            <FaTimes /> Not Compare
          </button>
        </div>
      )}

      {/* Comparison view */}
      {isComparing && (
        <div className="graph-comparison-container">
          <div className="graph-column">
            <h3 className="text-lg font-semibold">Previous Graph</h3>
            {previousEmissionsData ? (
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
            {emissionsData ? (
              <CH4EmissionsGraph
                data={emissionsData}
                region={currentRegion || "Current Region"}
              />
            ) : (
              <p>No current data available.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobalCH4;
