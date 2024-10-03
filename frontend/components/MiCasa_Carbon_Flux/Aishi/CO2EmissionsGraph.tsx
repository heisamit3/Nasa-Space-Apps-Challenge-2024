import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, Tooltip, Legend);

interface StatisticsB1 {
  mean: number;
  max: number;
  min: number;
  median: number;
}

interface DataPoint {
  statistics: {
    b1: StatisticsB1;
  };
  datetime: string;
  date: string;
}

interface CO2EmissionsGraphProps {
  data: DataPoint[];
}

const CO2EmissionsGraph: React.FC<CO2EmissionsGraphProps> = ({ data }) => {
  console.log(data);

  const processedData = data.map(item => ({
    date: new Date(item.date).toLocaleDateString(),
    mean: item.statistics.b1.mean,
    max: item.statistics.b1.max,
    min: item.statistics.b1.min,
    median: item.statistics.b1.median,
  }));

  const chartData = {
    labels: processedData.map(item => item.date),
    datasets: [
      {
        label: 'Mean',
        data: processedData.map(item => item.mean),
        borderColor: '#8884d8',
        fill: false,
      },
      {
        label: 'Max',
        data: processedData.map(item => item.max),
        borderColor: '#82ca9d',
        fill: false,
      },
      {
        label: 'Min',
        data: processedData.map(item => item.min),
        borderColor: '#ff7300',
        fill: false,
      },
      {
        label: 'Median',
        data: processedData.map(item => item.median),
        borderColor: '#0088FE',
        fill: false,
      },
    ],
  };

  return (
    <div className="w-full h-[500px] bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">CH₄ Emissions Data</h2>
      <Line data={chartData} />
    </div>
  );
};

export default CO2EmissionsGraph;
