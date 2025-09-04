/* eslint-disable @typescript-eslint/no-explicit-any */
import { MapContainer, TileLayer, Popup, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { Property } from '../../types/property';
import moment from 'moment';

const PropertyMap = ({ properties }: { properties: Property[] }) => {
  // Find the first valid property with lat/lng
  const firstValid = properties.find(
    (p) => typeof p.latitude === 'number' && typeof p.longitude === 'number'
  );

  const defaultCenter: [number, number] = firstValid
    ? [firstValid.latitude, firstValid.longitude]
    : [0, 0]; // fallback to [0,0]

  return (
    <MapContainer
      center={defaultCenter}
      zoom={16}
      style={{ height: '500px', width: '100%', marginTop: '20px', zIndex: 0 }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />

      {properties
        .filter(
          (prop) =>
            typeof prop.latitude === 'number' &&
            typeof prop.longitude === 'number'
        )
        .map((prop, index) => (
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
              <strong>Paid Property Tax Year</strong>: {
                prop?.invoices[1] ? moment(prop.invoices[1]?.payment_date).format('YYYY')
                  :
                  "N/A"
              } <br />
              <strong>
                {prop.invoices[0]?.status === 'Paid' ? 'Paid ' : 'Unpaid '}
                 Property Tax Year</strong>: {
                prop.invoices[0]?.status === 'Paid' ? moment(prop.invoices[0]?.payment_date).format('YYYY') : moment(prop.invoices[0]?.createdAt).format('YYYY')
              }
              <br />
              <strong>GPS Location:</strong> {prop.latitude}, {prop.longitude}

            </Popup>
          </CircleMarker>
        ))}
    </MapContainer>
  );
};

export default PropertyMap;
