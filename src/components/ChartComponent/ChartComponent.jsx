import { Line } from "react-chartjs-2";
import "./ChartComponent.css";
import data from "./data.json";
import { UserContext } from "../Context/UserState";
import { useContext } from "react";

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

const ChartComponent = ({ weight }) => {
  const chartRef = useRef(null);
  // const context = useContext(UserContext);
  // const { weight } = context;
  console.log(weight[0]);

  const label = weight.map((val) => val.date.substr(8, 2));
  const dataset = weight.map((val) => {
    return parseInt(val.weightValue);
  });
  let gradient = null;
  const chartData = () => {
    const result = {
      labels: label,
      datasets: [
        {
          data: dataset,
          borderColor: "#3352E7",
          borderWidth: 4,
          lineTension: 0.4,
          pointRadius: 0,
          fill: true,
          backgroundColor: "rgb(51, 82, 231, 0.1)",
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
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        min: 0,
        max: 150,
        beginAtZero: true,
        // ticks: {
        //   color: "white",
        //   stepSize: 50,
        //   font: {
        //     size: 16,
        //   },
        //   crossAlign: "center",
        // },
      },
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
    },
  };
  return (
    <div className="chartdiv df" style={{ width: 300, height: "max-content" }}>
      <Line ref={chartRef} data={chartData()} options={option} />
    </div>
  );
};

export default ChartComponent;
