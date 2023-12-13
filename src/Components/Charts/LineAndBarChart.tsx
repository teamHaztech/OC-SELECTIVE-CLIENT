import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const LineAndBarChart = ({ options, series }: any) => {
  return (
    <>
      <Chart
        options={options}
        series={series}
        type="line"
        // width={300}
        height={300}
      />
    </>
  );
};

export default LineAndBarChart;
