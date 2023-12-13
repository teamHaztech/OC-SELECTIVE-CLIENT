// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import { Pie } from "react-chartjs-2";
// import type { ChartData, ChartOptions } from "chart.js";
import { useState } from "react";
import ReactApexChart from "react-apexcharts";
// ChartJS.register(ArcElement, Tooltip, Legend);

// interface PieProps {
//   options: any;
//   pieData: any;
// }
// const options: any = {
//   plugins: {
//     legend: {
//       display: true,
//       position: "right",
//       width: 200,
//       height: 200,
//       // maxHeight: 1,
//       labels: {
//         padding: 20,
//       },
//     },
//   },
// };

// const options: any = {
//   chart: {
//     width: 380,
//     type: "pie",
//   },
//   labels: ["Right Questions", "Left Questions", "Negative Questions"],

//   colors: ["#3A9BDC", "#FA8128", "#E84141"],

//   responsive: [
//     {
//       breakpoint: 480,
//       options: {
//         chart: {
//           width: 200,
//         },
//         legend: {
//           position: "bottom",
//         },
//       },
//     },
//   ],
// };

// const series = [12, 19, 3];
// const PieChart = () => {
const PieChart = ({ pieData }: any) => {
  return (
    <ReactApexChart
      options={pieData.options}
      series={pieData.series}
      type="pie"
      width={400}
    />
  );
  //  <Pie data={pieData} options={options} />;
};

export default PieChart;
