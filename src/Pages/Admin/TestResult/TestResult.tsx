import { Container, Stack } from "@mui/material";

import { useState } from "react";
import { useParams } from "react-router-dom";
import ViewFirstSection from "../../User/TestResultAnalysis/Components/ViewFirstSection";
import ViewSecondSection from "../../User/TestResultAnalysis/Components/ViewSecondSection";
import ViewThirdSection from "../../User/TestResultAnalysis/Components/ViewThirdSection";
import ViewFourthSection from "../../User/TestResultAnalysis/Components/ViewFourthSection";

const TestResult = () => {
  const { testresult } = useParams();

  const [barData, setBarData] = useState({
    labels: [
      "SOTT Reading Test 1",
      "SOTT Math Test 1",
      "SOTT Thinking Skills Test 1",
      "SOTT  Skills Test 2",
    ],
    datasets: [
      {
        label: "Marks",
        data: [20, 22, 17, 15],
        backgroundColor: "#FA8128",
      },
    ],
  });

  const [lineData, setLineData] = useState({
    labels: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30,
    ],
    datasets: [
      {
        label: "Seconds",
        data: [
          5, 8, 15, 30, 40, 32, 12, 53, 21, 22, 5, 8, 15, 30, 40, 32, 12, 53,
          21, 22, 5, 8, 15, 30, 40, 32, 12, 53, 21, 22,
        ],
        backgroundColor: "#3A9BDC",
      },
    ],
  });

  const [pieData, setPieData] = useState({
    labels: ["Right Questions", "Left Questions", "Negative Questions"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3],
        backgroundColor: ["#3A9BDC", "#FA8128", "#E84141"],
      },
    ],
  });
  return (
    <Container maxWidth="xl">
      <Stack direction="row" spacing={3} flexWrap="wrap" sx={{ width: "100%" }}>
        <ViewFirstSection />
        <Stack direction="column" spacing={3} useFlexGap flexWrap="wrap">
          <ViewSecondSection pieData={pieData} />
          <ViewThirdSection lineData={lineData} />
          <ViewFourthSection barData={barData} />
        </Stack>
      </Stack>
    </Container>
  );
};

export default TestResult;
