// src/PropertyStatusPieChart.tsx
import React, { useMemo } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import type { Property } from '../../../types/property';



const PropertyStatusPieChart = ({ properties }: { properties: Property[] }) => {
  const statusData = useMemo(() => {
    const counts = { leased: 0, vacant: 0, rented: 0, owned: 0 };
    properties.forEach(property => {
      switch (property.property_status) {
        case 'Leased': counts.leased++; break;
        case 'Vacant': counts.vacant++; break;
        case 'Rented': counts.rented++; break;
        case 'Owned': counts.owned++; break;
      }
    });
    return [
      { name: 'Leased', y: counts.leased, color: '#279dfd' },
      { name: 'Owned', y: counts.owned, color: '#3ae05f' },
      { name: 'Rented', y: counts.rented, color: '#f55229' },
      { name: 'Vacant', y: counts.vacant, color: '#4237b8' }
    ];
  }, [properties]);
  

  const options: Highcharts.Options = {
    chart: {
      type: 'pie',
      backgroundColor: '#ffffff',
    },
    title: {
      text: 'Property Status',
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
    series: [
      {
        name: 'Properties',
        type: 'pie',
        data: statusData
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
    <div className='p-4 bg-white rounded-md w-full'>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default PropertyStatusPieChart;