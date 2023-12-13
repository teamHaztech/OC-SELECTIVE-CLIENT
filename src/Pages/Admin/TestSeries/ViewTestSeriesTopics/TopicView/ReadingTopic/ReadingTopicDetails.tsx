import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
  Tab,
  TextField,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import adminTokenAxios from "../../../../../../Hooks/AdminTokenAxios";
import { Header1 } from "../../../../../../Components/Common/HeaderText";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import PassageEditModal from "../../../../../../Components/Model/PassageEditModal";
import ReadingQuestionEditModal from "../../../../../../Components/Model/ReadingQuestionEditModal";
import LoadingBar from "../../../../../../Components/Headers/LoadingBar";
import AlertBox from "../../../../../../Components/Common/AlertBox";

const ReadingTopicDetails = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState<boolean>(false);
  const [selectedDataIndex, setSelectedDataIndex] = useState<number | null>(
    null
  );
  const [questionId, setQuestionId] = useState<number | null>(null);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    // readingTopicD.refetch();
  };
  // const handleOpen2 = () => setOpen2(true);
  // const handleClose2 = () => setOpen2(false);

  const handleOpen = (index: number) => {
    setSelectedDataIndex(index);
    setOpen(true);
  };

  const handleOpen2 = (id: number) => {
    setQuestionId(id);
    setOpen2(true);
  };

  const readingTopicD = useQuery({
    queryKey: ["ReadingTopicDetails", topicId],
    queryFn: async () => {
      try {
        const response = await adminTokenAxios.get(
          `admin/get-reading-question/${topicId}`
        );

        // console.log("Reading TOpic Details", response.data?.reading_question);

        return response?.data?.reading_question;
      } catch (error) {
        console.error(error);
      }
    },
  });

  const handleQuestionEdit = () => {
    console.log("click");
  };

  const handleAlertBoxOpen = () => {
    setOpen3(true);
  };

  const handleAlertBoxClose = () => {
    setOpen3(false);
  };

  if (readingTopicD.isLoading) {
    return <LoadingBar />;
  }

  return (
    <Container
      maxWidth="lg"
      sx={{
        width: "96%",
        my: 1,
        backgroundColor: "#F5F5F5",
      }}
      disableGutters
    >
      <Stack marginTop={1} direction="row">
        <Button
          onClick={() => navigate(-1)}
          // size="small"
          type="button"
          variant="contained"
          color="primary"
          sx={{ paddingRight: "1rem" }}
        >
          {/* <ArrowBackIosNewRoundedIcon /> */}
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
          <Header1 header="Reading Topic Details" />
        </Stack>
      </Stack>

      <Box my={2}>
        {readingTopicD.data?.map((item: any, index: number) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Passage {index + 1}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ position: "relative", mx: 4, mb: 2 }}>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<EditIcon />}
                  style={{ position: "absolute", top: 0, right: 0 }}
                  onClick={() => handleOpen(index)}
                >
                  Edit
                </Button>
                <div dangerouslySetInnerHTML={{ __html: item?.paragraph }} />
              </Box>
              <Divider />
              <Box mt={2} mx={4} display={"flex"} flexDirection={"column"}  rowGap={2}>
                {item?.question?.map((question: any, qIndex: any) => (
                  <Stack key={qIndex} sx={{ width: "100%" }}>
                    <div
                      style={{
                        position: "relative",
                      }}
                    >
                      <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<EditIcon />}
                        style={{ position: "absolute", top: 0, right: 0 }}
                        onClick={() => handleOpen2(question?.id)}
                      >
                        Edit
                      </Button>

                      <Stack>
                        <Typography variant="body1">
                          Question: {question?.question}
                        </Typography>

                        <List sx={{ marginLeft: 3 }}>
                          <ListItem disablePadding>
                            <ListItemText
                              primary={`A: ${question?.option_1}`}
                            />
                          </ListItem>
                          <ListItem disablePadding>
                            <ListItemText
                              primary={`B: ${question?.option_2}`}
                            />
                          </ListItem>
                          <ListItem disablePadding>
                            <ListItemText
                              primary={`C: ${question?.option_3}`}
                            />
                          </ListItem>
                          <ListItem disablePadding>
                            <ListItemText
                              primary={`D: ${question?.option_4}`}
                            />
                          </ListItem>
                          {question?.option_5 && (
                            <ListItem disablePadding>
                              <ListItemText
                                primary={`E: ${question?.option_5}`}
                              />
                            </ListItem>
                          )}
                          {question?.option_6 && (
                            <ListItem disablePadding>
                              <ListItemText
                                primary={`F: ${question?.option_6}`}
                              />
                            </ListItem>
                          )}
                          {question?.option_7 && (
                            <ListItem disablePadding>
                              <ListItemText
                                primary={`G: ${question?.option_7}`}
                              />
                            </ListItem>
                          )}
                          {question?.option_8 && (
                            <ListItem disablePadding>
                              <ListItemText
                                primary={`H: ${question?.option_8}`}
                              />
                            </ListItem>
                          )}
                        </List>

                        <Typography variant="body1">
                          Correct Option: {question?.correct_option}
                        </Typography>

                        <Typography variant="body1">
                          Explanation: {question?.explanation}
                        </Typography>
                      </Stack>
                    </div>
                  </Stack>
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

      {selectedDataIndex !== null && (
        <PassageEditModal
          open={open}
          handleClose={handleClose}
          data={readingTopicD.data[selectedDataIndex]}
          handleAlertBoxOpen={handleAlertBoxOpen}
          readingTopicD={readingTopicD}
        />
      )}

      {questionId !== null && (
        <ReadingQuestionEditModal
          open={open2}
          setOpen={setOpen2}
          // handleClose={handleClose2}
          qId={questionId}
          handleAlertBoxOpen={handleAlertBoxOpen}
          setQuestionId={setQuestionId}
          readingTopicD={readingTopicD}
        />
      )}
      <AlertBox
        name="Successfully Updated"
        type="success"
        bol={open3}
        handleAlertBoxClose={handleAlertBoxClose}
      />
    </Container>
  );
};

export default ReadingTopicDetails;
