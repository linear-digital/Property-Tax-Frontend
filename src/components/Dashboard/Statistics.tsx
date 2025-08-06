import React from 'react';
import StatisticsCard from '../Card/StatisticsCard';
import type { Property } from '../../types/property';

const Statistics = ({properties}: {properties: Property}) => {
    return (
        <div>
            <StatisticsCard properties={properties}/>
        </div>
    );
};

export default Statistics;