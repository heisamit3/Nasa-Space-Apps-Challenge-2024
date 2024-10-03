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
      setError(error.message);
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
      // Check if necessary data points are present and correctly formatted
      console.log(item);
  
      // Access the mean value
      const mean = item.properties?.statistics?.b1?.mean;
  
      if (mean === undefined) {
        console.error("Mean value not found in item:", item);
        return []; // Skip items without a mean value.
      }
  
      // Compute the centroid of the geometry to get lat and lng
      let lat = 0;
      let lng = 0;
  
      if (item.geometry && item.geometry.type === 'Polygon' && Array.isArray(item.geometry.coordinates)) {
        // Compute centroid of the polygon
        const coordinates = item.geometry.coordinates[0]; // Assuming first ring is the outer boundary
        const centroid = computeCentroid(coordinates);
        lat = centroid.lat;
        lng = centroid.lng;
      } else {
        console.warn("Geometry data not found or malformed:", item);
      }
  
      // If there's no timestamp, you might assign a default or skip it
      const timestamp = item.properties?.datetime || "Unknown";
  
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

  const computeCentroid = (coordinates: number[][]): { lat: number; lng: number } => {
  let area = 0;
  let x = 0;
  let y = 0;
  const numPoints = coordinates.length;

  for (let i = 0; i < numPoints; i++) {
    const [x1, y1] = coordinates[i];
    const [x2, y2] = coordinates[(i + 1) % numPoints];

    const a = x1 * y2 - x2 * y1;
    area += a;
    x += (x1 + x2) * a;
    y += (y1 + y2) * a;
  }

  area = area / 2;
  x = x / (6 * area);
  y = y / (6 * area);

  return { lat: y, lng: x };
};

  

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
