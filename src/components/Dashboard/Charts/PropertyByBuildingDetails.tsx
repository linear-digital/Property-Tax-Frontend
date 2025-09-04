/* eslint-disable @typescript-eslint/no-explicit-any */
// src/PropertyStatusPieChart.tsx
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';


const PropertyByBuildingDetails = ({ properties }: { properties: any }) => {
    const propertyuildingDetails = properties?.building || [];
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
                    format: '<p>{point.name}</p>',
                    distance: 20,
                    style: {
                        color: '{point.color}',
                        fontSize: '10px',
                        fontWeight: 'normal',
                        textOutline: 'none'
                    }
                },
                showInLegend: false
            }
        },
        series: [
            {
                name: 'Status',
                type: 'pie',
                data: propertyuildingDetails
            }
        ],
    };

    return (
        <div className='p-4 bg-white rounded-md'>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
};

export default PropertyByBuildingDetails;