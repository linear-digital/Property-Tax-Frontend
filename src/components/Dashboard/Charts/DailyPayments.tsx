/* eslint-disable @typescript-eslint/no-explicit-any */
// src/PropertyStatusPieChart.tsx
import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useQuery } from '@tanstack/react-query';
import { fetcher } from '../../../util/axios.instance';
import { months } from '../../Billing/constants';



const DailyPayments = ({ dates }: { dates: { year: number, month: number } }) => {
    const { data } = useQuery({
        queryKey: ['daily payments', dates],
        queryFn: async () => {
            return await fetcher({
                path: '/invoice/perday-statistics',
                params: dates
            })
        },
    })
    // Data approximated from the provided image
    const [chartData, setChartData] = useState([
        { name: '1', y: 0 },
        { name: '2', y: 0 },   // Very small bar in image
        { name: '3', y: 0 },
        { name: '4', y: 0 },
        { name: '5', y: 0 },
        { name: '6', y: 0 },
        { name: '7', y: 0 },
        { name: '8', y: 0 },
        { name: '9', y: 0 },
        { name: '10', y: 0 },
        { name: '11', y: 0 },
        { name: '12', y: 0 },
        { name: '13', y: 0 },
        { name: '14', y: 0 },
        { name: '15', y: 0 },
        { name: '16', y: 0 },
        { name: '17', y: 0 },
        { name: '18', y: 0 },
        { name: '19', y: 0 },
        { name: '20', y: 0 },
        { name: '21', y: 0 },
        { name: '22', y: 0 },
        { name: '23', y: 0 },
        { name: '24', y: 0 },
        { name: '25', y: 0 },
        { name: '26', y: 0 },
        { name: '27', y: 0 },
        { name: '28', y: 0 },
        { name: '29', y: 0 },
        { name: '30', y: 0 },
        { name: '31', y: 0 },
    ])
    useEffect(() => {
        if (data) {
            setChartData(data);
        }
    }, [data])
    const options = {
        chart: {
            type: 'column',
            backgroundColor: '#ffffff', // White background as in the image
            style: {
                fontFamily: 'Arial, sans-serif',
            }
        },
        title: {
            text: `Daily Payments for ${months[dates?.month as number]} (${dates?.year})`, // Updated title as per image
            align: 'center',
            style: {
                color: 'black',
                fontSize: '20px',
                fontWeight: 'bold'
            }
        },
        xAxis: {
            categories: chartData.map(item => item.name),
            title: {
                text: 'Day of Month', // Updated X-axis title
                style: {
                    color: '#333',
                    fontSize: '14px'
                }
            },
            labels: {
                style: {
                    color: '#333'
                }
            },
            lineColor: '#555',
            tickColor: '#555'
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Amount ($)',
                align: 'high',
                offset: 0,
                x: 0,
                y: -15,
                rotation: 0,
                style: {
                    color: '#333',
                    fontSize: '14px'
                }
            },
            labels: {
                // Formatting for Y-axis labels to match the style if needed,
                // but keeping default for now as the image's Y-axis labels are unusual.
                formatter: function (this: Highcharts.AxisLabelsFormatterContextObject) {
                    if (typeof this.value === 'number') {
                        return '$' + Highcharts.numberFormat(this.value, 0, '.', ',');
                    }
                    return '$0';
                },
                style: {
                    color: '#333'
                }
            },
            gridLineColor: '#e6e6e6', // Lighter grid lines
            tickAmount: 5 // Adjust as needed to get desired tick density
        },
        tooltip: {
            valuePrefix: '$',
            pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>${point.y:,.2f}</b><br/>'
        },
        plotOptions: {

            column: {

                pointPadding: 0.1,
                groupPadding: 0.2,
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    style: {
                        color: '#333',
                        textOutline: 'none',
                        fontWeight: 'normal'
                    },
                    format: '${point.y:,.2f}', // Added '$' sign and 2 decimal places with comma
                    y: -5 // Adjust vertical position of data labels
                },
                color: '#007BFF' // Blue color as in the image
            }
        },
        series: [{
            name: 'Daily Payment', // Updated series name as per image
            data: chartData.map(item => item.y),
            showInLegend: true,
            marker: {
                enabled: false // No markers on column chart
            },
            tooltip: {
                valuePrefix: '$' // Added '$' sign to tooltip for series
            }
        }],
        legend: {
            enabled: true,
            align: 'center',
            verticalAlign: 'bottom',
            layout: 'horizontal',
            itemStyle: {
                color: '#333'
            }
        },
        credits: {
            enabled: false // Disable Highcharts.com credits
        }
    };

    return (
        <div className='lg:col-span-3 md:col-span-2 col-span-1 p-4 bg-white rounded-md'>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
};

export default DailyPayments;