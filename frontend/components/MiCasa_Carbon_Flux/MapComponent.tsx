import React from 'react';
import { MapContainer, TileLayer, Rectangle, useMap } from 'react-leaflet';
import { LatLngExpression, LatLngBoundsExpression } from 'leaflet';

const MapEffect = () => {
  const map = useMap();

  React.useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
  }, [map]);

  return null;
};

interface MapComponentProps {
  date1Tile: string;
  date2Tile: string;
  bounds: LatLngBoundsExpression; // Correct type for bounds
}

const MapComponent: React.FC<MapComponentProps> = ({ date1Tile, date2Tile, bounds }) => {
  const center: LatLngExpression = [31.9, -99.9]; // Center of the map

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <MapContainer style={{ height: '400px', width: '45%' }} center={center} zoom={6}>
        <TileLayer url={date1Tile} />
        <Rectangle bounds={bounds} pathOptions={{ color: 'blue' }} />
        <MapEffect />
      </MapContainer>
      <MapContainer style={{ height: '400px', width: '45%' }} center={center} zoom={6}>
        <TileLayer url={date2Tile} />
        <Rectangle bounds={bounds} pathOptions={{ color: 'blue' }} />
        <MapEffect />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
