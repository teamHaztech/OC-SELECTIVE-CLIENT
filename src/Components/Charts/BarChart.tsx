import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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

const BarChart = ({ barData }: any) => {
  return <Bar data={barData} />;
};

export default BarChart;
