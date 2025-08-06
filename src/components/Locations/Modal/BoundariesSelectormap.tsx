/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, FeatureGroup, useMap } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import L from 'leaflet';

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
    setGeoJson: (geo: any) => void;
}

const FitBoundsWithGeoJson: React.FC<{ geoJson: any }> = ({ geoJson }) => {
    const map = useMap();

    useEffect(() => {
        if (geoJson) {
            const layer = L.geoJSON(geoJson);
            const bounds = layer.getBounds();
            if (bounds.isValid()) {
                map.fitBounds(bounds);
            }
        }
    }, [geoJson, map]);

    return null;
};

const MapWithDraw: React.FC<MapWithDrawProps> = ({ setGeoJson, geoJson }) => {
    const featureGroupRef = useRef<L.FeatureGroup>(null);

    // Load GeoJSON into the map when geoJson changes
    useEffect(() => {
        if (geoJson && featureGroupRef.current) {
            featureGroupRef.current.clearLayers();
            const layer = L.geoJSON(geoJson);
            layer.eachLayer(l => featureGroupRef.current?.addLayer(l));
        }
    }, [geoJson]);

    const _onCreate = (e: any) => {
        const layer = e.layer;
        const geojson = layer.toGeoJSON();
        setGeoJson(geojson);
    };

    const _onEdited = (e: any) => {
        e.layers.eachLayer((layer: any) => {
            const geojson = layer.toGeoJSON();
            setGeoJson(geojson);
        });
    };

    const _onDeleted = () => {
        setGeoJson(null);
    };

    return (
        <MapContainer
            center={[45.443153, 4.319253]} // Default fallback center

            zoom={6}
            scrollWheelZoom={true}
            style={{ height: '500px', width: '100%', zIndex: 0 }}
        >
            <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {geoJson && <FitBoundsWithGeoJson geoJson={geoJson} />}

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