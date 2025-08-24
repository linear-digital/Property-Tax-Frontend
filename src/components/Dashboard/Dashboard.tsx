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
    const { data , isLoading } = useQuery({
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
    const { data: properties, refetch } = useQuery({
        queryKey: ['properties-dashboard'],
        queryFn: async () => {
            const res = await fetcher({
                path: `/property/dashboard`,
                body: dates
            });
            return res;
        }
    })
    return (
        <div>
            <Filter refetch={refetch} dates={dates} setDates={setDates} />
            <Statistics properties={properties?.total || 0} />
            {
                isLoading ? <>
                    <Skeleton active className='mt-4'/>
                    <Skeleton active className='my-2'/>
                    <Skeleton active />
                </>
                    :
                    <PropertiesMap properties={data?.data || []} />
            }
            <Charts dates={dates} properties={properties} />
        </div>
    );
};

export default Dashboard;
