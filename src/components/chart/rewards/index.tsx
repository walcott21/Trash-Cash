import React, {useState, useEffect} from 'react';
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
import useSWR from "swr";
import { getData } from '@/api';
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
                return `${label}: ${value} K`;
            },
        },
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Items',
      },
    },
    y: {
      title: {
        display: true,
        text: 'Rewards (K)',
      },
      ticks: {
        beginAtZero: true,
      },
    },
  },
};

const Rewards = () => {
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
  const {data, error, isLoading } = useSWR(`/rewards/read`, getData)

  useEffect(() => {
    if(!isLoading){
      let labels: string[] = []
      let datas: number[] = []

      data.forEach((item:Reward) => {
        labels.push(item.name)
        datas.push(item.claims.length)
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
  }, [isLoading]);
    
  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  return (
    <Bar options={options} data={chartData} />
  );
}

export default Rewards