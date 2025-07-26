import React from 'react';
import Statistics from './Statistics';
import Filter from './Filter';
import PropertiesMap from './PropertiesMap';
import Charts from './Charts';

const Dashboard = () => {
    const properties = [
        { id: 1, name: "Property 1", lat: 2.1450, lng: 45.1212, status: 'paid' },
        { id: 2, name: "Property 2", lat: 2.1461, lng: 45.1223, status: 'due' },
        { id: 3, name: "Property 3", lat: 2.1448, lng: 45.1205, status: 'paid' },
        // ... more points
    ];

    return (
        <div>
            <Filter />
            <Statistics />
            <PropertiesMap properties={properties} />
            <Charts />
        </div>
    );
};

export default Dashboard;