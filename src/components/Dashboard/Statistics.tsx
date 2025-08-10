import React from 'react';
import StatisticsCard from '../Card/StatisticsCard';

const Statistics = ({properties}: {properties: number}) => {
    return (
        <div>
            <StatisticsCard properties={properties}/>
        </div>
    );
};

export default Statistics;