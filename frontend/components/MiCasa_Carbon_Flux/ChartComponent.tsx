// frontend/src/components/ChartComponent.tsx
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface Stat {
  datetime: string;
  max: number;
}

interface Props {
  data: Stat[];
}

const ChartComponent: React.FC<Props> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="datetime" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="max" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ChartComponent;
