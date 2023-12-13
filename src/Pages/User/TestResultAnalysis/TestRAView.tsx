import { Container, Stack } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import ViewFirstSection from "./Components/ViewFirstSection";
import ViewFourthSection from "./Components/ViewFourthSection";
import ViewSecondSection from "./Components/ViewSecondSection";
import ViewThirdSection from "./Components/ViewThirdSection";
import { useQuery } from "@tanstack/react-query";
import tokenAxios from "../../../Hooks/TokenAxios";
import { AppContext } from "../../../Context/AppContext";

const TestRAView = () => {
  const { id } = useParams();
  const { user } = AppContext();

  const getUserTestResultQuery = useQuery({
    queryKey: ["get-user-result"],
    queryFn: async () => {
      try {
        const response = await tokenAxios.get(`/get-user-result/${id}`);
        // console.log(" Results", response.data?.all_results);

        return response.data;
      } catch (error) {
        console.error(error);
      }
    },
  });

  const getMarksDistributionQuery = useQuery({
    queryKey: ["get-marks-Distribution"],
    queryFn: async () => {
      try {
        const response = await tokenAxios.get(`/get-marks-Distribution/${id}`);
        // console.log(" getMarksDistributionQuery", response.data);

        return response.data;
      } catch (error) {
        console.error(error);
      }
    },
  });

  const getQuestionTimeQuery = useQuery({
    queryKey: ["get-question-time"],
    queryFn: async () => {
      try {
        const response = await tokenAxios.get(`/get-question-time/${id}`);
        // console.log(" getMarksDistributionQuery", response.data);

        return response.data;
      } catch (error) {
        console.error(error);
      }
    },
  });

  const getPecentageAndRankQuery = useQuery({
    queryKey: ["get-percentage-rank"],
    queryFn: async () => {
      try {
        const response = await tokenAxios.get(
          `/get-percentage-rank/${id}/${user?.id}`
        );
        console.log(" getPecentageAndRankQuery", response.data);

        return response.data;
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <Container maxWidth="xl" sx={{maxHeight:"100%"}}>
      <Stack
        direction="column"
        spacing={{ lg: 3, md: 0, sm: 0, xs: 0 }}
        rowGap={5}
        // flexWrap="wrap"
        sx={{ width: "100%" , my: "20px",height:"100%"}}
      >
        <ViewFirstSection data={getUserTestResultQuery} />
        {/* <Stack direction="column" useFlexGap flexWrap="wrap"> */}
          <ViewSecondSection data={getMarksDistributionQuery} />
          <ViewThirdSection data={getQuestionTimeQuery} />
          {/* <ViewFourthSection data={getPecentageAndRankQuery} /> */}
        {/* </Stack> */}
      </Stack>
    </Container>
  );
};

export default TestRAView;
