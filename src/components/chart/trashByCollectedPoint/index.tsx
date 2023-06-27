import React, {useState, useEffect} from 'react';
import useSWR from "swr";
import { getData } from '@/api';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    tooltip: {
        enabled: true,
        callbacks: {
            label: (context) => {
                const label = context.dataset.label || '';
                const value = context.parsed.y || 0;
                return `${label}: ${value} T`;
            },
        },
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Collect Point',
      },
    },
    y: {
      title: {
        display: true,
        text: 'Amount Collected (T)',
      },
      ticks: {
        beginAtZero: true,
      },
    },
  },
};

const TrashByCollectedPoint = (props:any) => {
  const [chartData, setChartData] = useState<ChartData<'bar'>>({
    labels: [],
    datasets: [
      {
        label: 'Collected',
        data: [],
        backgroundColor: ['rgba(104, 205, 159, 1)'],
        borderColor: ['rgba(104, 205, 159, 1)'],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    if(!props.CollectionPoints.isLoading && !props.TrashCollected.isLoading){
      let labels: string[] = []
      let datas: number[] = []

      props.CollectionPoints.data.forEach((item:any) => {
        labels.push(item.address)
        const amount = props.TrashCollected.data.reduce((acc: number, curr: Trash) => {
          if(item._id !== curr.collection_point_id){
            return acc
          }else{
            return acc + curr.weight
          } 
        }, 0)

        datas.push(amount / 1000)
      })
      
      const chartData = {
        labels,
        datasets: [
          {
            label: 'Collected',
            data: datas,
            backgroundColor: ['rgba(104, 205, 159, 1)'],
            borderColor: ['rgba(104, 205, 159, 1)'],
            borderWidth: 1,
          },
        ],
      };

      setChartData(chartData);
    }
  }, []);
    
  return (
    <Bar options={options} data={chartData} />
  );
}

export default TrashByCollectedPoint