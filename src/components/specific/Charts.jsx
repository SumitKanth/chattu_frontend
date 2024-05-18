import React from "react";
import { Line, Doughnut } from "react-chartjs-2";
import {
  CategoryScale,
  Chart as ChartJS,
  Tooltip,
  Filler,
  LinearScale,
  PointElement,
  ArcElement,
  Legend,
  LineElement,
  scales,
  plugins
} from "chart.js";
import { lightPurple, orange, orangeLight, purple } from "../../constants/color";
import { getLast7Days } from "../../lib/features";

ChartJS.register(
  CategoryScale,
  Tooltip,
  Filler,
  LinearScale,
  PointElement,
  ArcElement,
  Legend,
  LineElement
);

const lineChartOptions = {
    Response: true,
    plugins: {
        legend: {
            display: false,

        },
        title: {
            display: false
        },
    },

    scales: {
        x:{
            grid: {
                display: false,
            }
        },
        y:{
            beginAtZero: true,
            grid:{
                display: false
            }
        }
    }
};

const labels = getLast7Days()


const LineChart = ({value = []}) => {
  const data = {
    labels,

    datasets:[ 
    {
        data: value,
        label: "Messages",
        fill: true,
        backgroundColor: lightPurple,
        borderColor: purple,
    },
],
  };

  return <Line data={data} options={lineChartOptions} />;
};

const DoughnutChartOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
    },
    cutout: 120
};

const DoughnutChart = ({value = [], labels = []}) => {
    const data = {
        labels,
    
        datasets:[ 
        {
            data: value,
            backgroundColor: [lightPurple, orangeLight],
            borderColor: [purple, orange],
            hoverBackgroundColor: [purple, orange],
            offset: 40,
        },
    ],
      };
  return <Doughnut style={{zIndex: 10}} data={data} options={DoughnutChartOptions}/>;
};

export { LineChart, DoughnutChart };
