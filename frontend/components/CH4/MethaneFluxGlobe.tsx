import React, { useState, useEffect, useCallback } from "react";
import Globe from "react-globe.gl";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import * as d3 from "d3";

interface EmissionDataPoint {
  timestamp: string;
  value: number;
  lat: number;
  lng: number;
}

const LoadingSpinner: React.FC = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "80px",
    }}
  >
    <CircularProgress />
  </div>
);

const MethaneFluxGlobe: React.FC = () => {
  const [globeData, setGlobeData] = useState<EmissionDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/compute_global_stats_view/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            coordinates: [
              [-180, -90],
              [180, -90],
              [180, 90],
              [-180, 90],
              [-180, -90],
            ],
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        const errorData = JSON.parse(errorText); // Assuming the server sends JSON errors
        throw new Error(`Network response was not ok: ${errorData.error}`);
      }

      const data = await response.json();
      const processedData = processData(data.data);
      setGlobeData(processedData);
    } catch (error) {
      console.error("Error in fetchData:", error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(String(error));
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const processData = useCallback((rawData: any[]): EmissionDataPoint[] => {
    if (!Array.isArray(rawData)) {
      console.error("Expected an array for rawData:", rawData);
      return [];
    }

    return rawData.flatMap((item) => {
      // Check if necessary data points are present and correctly formatted.

      console.log(item);

      if (
        !item.datetime ||
        !item.statistics ||
        !item.statistics.b1 ||
        !item.statistics.b1.mean
      ) {
        console.error("Malformed item in rawData:", item);
        return []; // Skip malformed data.
      }

      const mean = item.statistics.b1.mean; // Accessing the mean value correctly
      const timestamp = item.datetime; // Assuming 'datetime' is formatted correctly
      let lat = 0; // Placeholder value for latitude
      let lng = 0; // Placeholder value for longitude

      // Check for geographic bounding box data if available
      if (item.bbox) {
        const bbox = item.bbox;
        lat = (bbox[1] + bbox[3]) / 2;
        lng = (bbox[0] + bbox[2]) / 2;
      }

      return [
        {
          timestamp: timestamp,
          value: mean,
          lat: lat,
          lng: lng,
        },
      ];
    });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const getPointColor = useCallback(
    (d: EmissionDataPoint) => {
      const colorScale = d3
        .scaleSequential(d3.interpolateYlOrRd)
        .domain([0, d3.max(globeData, (d) => d.value) || 1]);
      return colorScale(d.value);
    },
    [globeData]
  );

  return (
    <Card sx={{ width: "100%", height: "600px" }}>
      <CardHeader
        title="Global Methane Flux Visualization"
        action={
          <Button variant="contained" onClick={fetchData} disabled={isLoading}>
            Refresh Data
          </Button>
        }
      />
      <CardContent>
        {isLoading && <LoadingSpinner />}
        {error && <div style={{ color: "red", padding: "16px" }}>{error}</div>}
        {!isLoading && !error && (
          <Globe
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
            bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
            pointsData={globeData}
            pointLat="lat"
            pointLng="lng"
            pointAltitude={(obj: object) => {
              const d = obj as EmissionDataPoint;
              return d.value * 0.0001;
            }}
            pointColor={(obj: object) => {
              const d = obj as EmissionDataPoint;
              return getPointColor(d);
            }}
            pointRadius={0.5}
            pointsMerge={true}
            animateIn={true}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default MethaneFluxGlobe;
