import React from 'react';
import Statistics from './Statistics';
import Filter from './Filter';
import PropertiesMap from './PropertiesMap';
import Charts from './Charts';
import { useQuery } from '@tanstack/react-query';
import { fetcher } from '../../util/axios.instance';
import { Spin } from 'antd';

const Dashboard = () => {

    const { data, isLoading } = useQuery({
        queryKey: ['properties-all'],
        queryFn: async () => {
            const res = await fetcher({
                path: `/property/all`,
                method: 'POST',
                body: { all: true }
            });
            return res;
        }
    })
    if (isLoading) {
        return <Spin fullscreen/>
    }
    return (
        <div>
            <Filter />
            <Statistics properties={data?.data || []}/>
            <PropertiesMap properties={data.data || []} />
            <Charts properties={data.data || []}/>
        </div>
    );
};

export default Dashboard;