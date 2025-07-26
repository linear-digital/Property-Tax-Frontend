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
      text: 'Property Status',
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

            if (['Owned', 'Rented', 'Vacant', 'Leased'].includes(name)) {
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
    colors: ['#279dfd', '#3ae05f', '#f55229', '#4237b8'],
    series: [
      {
        name: 'Status',
        type: 'pie',
        data: [
          { name: 'Rented', y: 25 },
          { name: 'Owned', y: 70 },
          { name: 'Leased', y: 4 },
          { name: 'Vacant', y: 1 }
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