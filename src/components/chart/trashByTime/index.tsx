import React, {useState, useEffect} from 'react';
import useSWR from "swr";
import { getData } from '@/api';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { setDatasets } from 'react-chartjs-2/dist/utils';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
};
 
const TrashByTime = (props:any) => {
  const [data, setData] = useState<ChartData<'line'>>({
    labels: [],
    datasets: []
  })

  useEffect(() => {
    if(!props.TrashCollected.isLoading && !props.CollectionPoints.isLoading){
      const labels:string[] = [];
      const theMonths = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
      const now = new Date();
      const monthSort:number[] = []
      const yearSort:number[] = []


      for (let i = 0; i < 12; i++) {
        const future = new Date(now.getFullYear(), now.getMonth() + i, 1);
        const month = theMonths[future.getMonth()];
        const year = future.getFullYear() - 1;
        labels.push(`${month}/${year}`)
        monthSort.push(future.getMonth())
        yearSort.push(year)
      }

      const dataset = props.CollectionPoints.data.map((point:any) => {
        const trashCollected = props.TrashCollected.data.filter((trash:any) => point._id == trash.collection_point_id)
        const data = monthSort.map((month:number, index:number) => {
          return trashCollected.reduce((acc:number, curr:any) => {
            const date = new Date(parseInt(curr.date) * 1000)
            if(date.getMonth() == month && date.getFullYear() == yearSort[index]){
              return curr.weight + acc
            }else{
              return acc
            }
          }, 0)
        })

        return {
          label: point.address,
          data,
        }
      })

      const data = {
        labels,
        datasets: dataset,
      };

      setData(data)
    }
  }, [])

  return (
    <Line options={options} data={data} />
  )
}

export default TrashByTime