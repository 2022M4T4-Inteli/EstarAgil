/** @format */
import React, { useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement);

let count = 1;
const PillChartGradientFill = {
  id: "custom_canvas_gradient",
  // afterRender: (chart: any) => {
  //   count++;
  //   console.log(count);
  //   if (chart.config.options.stackedGradientPlugin) {
  //     for (var i = 0; i < chart.config.data.datasets.length; i++) {
  //       var dsMeta = chart.getDatasetMeta(i);
  //       var dataset = chart.config.data.datasets[i];
  //       const color = Object.values(CHART_COLORS)[i];
  //       var darker = colord(color).darken(0.1).toHex();
  //       var lighter = colord(color).lighten(0.1).toHex();

  //       for (var j = 0; j < dataset.data.length; j++) {
  //         var x = dsMeta.data[j].x;
  //         var base = dsMeta.data[j].base;
  //         const gradient = chart.ctx.createLinearGradient(base, 0, x, 0);
  //         gradient.addColorStop(0, lighter);
  //         gradient.addColorStop(1, darker);
  //         dataset.backgroundColor[j] = gradient;
  //       }
  //     }
  //   }
  //   // chart.update();
  // }
};

ChartJS.register(PillChartGradientFill);

const borderRadius = 5;
const borderRadiusAllCorners = {
  topLeft: borderRadius,
  topRight: borderRadius,
  bottomLeft: borderRadius,
  bottomRight: borderRadius,
};

const StackedBarChart = () => {
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

  let chartRef = useRef<ChartJS>(null);

  const options: any = {
    stackedGradientPlugin: true,
    plugins: {
      stacked100: { enable: true },

      legend: {
        display: false,
      },
    },
    gridLines: {
      showBorder: false,
      drawBorder: false,
      drawOnChartArea: false,
      color: "rgba(255,255,255,0.1)",
    },
    responsive: true,
    // maxBarThickness: 12,
    categoryPercentage: 0.2,
    barPercentage: 1,

    scales: {
      x: {
        stacked: true,
        max: 100,
        grid: {
          display: false,
        },
        legend: {
          display: false,
        },
        title: {
          display: false,
        },
        ticks: {
          display: true,
        },
      },
      y: {
        stacked: true,
        max: 100,

        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        title: {
          display: false,
        },
        ticks: {
          lines: false,
          display: false,
        },
      },
    },
  };

  const labels = [
    "20/10",
    "21/10",
    "22/10",
    "23/10",
    "24/10",
    "25/10",
    "26/10",
  ];

  ChartJS.defaults.datasets.bar.borderWidth = 1;
  ChartJS.defaults.datasets.bar.hoverBorderWidth = 0;
  ChartJS.defaults.borderColor = "#fff";

  let datasets = [
    {
      // label: "New",
      data: [30, 30, 40, 30, 60, 35, 25],
      borderColor: "#fff",
      backgroundColor: ["#70D44B", "#70D44B", "#70D44B", "#70D44B"],
      hoverBorderColor: "#fff",
      borderRadius: borderRadiusAllCorners,
      borderSkipped: false as const,
      type: "bar" as const,
    },
    {
      // label: "Até 30 metros",
      data: labels.map(() => 20),
      borderColor: "#fff",
      backgroundColor: ["#24272A", "#24272A", "#24272A", "#24272A"],
      hoverBorderColor: "#fff",
      borderRadius: borderRadiusAllCorners,
      borderSkipped: false as const,
      type: "bar" as const,
    },
    {
      // label: "Delivered",
      data: labels.map(() => 10),
      borderColor: "#fff",
      backgroundColor: ["#74E0C1", "#74E0C1", "#74E0C1", "#74E0C1"],
      hoverBorderColor: "#fff",
      borderRadius: borderRadiusAllCorners,
      borderSkipped: false as const,
      type: "bar" as const,
    },
    {
      // label: "Rejected",
      data: labels.map(() => 40),
      borderColor: "#fff",
      backgroundColor: ["#CAD6E2", "#CAD6E2", "#CAD6E2", "#CAD6E2"],
      hoverBorderColor: "#fff",
      borderRadius: borderRadiusAllCorners,
      borderSkipped: false as const,
      type: "bar" as const,
    },
  ];

  let data = {
    labels,
    datasets,
    plugins: [PillChartGradientFill],
  };

  return <Bar options={options} data={data} />;
};

export default StackedBarChart;
