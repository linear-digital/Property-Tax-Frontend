/* eslint-disable @typescript-eslint/no-explicit-any */
// PropertyMap.tsx
import { MapContainer, TileLayer, Popup, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { Property } from '../../types/property';

const PropertyMap = ({ properties }: { properties: Property[] }) => {
  const defaultCenter: [number, number] = properties.length > 0
    ? [properties[0].latitude, properties[0].longitude]
    : [0, 0]; // fallback to [0, 0] if properties is empty
  
  return (
    <MapContainer center={defaultCenter} zoom={16} style={{ height: '500px', width: '100%', marginTop: '20px', zIndex: 0 }}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />

      {properties.map((prop: any, index) => (
        <CircleMarker
          key={index}
          center={[prop.latitude, prop.longitude]}
          radius={6}
          color={prop.invoices?.status === 'Paid' ? 'green' : 'red'}
          fillOpacity={1}
        >
          <Popup className='text-xs'>
            <strong>Property Code</strong>: {prop.code} <br />
            <strong>Address</strong>: {prop.property_address} <br />
            <strong>Owner</strong>: {prop.owner_name} <br />
            <strong>Building Details</strong>: {prop.house_building_details}

          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
};

export default PropertyMap;