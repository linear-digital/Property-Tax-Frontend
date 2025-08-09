/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import PropertyStatusPieChart from './Charts/PropertyStatus';
import PropertyByType from './Charts/PropertyByType';
import PropertyByBuildingDetails from './Charts/PropertyByBuildingDetails';
import AmountPaidChart from './Charts/TotalPaidAmmountPermonth';
import DailyPayments from './Charts/DailyPayments';
import DailyDifferences from './Charts/DailyDifferences';
import type { Property } from '../../types/property';
import { useQuery } from '@tanstack/react-query';
import { fetcher } from '../../util/axios.instance';

const Charts = ({ properties }: { properties: Property[] }) => {
    // Example data for dailyPaymentsData and dailyDiscountsData
    const [dailyPaymentsData, setDailyPaymentsData] = useState([
        21, 2215, 1298, 388, 601, 316, 14, 242, 777, 1370, 340, 2140, 1391, 455, 428, 509, 776, 35, 206, 1026, 1022, 390, 566, 1130, 703, 1580, 162, 202, 996, 270, 816
    ])

    const [dailyDiscountsData, setDailyDiscountsData] = useState([
        1249, 2401, 1964, 1697, 812, 812, 616, 2232, 1702, 1916, 541, 2440, 2165, 925, 864, 867, 1108, 1550, 1364, 1082, 1724, 779, 1084, 1233, 1412, 2070, 899, 1528, 1685, 593, 1715
    ])
    const { data } = useQuery({
        queryKey: ['discount and payments'],
        queryFn: async () => {
            return await fetcher({
                path: '/invoice/payment-discount-statistics'
            })
        },
    })
    useEffect(() => {
        if (data) {
            const discountData = data.map((item: any) => item.discount);
            const payments = data.map((item: any) => item.y);
            setDailyDiscountsData(discountData);
            setDailyPaymentsData(payments);
        }
    }, [data])

    return (
        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 mt-8'>
            <PropertyStatusPieChart properties={properties} />
            <PropertyByType properties={properties} />
            <PropertyByBuildingDetails properties={properties} />
            <AmountPaidChart />
            <DailyPayments />
            <DailyDifferences dailyDiscountsData={dailyDiscountsData} dailyPaymentsData={dailyPaymentsData} />
        </div>
    );
};

export default Charts;