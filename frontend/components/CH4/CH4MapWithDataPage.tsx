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
import { FaArrowUp, FaArrowDown, FaEquals } from "react-icons/fa"; // Move this import to the top

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

const CH4MapWithDataPage: React.FC = () => {
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
  const [suggestions, setSuggestions] = useState<string[]>([]);
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

        setIsLoading(true);

        const regionName = await fetchRegionName(lat, lng);

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
        }, 2000); // Simulated 2-second delay
      },
    });
    return null;
  };

  // Fetch emissions data (used for both map click and search)
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
  // Helper function to calculate the mean of an array of values
  const calculateMean = (data: DataPoint[] | null): number | null => {
    if (!data || data.length === 0) return null;
    const total = data.reduce(
      (sum, point) => sum + point.statistics.b1.mean,
      0
    );
    return total / data.length;
  };
  const calculateMin = (data: DataPoint[] | null): number | null => {
    if (!data || data.length === 0) return null;
    return Math.min(...data.map((point) => point.statistics.b1.min));
  };

  const calculateMax = (data: DataPoint[] | null): number | null => {
    if (!data || data.length === 0) return null;
    return Math.max(...data.map((point) => point.statistics.b1.max));
  };

  const calculateMedian = (data: DataPoint[] | null): number | null => {
    if (!data || data.length === 0) return null;
    const sortedMedians = data
      .map((point) => point.statistics.b1.median)
      .sort((a, b) => a - b);
    const mid = Math.floor(sortedMedians.length / 2);
    return sortedMedians.length % 2 !== 0
      ? sortedMedians[mid]
      : (sortedMedians[mid - 1] + sortedMedians[mid]) / 2;
  };
  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Clear suggestions if the query is empty
    if (query.trim() === "") {
      setSuggestions([]);
      return;
    }

    if (query.length < 2) {
      setSuggestions([]); // Only fetch suggestions for more than 1 character
      return;
    }

    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${OPENCAGE_API_KEY}&limit=5`
      );
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        // Filter out suggestions that don't match the query substring
        const locationSuggestions = data.results
          .map((result: any) => result.formatted)
          .filter((formatted: string) =>
            formatted.toLowerCase().includes(query.toLowerCase())
          ); // Ensure it contains the query substring

        setSuggestions(locationSuggestions); // Set suggestions only if they contain the query substring
      } else {
        setSuggestions([]); // Clear suggestions if no valid results are found
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]); // Clear suggestions on error
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = async (suggestion: string) => {
    setSearchQuery(suggestion);
    setSuggestions([]); // Clear suggestions after selecting one

    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${suggestion}&key=${OPENCAGE_API_KEY}`
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry;

        setArea({ lat, lng, radius: 50000 });

        const coordinates = [
          [lng, lat],
          [lng, lat + 4],
          [lng - 4, lat + 4],
          [lng - 4, lat],
          [lng, lat],
        ];

        setCurrentRegion(data.results[0].formatted);
        await fetchEmissionsData(coordinates, data.results[0].formatted);
      }
    } catch (error) {
      console.error("Error fetching selected location data:", error);
    }
  };

  // Handle search button click (trigger a search based on the current input value)
  const handleSearchClick = async () => {
    if (searchQuery.trim() === "") return; // Avoid empty search queries

    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${searchQuery}&key=${OPENCAGE_API_KEY}`
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry;

        setArea({ lat, lng, radius: 50000 });

        const coordinates = [
          [lng, lat],
          [lng, lat + 4],
          [lng - 4, lat + 4],
          [lng - 4, lat],
          [lng, lat],
        ];

        setCurrentRegion(data.results[0].formatted);
        await fetchEmissionsData(coordinates, data.results[0].formatted);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleInputFocus = () => {
    setSearchQuery(""); // Clear the search query
    setSuggestions([]); // Clear suggestions
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
  }; // Icons for increase, decrease, same
  // Generate the storytelling message based on comparison
  // Generate the storytelling message based on comparison
  const generateStoryMessage = () => {
    const currentMean = calculateMean(emissionsData);
    const previousMean = calculateMean(previousEmissionsData);
    const currentMin = calculateMin(emissionsData);
    const previousMin = calculateMin(previousEmissionsData);
    const currentMax = calculateMax(emissionsData);
    const previousMax = calculateMax(previousEmissionsData);
    const currentMedian = calculateMedian(emissionsData);
    const previousMedian = calculateMedian(previousEmissionsData);

    if (
      currentMean === null ||
      previousMean === null ||
      currentMin === null ||
      previousMin === null ||
      currentMax === null ||
      previousMax === null ||
      currentMedian === null ||
      previousMedian === null
    ) {
      return "Insufficient data for comparison.";
    }

    const meanDifference = currentMean - previousMean;
    const minDifference = currentMin - previousMin;
    const maxDifference = currentMax - previousMax;
    const medianDifference = currentMedian - previousMedian;

    const differencePercentage = (difference: number, previous: number) => {
      return previous !== 0
        ? ((difference / previous) * 100).toFixed(2)
        : "N/A";
    };

    const getIcon = (difference: number) => {
      if (difference > 0) return <FaArrowUp className="increase icon" />;
      if (difference < 0) return <FaArrowDown className="decrease icon" />;
      return <FaEquals className="neutral icon" />;
    };

    const formatDifference = (difference: number) => {
      return Math.abs(difference).toFixed(2);
    };

    return (
      <>
        <div className="story-item">
          {getIcon(meanDifference)}
          <p>
            <span className="story-highlight">Mean:</span> Current mean CH₄
            emissions are{" "}
            <span className="story-highlight">
              {formatDifference(meanDifference)} ppm
            </span>
            , which is a{" "}
            {meanDifference > 0
              ? "rise"
              : meanDifference < 0
              ? "fall"
              : "no change"}
            of{" "}
            <span className="story-highlight">
              {formatDifference(meanDifference)} ppm
            </span>
            ({differencePercentage(meanDifference, previousMean)}%) compared to
            the previous region.
          </p>
        </div>

        <div className="story-item">
          {getIcon(minDifference)}
          <p>
            <span className="story-highlight">Minimum:</span> Current minimum
            CH₄ emissions are{" "}
            <span className="story-highlight">
              {formatDifference(minDifference)} ppm
            </span>
            , which is a{" "}
            {minDifference > 0
              ? "rise"
              : minDifference < 0
              ? "fall"
              : "no change"}
            of{" "}
            <span className="story-highlight">
              {formatDifference(minDifference)} ppm
            </span>
            ({differencePercentage(minDifference, previousMin)}%) compared to
            the previous region.
          </p>
        </div>

        <div className="story-item">
          {getIcon(maxDifference)}
          <p>
            <span className="story-highlight">Maximum:</span> Current maximum
            CH₄ emissions are{" "}
            <span className="story-highlight">
              {formatDifference(maxDifference)} ppm
            </span>
            , which is a{" "}
            {maxDifference > 0
              ? "rise"
              : maxDifference < 0
              ? "fall"
              : "no change"}
            of{" "}
            <span className="story-highlight">
              {formatDifference(maxDifference)} ppm
            </span>
            ({differencePercentage(maxDifference, previousMax)}%) compared to
            the previous region.
          </p>
        </div>

        <div className="story-item">
          {getIcon(medianDifference)}
          <p>
            <span className="story-highlight">Median:</span> Current median CH₄
            emissions are{" "}
            <span className="story-highlight">
              {formatDifference(medianDifference)} ppm
            </span>
            , which is a{" "}
            {medianDifference > 0
              ? "rise"
              : medianDifference < 0
              ? "fall"
              : "no change"}
            of{" "}
            <span className="story-highlight">
              {formatDifference(medianDifference)} ppm
            </span>
            ({differencePercentage(medianDifference, previousMedian)}%) compared
            to the previous region.
          </p>
        </div>
      </>
    );
  };

  return (
    <div className="map-data-container">
      <h1 className="text-2xl font-bold p-4 text-orange-500">
        Search or click on the map to view CH₄ emissions data
      </h1>

      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search for a location"
          value={searchQuery}
          onChange={handleSearch}
          onFocus={handleInputFocus}
          className="search-input"
        />
        <button className="search-button" onClick={handleSearchClick}>
          <FaSearch />
        </button>
        {suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="suggestion-item" onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion}
              </li>
            ))}
          </ul>
        )}
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
          <button className="button" onClick={() => setIsComparing(true)}>
            <FaExchangeAlt /> Compare
          </button>
          <button className="button" onClick={() => setIsComparing(false)}>
            <FaTimes /> Not Compare
          </button>
        </div>
      )}

      {/* Comparison view */}
      {/* Comparison view */}
      {isComparing && (
        <>
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

          {/* Storytelling message */}
          <div className="story-message-container">
            <div className="story-message">{generateStoryMessage()}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default CH4MapWithDataPage;
