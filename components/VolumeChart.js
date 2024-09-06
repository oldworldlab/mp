import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function VolumeChart({ data }) {
  if (!data || !data.length) {
    return <div>No volume data available</div>; // Return an appropriate message or an empty chart
  }

  const labels = data.map((entry) => entry.date);
  const datasets = [
    {
      label: 'Wood',
      data: data.map((entry) => entry.wood),
      borderColor: 'rgba(75,192,192,1)',
      fill: false,
    },
    {
      label: 'Ore',
      data: data.map((entry) => entry.ore),
      borderColor: 'rgba(153,102,255,1)',
      fill: false,
    },
    {
      label: 'Cloth',
      data: data.map((entry) => entry.cloth),
      borderColor: 'rgba(255,159,64,1)',
      fill: false,
    },
    {
      label: 'Leather',
      data: data.map((entry) => entry.leather),
      borderColor: 'rgba(255,99,132,1)',
      fill: false,
    },
    {
      label: 'Potion Ingredients',
      data: data.map((entry) => entry.potionIngredients),
      borderColor: 'rgba(54,162,235,1)',
      fill: false,
    },
    {
      label: 'Artifacts',
      data: data.map((entry) => entry.artifacts),
      borderColor: 'rgba(255,206,86,1)',
      fill: false,
    },
  ];

  const chartData = {
    labels,
    datasets,
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Marketplace Volume Over Time',
      },
    },
    scales: {
      x: {
        type: 'category',
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ height: '200px', width: '100%' }}>
      <Line data={chartData} options={options} />
    </div>
  );
}

export default VolumeChart;
