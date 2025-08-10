/* eslint-disable @typescript-eslint/no-explicit-any */
// src/PropertyStatusPieChart.tsx
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';


const PropertyByType = ({ properties }: { properties: any }) => {
    const propertyTypes = properties?.types || [];

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
            pointFormat: '<b>{point.y} ({point.percentage:.1f}%)</b>'
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
                    format: '<b>{point.name}</b>',
                    distance: 20,
                    style: {
                        color: 'black',
                        fontSize: '14px',
                        fontWeight: 'normal',
                        textOutline: 'none'
                    }
                },
                showInLegend: false
            }
        },
        colors: ['#5976ae', '#f55229', '#279dfd', '#4237b8', '#3ae05f'],
        series: [
            {
                name: 'Status',
                type: 'pie',
                data: propertyTypes
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