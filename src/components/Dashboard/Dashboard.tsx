import React from 'react';
import Statistics from './Statistics';
import Filter from './Filter';
import PropertiesMap from './PropertiesMap';
import Charts from './Charts';
import { useQuery } from '@tanstack/react-query';
import { fetcher } from '../../util/axios.instance';


const Dashboard = () => {
    const [dates, setDates] = React.useState({ year: new Date().getFullYear(), month: new Date().getMonth() });
    const { data = {} } = useQuery({
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
    return (
        <div>
            <Filter dates={dates} setDates={setDates} />
            <Statistics properties={data?.data || []} />
            <PropertiesMap properties={data.data || []} />
            <Charts dates={dates} properties={data.data || []} />
        </div>
    );
};

export default Dashboard;