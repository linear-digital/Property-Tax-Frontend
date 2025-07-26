// src/PropertyStatusPieChart.tsx
import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';


const DailyPayments: React.FC = () => {
    // Data approximated from the provided image
    const chartData = [
        { name: '1', y: 14142.00 },
        { name: '2', y: 200.00 },   // Very small bar in image
        { name: '3', y: 8210.00 },
        { name: '4', y: 8200.00 },
        { name: '5', y: 8305.00 },
        { name: '6', y: 8100.00 },
        { name: '7', y: 8180.00 },
        { name: '8', y: 100.00 },   // Very small or zero in image
        { name: '9', y: 4000.00 },
        { name: '10', y: 2000.00 },
        { name: '11', y: 100.00 },  // Very small or zero in image
        { name: '12', y: 200.00 },  // Very small or zero in image
        { name: '13', y: 7210.00 },
        { name: '14', y: 8201.00 },
        { name: '15', y: 8351.00 }, // Appears to be highest
        { name: '16', y: 8210.00 },
        { name: '17', y: 8200.00 },
        { name: '18', y: 9563.00 },
        { name: '19', y: 8200.00 },
        { name: '20', y: 8100.00 },
        { name: '21', y: 8400.00 },
        { name: '22', y: 8301.00 },
        { name: '23', y: 8200.00 },
        { name: '24', y: 8100.00 },
        { name: '25', y: 8100.00 },
        { name: '26', y: 100.00 }, // Smaller bars towards end
        { name: '27', y: 100.00 },
        { name: '28', y: 100.00 },
        { name: '29', y: 100.00 },
        { name: '30', y: 0.00 }, // Assuming 0 for days not clearly visible/with small bars
        { name: '31', y: 0.00 }
    ];

    const options = {
        chart: {
            type: 'column',
            backgroundColor: '#ffffff', // White background as in the image
            style: {
                fontFamily: 'Arial, sans-serif',
            }
        },
        title: {
            text: 'Daily Payments for July 2025', // Updated title as per image
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
                formatter: function () {
                    return '$' + Highcharts.numberFormat(this.value, 0, '.', ','); // Format with $ and comma
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

                pointPadding: 0,
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
        <div className='col-span-3 p-4 bg-white rounded-md'>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
};

export default DailyPayments;