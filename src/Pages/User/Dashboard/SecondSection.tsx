import { Card, Container } from "@mui/material";
import { Header1 } from "../../../Components/Common/HeaderText";
import LineAndBarChart from "../../../Components/Charts/LineAndBarChart";
import { ApexOptions } from "apexcharts";
import LoadingBar from "../../../Components/Headers/LoadingBar";

const SecondSection = ({ data }: any) => {
  const series = [
    {
      name: "Marks",
      type: "column",
      data: data?.data?.performance?.total_marks,
    },
    {
      name: "Percentage",
      type: "line",
      data: data?.data?.performance?.percentage,
    },
  ];

  const options: ApexOptions = {
    chart: {
      height: 350,
      type: "line",
    },
    stroke: {
      width: [0, 4],
    },
    // title: {
    //   text: "Traffic Sources",
    // },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [1],
    },
    labels: data?.data?.performance?.set_name,
    // xaxis: {
    //   type: "numeric",
    // },
    yaxis: [
      {
        title: {
          text: "Marks",
        },
      },
      {
        opposite: true,
        title: {
          text: "Percentage",
        },
      },
    ],
    // plotOptions:{
    //   bar:{
    //     columnWidth:'50%'
    //   }
    // }
  };

  console.log("lineand bar", data?.data?.performance);

  if (data.isLoading) {
    return <LoadingBar />;
  }
  return (
    <Container maxWidth="xl" sx={{ my: "50px" }}>
      <Header1 header="PERFORMANCE ANALYSIS" />
      <Card
        sx={{
          height: "320px",
          boxShadow: "5px 5px 20px 0px #808080",
          my: "15px",
        }}
      >
        <LineAndBarChart series={series} options={options} />
      </Card>
    </Container>
  );
};

export default SecondSection;
