import { Box, Button, Container, Stack } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import SectionOne from "./TSectionOne";
import { useMutation, useQuery } from "@tanstack/react-query";
import TSectionOne from "./TSectionOne";
import adminTokenAxios from "../../../../../Hooks/AdminTokenAxios";

import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";

import { Header1 } from "../../../../../Components/Common/HeaderText";
import AlertBox from "../../../../../Components/Common/AlertBox";
import { useState } from "react";
import LoadingBar from "../../../../../Components/Headers/LoadingBar";
import DownloadPdfModel from "../../../../../Components/Model/DownloadPdfModel";

const ViewTopicDetail = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();
  // console.log(topicId);

  const [open, setOpen] = useState<boolean>(false);
  const [open2, setOpen2] = useState<boolean>(false);

  const [message, setMessage] = useState("");
  const handleAlertBoxOpen = () => {
    setOpen(true);
  };

  const handleAlertBoxClose = () => {
    setOpen(false);
  };

  const handleAlertBoxOpen2 = () => {
    setOpen2(true);
  };

  const handleAlertBoxClose2 = () => {
    setOpen2(false);
  };

  const testSeries = useQuery({
    queryKey: ["TestSeriesTopics", topicId],
    queryFn: async () => {
      return await adminTokenAxios.get(`admin/show-topics-details/${topicId}`);
    },
  });

  const topicCheck = useQuery({
    queryKey: ["TopicCheck", topicId],
    queryFn: async () => {
      // console.log("Query fn", topicId);
      return await adminTokenAxios.get(`admin/check-topic/${topicId}`);
    },
    enabled: !!topicId,
  });

  // console.log(testSeries?.data?.data);

  const deleteTopicMutation = useMutation({
    mutationFn: async (topicId: any) => {
      console.log("mutation data", topicId);
      return await adminTokenAxios.delete(`/admin/delete-topic/${topicId}`);
    },
    onError: (error: any) => {
      console.log("Error Deleting Set:", error);
    },
    onSuccess: (res: any) => {
      console.log("Mutation Reponse", res?.response?.data?.Message);
      // setMessage(res?.response?.data?.Message);
      // handleAlertBoxOpen();
      // navigate(-1);
      if (res.status == 200) {
        navigate(-1);
        handleAlertBoxOpen2();
      } else {
        handleAlertBoxOpen();
      }
    },
  });

  const handleDeleteTopic = (topicId: any) => {
    console.log("delete", topicId);
    deleteTopicMutation.mutate(topicId);
  };

  if (testSeries.isLoading) {
    return <LoadingBar />;
  }

  return (
    <>
      <AlertBox
        name="Cannot Delete The Topic"
        type="error"
        bol={open}
        duration={6000}
        handleAlertBoxClose={handleAlertBoxClose}
      />
      <AlertBox
        name="Successfully Deleted The Topic"
        type="success"
        duration={6000}
        bol={open2}
        handleAlertBoxClose={handleAlertBoxClose2}
      />
      <Container maxWidth="lg">
        <Stack marginTop={2} direction="row">
          <Button
            onClick={() => navigate(-1)}
            size="small"
            variant="contained"
            color="primary"
            sx={{ paddingRight: "1rem" }}
          >
            <ArrowBackIosNewRoundedIcon />
            Back
          </Button>

          <Stack
            direction="row"
            sx={{
              // my: "18px",
              justifyContent: "center",
              mx: "auto",
              pr: { lg: "100px", xs: "0px", sm: "100px", md: "100px" },
            }}
          >
            <AssignmentOutlinedIcon
              sx={{
                height: "28px",
                width: "28px",
                color: "#FA8128",
                mx: "8px",
                my: "auto",
              }}
            />
            <Header1 header="Topic wise Questions" />
          </Stack>
        </Stack>
        <Stack
          mt={2}
          // direction="row"
          spacing={2}
          // flexWrap="wrap"
          // sx={{ width: "100%" }}
        >
          <TSectionOne
            topics={testSeries?.data?.data.topics}
            questions={testSeries?.data?.data.question}
            handleDeleteTopic={handleDeleteTopic}
            topicCheck={topicCheck}
            topicId={topicId}
          />
          {/* <Stack direction="column" spacing={3} useFlexGap flexWrap="wrap"> */}
          {/* <TSectionTwo sets={testSeries?.data?.categories} /> */}
          {/* </Stack> */}
        </Stack>
      </Container>
    </>
  );
};

export default ViewTopicDetail;
