import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

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
      display: false,
    },
    
  },

  scale: {
    y: {
      min: 20,
      max: 26,
    },
  },
};

const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

export const data = {
  labels,
  datasets: [
    {
      lineTension: 0.35,
      data: [22, 21, 23, 22, 22, 23],
      borderColor: "#52AC0B",
      pointRadius: 0,
    },
  ],
};

const LineGraph = () => {
  return (
    <div style={{ width: "80%" }}>
      <Line options={options} data={data} />
    </div>
  );
};
export default LineGraph;
