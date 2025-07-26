// src/PropertyStatusPieChart.tsx
import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';


const PropertyByType: React.FC = () => {
    const options: Highcharts.Options = {
        chart: {
            type: 'pie',
            backgroundColor: '#ffffff',
        },
        title: {
            text: 'Property By Type',
            align: 'center',
            style: {
                color: '#363636',
                fontSize: '19px',
                fontWeight: "700"
            }
        },
        tooltip: {
            pointFormat: '<b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    useHTML: true,
                    formatter: function (): string | null {
                        const percentage = (this as Highcharts.Point).percentage ?? 0;
                        const name = (this as Highcharts.Point).name ?? '';

                        if (percentage < 1 && name !== 'Leased' && name !== 'Vacant') {
                            return null;
                        }

                        const labelStyle = 'color: black; font-size: 14px; font-weight: regular;';
                        const percentageStyle = 'color: #000000; font-size: 12px;';

                        if (['Agricultural', 'Other', 'Commercial', 'Residential', 'Mixed Use'].includes(name)) {
                            return `<span style="${labelStyle}">${name}</span>`;
                        }

                        return `<span style="${percentageStyle}">${Highcharts.numberFormat(percentage, 1)}%</span>`;
                    },
                    distance: 20,
                    style: {
                        color: 'black',
                        textOutline: 'none'
                    }
                    // connectorColor is removed to let it inherit from point color
                },
                showInLegend: false
            }
        },
        colors: ['#5976ae', '#f55229', '#279dfd', '#4237b8', '#3ae05f'],
        series: [
            {
                name: 'Status',
                type: 'pie',
                data: [
                    { name: 'Agricultural', y: 5 },
                    { name: 'Other', y: 5 },
                    { name: 'Commercial', y: 25 },
                    { name: 'Residential', y: 65 },
                    { name: 'Mixed Use', y: 6 },
                ]
            }
        ],
        responsive: {
            rules: [
                {
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        plotOptions: {
                            pie: {
                                dataLabels: {
                                    distance: 10,
                                    style: {
                                        fontSize: '10px'
                                    }
                                }
                            }
                        }
                    }
                }
            ]
        }
    };

    return (
        <div className='p-4 bg-white rounded-md'>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
};

export default PropertyByType;