// src/PropertyStatusPieChart.tsx
import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';


const PropertyByBuildingDetails: React.FC = () => {
    const options: Highcharts.Options = {
        chart: {
            type: 'pie',
            backgroundColor: '#ffffff',
        },
        title: {
            text: 'Property by Building Details',
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
                        const percentageStyle = 'color: #EEEEEE; font-size: 12px;';

                        if (["Stores", "Villas", "Tin"].includes(name)) {
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
        colors: ['#00E272', '#2CAFFE', '#544FC5',],
        series: [
            {
                name: 'Status',
                type: 'pie',
                data: [
                    { name: 'Stores', y: 2 },
                    { name: 'Villas', y: 28 },
                    { name: 'Tin', y: 70 },
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

export default PropertyByBuildingDetails;