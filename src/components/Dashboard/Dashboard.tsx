import React from 'react';
import Statistics from './Statistics';
import Filter from './Filter';
import PropertiesMap from './PropertiesMap';
import Charts from './Charts';
import { useQuery } from '@tanstack/react-query';
import { fetcher } from '../../util/axios.instance';
import { Skeleton } from 'antd';

const Dashboard = () => {
    const [dates, setDates] = React.useState({ year: new Date().getFullYear(), month: new Date().getMonth() });

    // Fetch all properties
    const { data: allPropertiesData, isLoading: isLoadingAll } = useQuery({
        queryKey: ['properties-all'],
        queryFn: async () => {
            const res = await fetcher({
                path: `/property/all`,
                method: 'POST',
                body: { all: true }
            });
            return res.data; // Assuming res.data contains the array of properties
        }
    });

    // Fetch dashboard properties for the specific dates
    const { data: dashboardPropertiesData, isLoading: isLoadingDashboard } = useQuery({
        queryKey: ['properties-dashboard', dates],
        queryFn: async () => {
            const res = await fetcher({
                path: `/property/dashboard`,
                params: dates
            });
            return res.data; // Assuming res.data contains the dashboard statistics
        }
    });

    const isLoading = isLoadingAll || isLoadingDashboard;

    if (isLoading) {
        return (
            <div>
                <Filter dates={dates} setDates={setDates} />
                <Skeleton active className='mt-4' />
                <Skeleton active className='my-2' />
                <Skeleton active />
            </div>
        );
    }

    // Use a null check to ensure data is available before rendering
    if (!allPropertiesData || !dashboardPropertiesData) {
        return <div>Error loading data.</div>;
    }

    return (
        <div>
            <Filter dates={dates} setDates={setDates} />
            <Statistics properties={dashboardPropertiesData?.total || 0} />
            <PropertiesMap properties={allPropertiesData || []} />
            <Charts dates={dates} properties={dashboardPropertiesData} />
        </div>
    );
};

export default Dashboard;
