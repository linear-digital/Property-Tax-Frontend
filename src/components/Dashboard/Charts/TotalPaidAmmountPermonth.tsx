// src/PropertyStatusPieChart.tsx
import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { fetcher } from '../../../util/axios.instance';
import { useQuery } from '@tanstack/react-query';


const PropertyByType = ({ dates }: { dates: { year: number, month: number } }) => {
  const { data } = useQuery({
    queryKey: ['monthly payments', dates],
    queryFn: async () => {
      return await fetcher({
        path: '/invoice/permonth-statistics',
      })
    },
  })
  const [chartData, setChartData] = useState([
    { name: 'Jan', y: 5645.00 },
    { name: 'Feb', y: 6662.00 },
    { name: 'Mar', y: 35098.00 },
    { name: 'Apr', y: 14965.00 },
    { name: 'May', y: 26167.00 },
    { name: 'Jun', y: 16158.00 },
    { name: 'Jul', y: 16645.00 },
    { name: 'Aug', y: 0.00 },
    { name: 'Sep', y: 0.00 },
    { name: 'Oct', y: 0.00 },
    { name: 'Nov', y: 0.00 },
    { name: 'Dec', y: 0.00 }
  ]);
  useEffect(() => {
    if (data) {
      setChartData(data);
    }
  }, [data]);

  const options = {
    // ... your chart options ...
    chart: {
      type: 'column',
      backgroundColor: '#ffffff',
      style: {
        fontFamily: 'Arial, sans-serif',
      }
    },
    title: {
      text: 'Total Amount Paid per Month (2025)',
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
        text: 'Month',
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
        style: {
          color: '#333'
        }
      },
      gridLineColor: '#333',
      tickAmount: 5
    },
    tooltip: {
      valuePrefix: '$'
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          style: {
            color: '#333',
            textOutline: 'none',
            fontWeight: 'normal'
          },
          format: '${point.y:,.2f}' // Added '$' sign
        },
        color: '#007BFF'
      }
    },
    series: [{
      name: 'Total Amount Paid',
      data: chartData.map(item => item.y),
      showInLegend: true,
      marker: {
        enabled: true
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
  };

  return (
    <div className='lg:col-span-3 md:col-span-2 col-span-1 p-4 bg-white rounded-md'>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default PropertyByType;