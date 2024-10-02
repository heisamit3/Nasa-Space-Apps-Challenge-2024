import React, { useEffect, useState, useRef } from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns"; // Make sure the date adapter is imported
import { fetchStatistics, GeoJson } from "../../Services/api"; // Adjust the import path as necessary

ChartJS.register(...registerables); // Ensure all chart components are registered

const Graphs: React.FC = () => {
  const chartRef = useRef<ChartJS | null>(null); // Create a ref for the chart

  interface ChartData {
    labels: Date[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      fill: boolean;
      lineTension: number;
      pointRadius: number;
    }[];
  }

  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStatistics = async () => {
      try {
        // Define the GeoJSON object for Dallas, TX area
        const geojson: GeoJson = {
          type: "Feature",
          properties: {},
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [-96.1, 32.28], // Southeast Bounding Coordinate
                [-96.1, 33.28], // Northeast Bounding Coordinate
                [-97.58, 33.28], // Northwest Bounding Coordinate
                [-97.58, 32.28], // Southwest Bounding Coordinate
                [-96.1, 32.28], // Closing the polygon
              ],
            ],
          },
        };

        // The URL must match the one from which you intend to fetch data
        const itemUrl =
          "https://earth.gov/ghgcenter/api/raster/collections/micasa-carbonflux-daygrid-v1/items/2023-01-01";

        const statisticsResponse = await fetchStatistics(itemUrl, geojson);

        if (statisticsResponse) {
          const dates = [new Date("2023-01-01")]; // Assuming a single date for simplicity
          const rhValues = [statisticsResponse.properties.statistics.b1.max]; // Example max value

          setChartData({
            labels: dates,
            datasets: [
              {
                label: "RH Level",
                data: rhValues,
                borderColor: "purple",
                fill: false,
                lineTension: 0.5,
                pointRadius: 1,
              },
            ],
          });
          setLoading(false);
        } else {
          throw new Error("No statistics data found");
        }
      } catch (error: any) {
        console.error("Error fetching statistics:", error);
        setError("Failed to fetch statistics.");
        setLoading(false);
      }
    };

    loadStatistics();

    // Cleanup on component unmount
    return () => {
      if (chartRef.current) {
        chartRef.current?.destroy(); // Properly destroy the chart instance
      }
    };
  }, []);

  const options = {
    responsive: true,
    scales: {
      x: {
        type: "time", // Define the x-axis type as time
        title: {
          display: true,
          text: "Date",
        },
        time: {
          unit: "day", // Change based on the density of your data
        },
      },
      y: {
        title: {
          display: true,
          text: "gm Carbon/m²/day",
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: "Heterotrophic Respiration Values for Dallas, Texas",
      },
    },
  };

  if (loading) {
    return <p>Loading chart...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Time Series of Heterotrophic Respiration Changes</h2>
      {chartData ? (
        <Line data={chartData} options={options} ref={chartRef} />
      ) : (
        <p>No chart data available.</p>
      )}
    </div>
  );
};

export default Graphs;
