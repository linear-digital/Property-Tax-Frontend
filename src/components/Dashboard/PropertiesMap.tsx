/* eslint-disable @typescript-eslint/no-explicit-any */
// PropertyMap.tsx
import React from 'react';
import { MapContainer, TileLayer,  Popup, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const PropertyMap = ({ properties }: { properties: any[] }) => {
  const defaultCenter: [number, number] = properties.length > 0
    ? [properties[0].lat, properties[0].lng]
    : [0, 0]; // fallback to [0, 0] if properties is empty

  return (
    <MapContainer center={defaultCenter} zoom={16} style={{ height: '500px', width: '100%', marginTop: '20px', zIndex: 0 }}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />

      {properties.map((prop) => (
        <CircleMarker
          key={prop.id}
          center={[prop.lat, prop.lng]}
          radius={6}
          color={prop.status === 'paid' ? 'green' : 'red'}
          fillOpacity={1}
        >
          <Popup>
            <strong>{prop.name}</strong><br />
            Status: {prop.status}
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
};

export default PropertyMap;