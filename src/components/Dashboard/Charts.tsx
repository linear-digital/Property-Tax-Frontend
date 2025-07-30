import React from 'react';
import PropertyStatusPieChart from './Charts/PropertyStatus';
import PropertyByType from './Charts/PropertyByType';
import PropertyByBuildingDetails from './Charts/PropertyByBuildingDetails';
import AmountPaidChart from './Charts/TotalPaidAmmountPermonth';
import DailyPayments from './Charts/DailyPayments';
import DailyDifferences from './Charts/DailyDifferences';

const Charts = () => {
    // Example data for dailyPaymentsData and dailyDiscountsData
    const dailyPaymentsData = [
        21, 2215, 1298, 388, 601, 316, 14, 242, 777, 1370, 340, 2140, 1391, 455, 428, 509, 776, 35, 206, 1026, 1022, 390, 566, 1130, 703, 1580, 162, 202, 996, 270, 816
    ];

    const dailyDiscountsData = [
        1249, 2401, 1964, 1697, 812, 812, 616, 2232, 1702, 1916, 541, 2440, 2165, 925, 864, 867, 1108, 1550, 1364, 1082, 1724, 779, 1084, 1233, 1412, 2070, 899, 1528, 1685, 593, 1715
    ];

    // To use this data in your component, you would pass it as props:
    // <DailyDifferences 
    //   dailyPaymentsData={dailyPaymentsData} 
    //   dailyDiscountsData={dailyDiscountsData} 
    // />
    return (
        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 mt-8'>
            <PropertyStatusPieChart />
            <PropertyByType />
            <PropertyByBuildingDetails />
            <AmountPaidChart />
            <DailyPayments />
            <DailyDifferences dailyDiscountsData={dailyDiscountsData} dailyPaymentsData={dailyPaymentsData} />
        </div>
    );
};

export default Charts;