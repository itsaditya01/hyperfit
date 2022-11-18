import { Line } from "react-chartjs-2";
import data from "./data.json";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { useRef } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const ChartComponent = () => {
  const chartRef = useRef(null);

  const label = data.data.map((val) => val.date);
  const dataset = data.data.map((val) => {
    return parseInt(val.weight) + 30;
  });
  let gradient = null;
  const chartData = () => {
    const result = {
      labels: label,
      datasets: [
        {
          data: dataset,
          borderColor: "purple",
          borderWidth: 4,
          lineTension: 0.4,
          pointRadius: 0,
          fill: true,
          backgroundColor: "rgb(128, 0, 128, 0.1)",
        },
      ],
    };
    return result;
  };
  const option = {
    tooltips: false,
    // responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 3,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        min: 0,
        max: 150,
        beginAtZero: true,
        ticks: {
          color: "white",
          stepSize: 50,
          font: {
            size: 16,
          },
          crossAlign: "center",
        },
      },
      x: {
        // grid: {
        //   color: "rgba(255, 255, 255, 0.35)",
        // },
        ticks: {
          crossAlign: "near",
          color: "white",
          maxRotation: 0,
          minRotation: 0,
          font: {
            size: 16,
          },
        },
      },
    },
  };
  return (
    <div className="chartdiv" style={{ width: "100%", height: 250 }}>
      <Line ref={chartRef} data={chartData()} options={option} />
    </div>
  );
};

export default ChartComponent;
