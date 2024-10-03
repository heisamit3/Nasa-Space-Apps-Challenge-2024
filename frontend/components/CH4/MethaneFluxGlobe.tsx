import React, { useState, useEffect, useCallback } from "react";
import Globe from "react-globe.gl";
import { Card, CardHeader, CardContent, Button, CircularProgress } from "@mui/material";
import * as d3 from "d3";

interface EmissionDataPoint {
  datetime: string;
  mean: number;
  lat: number;
  lng: number;
}

const LoadingSpinner: React.FC = () => (
  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80px" }}>
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
      const response = await fetch("http://127.0.0.1:8000/compute_global_stats_view/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Network response was not ok: ${errorData.error}`);
      }

      const data = await response.json();
      console.log("Data:", data);
      const processedData = processData(data.data);
      console.log("Processed data:", processedData);
      setGlobeData(processedData);
    } catch (error) {
      console.error("Error in fetchData:", error);
      setError(error instanceof Error ? error.message : String(error));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const processData = useCallback((rawData: any[]): EmissionDataPoint[] => {
    if (!Array.isArray(rawData)) {
      console.error("Expected an array for rawData:", rawData);
      return [];
    }

    return rawData.map((item) => {
      const mean = item.mean ?? item.total?.mean ?? 0;
      const datetime = item.datetime || "Unknown";
      
      // Assuming global data, we'll create a grid of points
      const points: EmissionDataPoint[] = [];
      for (let lat = -80; lat <= 80; lat += 20) {
        for (let lng = -180; lng < 180; lng += 20) {
          points.push({
            datetime,
            mean,
            lat,
            lng,
          });
        }
      }
      return points;
    }).flat();
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const getPointColor = useCallback((d: object) => {
    const dataPoint = d as EmissionDataPoint;
    const colorScale = d3.scaleSequential(d3.interpolateYlOrRd)
      .domain([0, d3.max(globeData, (d) => d.mean) || 1]);
    return colorScale(dataPoint.mean);
  }, [globeData]);

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
            pointAltitude={(d) => (d as EmissionDataPoint).mean * 0.0001}
            pointColor={getPointColor}
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