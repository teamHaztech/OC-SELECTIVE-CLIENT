import { Box, Card, Divider } from "@mui/material";

import { ParaText3 } from "../../../../Components/Common/ParaText";
import BarChart from "../../../../Components/Charts/BarChart";
import { relative } from "path";
import LoadingBar from "../../../../Components/Headers/LoadingBar";
import { useState } from "react";
import LineChart from "../../../../Components/Charts/LineChart";
const ViewFourthSection = ({ data }: any) => {
  if (data.isLoading) {
    return <LoadingBar />;
  }

  const [lineData, setLineData] = useState({
    labels: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
    ],
    datasets: [
      {
        label: "Seconds",
        data: data.data?.question_time,
        backgroundColor: "#3A9BDC",
      },
    ],
  });

  // const [barData, setBarData] = useState({
  //   labels: [
  //     "SOTT Reading Test 1",
  //     "SOTT Math Test 1",
  //     "SOTT Thinking Skills Test 1",
  //     "SOTT  Skills Test 2",
  //   ],
  //   datasets: [
  //     {
  //       label: "Marks",
  //       data: [20, 22, 17, 15],
  //       backgroundColor: "#FA8128",
  //     },
  //   ],
  // });
  return (
    <Card
      sx={{
        boxShadow: "6px 6px 20px 0px #808080",
        my: "15px",
        width: { lg: "800px", md: "800px", sm: "800px", xs: "360px" },
        height: { lg: "auto", md: "286px", sm: "286px", xs: "286px" },
        p: "14px",
      }}
    >
      <ParaText3 text="Performance Analysis" />
      <Divider
        sx={{
          borderColor: "#FA8128",
          borderWidth: "3px",
          borderRadius: "3px",
          width: "185px",
        }}
      />
      <Box>
        <LineChart lineData={lineData} />
        {/* <BarChart lineData={lineData} /> */}
      </Box>
    </Card>
  );
};

export default ViewFourthSection;
