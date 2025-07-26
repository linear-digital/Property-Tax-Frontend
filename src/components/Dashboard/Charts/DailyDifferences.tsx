/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/Dashboard/Charts/DailyDifferences.tsx
import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface DailyDifferencesProps {
    dailyPaymentsData?: number[];
    dailyDiscountsData?: number[];
}

const DailyDifferences: React.FC<DailyDifferencesProps> = React.memo(
    ({ dailyPaymentsData = [], dailyDiscountsData = [] }) => {
        if (
            !Array.isArray(dailyPaymentsData) ||
            !Array.isArray(dailyDiscountsData) ||
            dailyPaymentsData.length === 0 ||
            dailyDiscountsData.length === 0
        ) {
            return (
                <div className="col-span-3 p-4 text-center text-gray-500">
                    No data available to display the chart.
                </div>
            );
        }

        const categories = Array.from({ length: 31 }, (_, i) => (i + 1).toString());

        const getChartOptions = (): Highcharts.Options => ({
            chart: {
                backgroundColor: '#ffff', // Dark background from image
                plotBackgroundColor: '#ffff', // Dark plot background from image
                style: {
                    fontFamily: 'Arial, sans-serif',
                    color: '#333'
                },
                type: 'column',
            },
            title: {
                text: 'Daily Payments, Discounts, and Differences for July 2025',
                align: 'center',
                style: {
                    color: '#333', // Light text color for title
                    fontSize: '20px',
                    fontWeight: 'bold'
                }
            },
            xAxis: {
                categories: categories,
                title: {
                    text: 'Day of the Month',
                    style: {
                        color: '#333', // Light text color for x-axis title
                        fontSize: '14px'
                    }
                },
                labels: {
                    style: {
                        color: '#333' // Light text color for x-axis labels
                    }
                },
                lineColor: '#333', // Slightly lighter line color
                tickColor: '#333' // Slightly lighter tick color
            },
            yAxis: {
                min: 0,
                tickInterval: 500,
                title: {
                    text: 'Amount ($)',
                    align: 'high',
                    offset: 0,
                    x: 0,
                    y: -15,
                    rotation: 0,
                    style: {
                        color: '#333', // Light text color for y-axis title
                        fontSize: '14px'
                    }
                },
                labels: {
                    formatter: function () {
                        return '$' + Highcharts.numberFormat(this.value as number, 0, '.', ',');
                    },
                    style: {
                        color: '#333' // Light text color for y-axis labels
                    }
                },
                gridLineColor: '#333' // Darker grid line color
            },
            tooltip: {
                shared: true,
                formatter: function () {
                    let s = `<b>Day ${this.x}</b><br/>`;
                    // Ensure the order matches the image's tooltip: Payments, Discounts, Differences
                    const seriesPoints = this.points?.sort((a, b) => {
                        const order = ['Daily Payments', 'Daily Discounts', 'Daily Differences'];
                        return order.indexOf(a.series.name) - order.indexOf(b.series.name);
                    });

                    seriesPoints?.forEach((point: any) => {
                        const color = point.series.color;
                        s += `<span style="color:${color}">\u25CF</span> ${point.series.name}: <b>$${Highcharts.numberFormat(point.y, 2, '.', ',')}</b><br/>`;
                    });
                    return s;
                },
                backgroundColor: 'rgba(30,30,45,0.85)', // Darker background for tooltip
                borderColor: '#555',
                style: {
                    color: '#F0F0F0'
                }
            },
            plotOptions: {
                column: {
                    stacking: undefined, // no stacking
                    grouping: false,     // disable automatic group separation
                    pointPadding: 0,
                    borderWidth: 0
                },
                line: {
                    marker: {
                        enabled: true,
                        symbol: 'circle',
                        radius: 3, // Slightly smaller radius to match image
                        fillColor: '#FF0000', // Red marker color for line
                        lineColor: '#FF0000', // Border color for marker
                        lineWidth: 1 // Border width for marker
                    },
                    lineWidth: 2,
                    dashStyle: 'ShortDot'
                }
            },
            series: [
                {
                    name: 'Daily Payments',
                    type: "column",
                    data: dailyPaymentsData,
                    color: '#28A745', // Yellow for payments
                    dataLabels: {
                        enabled: true,
                        formatter: function () {

                            return typeof this.y === 'number' && this.y > 0 ? '$' + Highcharts.numberFormat(this.y, 2, '.', ',') : '';
                        },
                        color: 'black', // Black text for data labels
                        y: 0, // Position inside the bar, slightly down
                        style: {
                            fontSize: '11px',
                            textOutline: 'none',
                            fontWeight: 'normal'
                        }
                    }
                },
                {
                    name: 'Daily Discounts',
                    type: 'column', // This is a column series, stacked
                    data: dailyDiscountsData, // Discounts shown as negative for stacking visual
                    color: '#FFC107', // Red for discounts
                    dataLabels: {
                        enabled: true,
                        formatter: function () {
                            // Display absolute value, as it's a discount
                            return typeof this.y === 'number' && this.y > 0 ? '$' + Highcharts.numberFormat(this.y, 2, '.', ',') : '';
                        },
                        color: 'black', // Black text for data labels
                        y: -5, // Position just above the discount bar
                        style: {
                            fontSize: '11px',
                            textOutline: 'none',
                            fontWeight: 'normal'
                        }
                    }
                },
                {
                    name: 'Daily Differences',
                    type: 'line',
                    data: dailyDiscountsData,
                    color: '#DC3545', // Red for differences line
                    dataLabels: {
                        enabled: true,
                        formatter: function () {
                            return typeof this.y === 'number' && this.y > 0 ? '$' + Highcharts.numberFormat(this.y, 2, '.', ',') : '';
                        },
                        color: 'black', // Black text for data labels on the line
                        y: 0, // Position above the line
                        style: {
                            textOutline: 'none',
                            fontWeight: 'bold',
                            fontSize: '11px'
                        }
                    }
                }
            ],
            legend: {
                enabled: true,
                align: 'center',
                verticalAlign: 'bottom',
                layout: 'horizontal',
                itemStyle: {
                    color: '#333' // Light text for legend items
                },
                symbolRadius: 5,
                symbolHeight: 10,
                symbolWidth: 10,
                useHTML: true,
                labelFormatter: function () {
                    // Custom label formatter to match symbol colors in legend
                    let symbolColor = this.color;
                    if (this.name === 'Daily Payments') {
                        symbolColor = '#28A745'; // Yellow symbol
                    } else if (this.name === 'Daily Discounts') {
                        symbolColor = '#FFC107'; // Red symbol
                    } else if (this.name === 'Daily Differences') {
                        symbolColor = '#DC3545'; // Red symbol for the line
                    }
                    return `<span style="color:${symbolColor}">\u25CF</span> ${this.name}`;
                }
            },
        });

        return (
            <div className="col-span-3 p-4 bg-white rounded-md">
                <HighchartsReact highcharts={Highcharts} options={getChartOptions()} />
            </div>
        );
    }
);

export default DailyDifferences;