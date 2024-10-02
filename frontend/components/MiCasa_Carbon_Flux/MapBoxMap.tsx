// frontend/src/components/MapboxMap.tsx
import React from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiaGVpc2FtaXQzIiwiYSI6ImNtMXIzbnVzcTA3Z3Uya3M1MndpZHp4bHkifQ.N5YphsP9nhDZ0JCaEodoDw';


interface MapboxMapProps {
  date1TileUrl: string;
  bounds: [[number, number], [number, number]];
  carbonDataPoints: { coordinates: [number, number]; value: number }[];
}


const MapboxMap: React.FC<MapboxMapProps> = ({ date1TileUrl, bounds, carbonDataPoints }) => {
  const mapContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style: 'mapbox://styles/mapbox/streets-v11', // Base map style
      center: [(bounds[0][1] + bounds[1][1]) / 2, (bounds[0][0] + bounds[1][0]) / 2], // Center between bounds
      zoom: 6
    });

    map.on('load', () => {
      map.addSource('date1Tiles', {
        type: 'raster',
        tiles: [date1TileUrl],
        tileSize: 256
      });

      map.addLayer({
        id: 'date1Layer',
        type: 'raster',
        source: 'date1Tiles'
      });

      // Add a source for carbon data points
      map.addSource('carbonDataPoints', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: carbonDataPoints.map(point => ({
            type: 'Feature',
            properties: {
              value: point.value
            },
            geometry: {
              type: 'Point',
              coordinates: point.coordinates
            }
          }))
        }
      });

      // Add a layer to render the points
      map.addLayer({
        id: 'carbonDataPointsLayer',
        type: 'circle',
        source: 'carbonDataPoints',
        paint: {
          'circle-radius': 5,
          'circle-color': '#FF0000',
          'circle-opacity': 0.75
        }
      });
    });

    return () => map.remove(); // Clean up on unmount
  }, [date1TileUrl, bounds, carbonDataPoints]); // Dependencies updated

  return <div ref={mapContainerRef} style={{ height: '400px', width: '100%' }} />;
};

export default MapboxMap;
