import React from "react";

interface StatisticsComponentProps {
  stats: { min: number; max: number; mean: number };
}

const StatisticsComponent: React.FC<StatisticsComponentProps> = ({ stats }) => {
  return (
    <div>
      <h3>Zonal Statistics</h3>
      <ul>
        <li>Min: {stats.min}</li>
        <li>Max: {stats.max}</li>
        <li>Mean: {stats.mean}</li>
      </ul>
    </div>
  );
};

export default StatisticsComponent;
