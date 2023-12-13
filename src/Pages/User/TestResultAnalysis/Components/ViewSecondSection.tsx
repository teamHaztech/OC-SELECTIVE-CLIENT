import { Stack, Card, Divider, Box } from "@mui/material";

import { ParaText3 } from "../../../../Components/Common/ParaText";
import PieChart from "../../../../Components/Charts/PieChart";
import { useState } from "react";
import LoadingBar from "../../../../Components/Headers/LoadingBar";
const ViewSecondSection = ({ data }: any) => {
  if (data.isLoading) {
    return <LoadingBar />;
  }

  const [questionDistribution, setQuestionDistribution] = useState<any>({
    series: Object.values(data?.data?.question_distribution),
    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      labels: [
        "Correct Questions",
        "Wrong Questions",
        "Not Attempted Questions",
      ],

      colors: ["#3A9BDC", "#E84141", "#FA8128"],

      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });

  const [marksDistribution, setMarksDistribution] = useState<any>({
    series: Object.values(data?.data?.marks_distribution),
    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      labels: [
        "Correct Questions",
        "Wrong Questions",
        "Not Attempted Questions",
      ],

      colors: ["#3A9BDC", "#E84141", "#FA8128"],

      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });

  return (
    <Stack
      direction="row"
      justifyContent={"space-between"}
      useFlexGap
      flexWrap="wrap"
      rowGap={4}
      margin="auto"
      width={"100%"}
    >
      <Card
        sx={{
          boxShadow: "6px 6px 20px 0px #808080",
          // my: "15px",
          width: { lg: "47%", md: "400px", sm: "400px", xs: "360px" },
          // height: { lg: "auto", md: "286px", sm: "286px", xs: "286px" },
          p: "14px",
          // pl: "14px",
        }}
      >
        <ParaText3 text="Questions Distribution" />
        <Divider
          sx={{
            borderColor: "#FA8128",
            borderWidth: "3px",
            borderRadius: "3px",
            width: "182px",
          }}
        />
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <PieChart pieData={questionDistribution} />
        </Box>
      </Card>

      <Card
        sx={{
          boxShadow: "6px 6px 20px 0px #808080",
          // my: "15px",
          width: { lg: "47%", md: "400px", sm: "400px", xs: "360px" },
          height: { lg: "auto", md: "286px", sm: "286px", xs: "286px" },
          p: "14px",
        }}
      >
        <ParaText3 text="Marks Distribution" />
        <Divider
          sx={{
            borderColor: "#FA8128",
            borderWidth: "3px",
            borderRadius: "3px",
            width: "152px",
          }}
        />
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <PieChart pieData={marksDistribution} />
        </Box>
      </Card>
    </Stack>
  );
};

export default ViewSecondSection;
