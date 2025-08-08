/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon not showing
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// A component to handle map clicks and update parent state
function MapClickHandler({ setParentLatLong, currentLatLong }: { setParentLatLong: (latLong: [number, number]) => void, currentLatLong: [number, number] | null }) {
    const map = useMapEvents({
        click(e) {
            console.log(e);
            const newLatLong: [number, number] = [e.latlng.lat, e.latlng.lng];
            setParentLatLong(newLatLong); // Update the parent's state
            // console.log('Clicked Lat:', newLatLong[0], 'Long:', newLatLong[1]); // Keep this for debugging if needed
        },
    });

    // Effect to pan the map to the currentLatLong when it changes
    useEffect(() => {
        if (currentLatLong && map.getCenter().lat !== currentLatLong[0] && map.getCenter().lng !== currentLatLong[1]) {
            map.flyTo(currentLatLong, map.getZoom());
        }
    }, [currentLatLong, map]); // Dependency on currentLatLong

    return null; // This component doesn't render anything itself
}

// MapSelector is now just the map component itself
function MapSelector({ latLong, setLatLong }: { latLong: [number, number], setLatLong: (latLong: [number, number]) => void }) {
    const mapRef = useRef<L.Map | null>(null); // Ref to hold the Map instance

    // Effect to manually update map center if latLong prop changes (e.g., from input fields)
    useEffect(() => {
        if (mapRef.current && latLong) {
            const currentMapCenter = mapRef.current.getCenter();
            // Only fly if the map's center is significantly different from the prop
            if (Math.abs(currentMapCenter.lat - latLong[0]) > 0.000001 || Math.abs(currentMapCenter.lng - latLong[1]) > 0.000001) {
                mapRef.current.flyTo(latLong, mapRef.current.getZoom());
            }
        }
    }, [latLong]);


    return (
        <MapContainer
            style={{ height: '500px', width: '100%' }} // Adjust height as needed
            center={latLong} // Map centers on the current latitude and longitude from prop
            zoom={6} // A good zoom level for the initial coordinates (Somalia)
            scrollWheelZoom={true}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* Always render a marker at the current latLong prop */}
            {latLong && (latLong[0] !== 0 || latLong[1] !== 0) ? ( // Only show marker if not default [0,0]
                <Marker position={latLong}>
                    <Popup>
                        Lat: {latLong[0].toFixed(6)} <br />
                        Long: {latLong[1].toFixed(6)}
                    </Popup>
                </Marker>
            ) : null}

            {/* Component to handle map clicks and update parent state */}
            <MapClickHandler setParentLatLong={setLatLong} currentLatLong={latLong} />
        </MapContainer>
    );
}

export default MapSelector;