/* eslint-disable @typescript-eslint/no-explicit-any */
// src/MapWithDraw.tsx

import React, { useRef } from 'react';
import { MapContainer, TileLayer, FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import L from 'leaflet';

// Fix missing marker icon issue
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

interface MapWithDrawProps {
    geoJson?: any;
    setGeoJson: any;
}

const MapWithDraw: React.FC<MapWithDrawProps> = ({ setGeoJson }) => {
    const featureGroupRef = useRef<L.FeatureGroup>(null);

    const _onCreate = (e: any) => {
        const layer = e.layer;
        const geojson = layer.toGeoJSON();
        setGeoJson(geojson);
        console.log('Created:', geojson);
    };

    const _onEdited = (e: any) => {
        const layers = e.layers;
        layers.eachLayer((layer: any) => {
            const geojson = layer.toGeoJSON();
            console.log('Edited:', geojson);
        });
    };

    const _onDeleted = (e: any) => {
        console.log('Deleted:', e.layers);
    };

    return (
        <MapContainer
            center={[4.319253, 45.443153]} // Somalia region
            zoom={6}
            scrollWheelZoom={true}
            style={{ height: '500px', width: '100%' }}
        >
            <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <FeatureGroup ref={featureGroupRef}>
                <EditControl
                    position="topright"
                    onCreated={_onCreate}
                    onEdited={_onEdited}
                    onDeleted={_onDeleted}
                    draw={{
                        rectangle: true,
                        circle: false,
                        circlemarker: false,
                        marker: true,
                        polyline: true,
                        polygon: {
                            allowIntersection: true,
                            showArea: true,
                            shapeOptions: { color: 'blue' },
                        },
                    }}
                />
            </FeatureGroup>
        </MapContainer>
    );
};

export default MapWithDraw;