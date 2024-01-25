import React from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Container,
  Paper,
  ListItemButton,
  ListItemIcon,
  AccordionSummary,
  AccordionDetails,
  Accordion,
} from "@mui/material";
import { ParaText3 } from "../../../Components/Common/ParaText";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DemoQuestionComp from "../../User/TestResultAnalysis/Components/DemoQuestionComp";
import { Box } from "@mui/system";
import FR_OC from "./components/FR_OC";
import FR_Selective from "./components/FR_Selective";
import { useQuery } from "@tanstack/react-query";
import axiosBaseURL from "../../../Hooks/BaseUrl";
import SampleQuestionCard from "./components/SampleQuestionCard";
import LoadingBar from "../../../Components/Headers/LoadingBar";
const data = [
  "Opportunity Class (OC) placement tests",
  "FREE OC Samples",
  "Selective School Placement tests",
  "FREE Selective Samples",
];

const FreeResources = () => {
  const {
    data: sampleData,
    isLoading,
    isError,
  } = useQuery(
    ["sampleData"],
    async () => {
      const response = await axiosBaseURL.get("/get-sample-question");
      return response.data;
    }
    // { enabled: !user } // Uncomment this line if needed, assuming 'user' is defined
  );

  if (isLoading) {
    return <LoadingBar/>;
  }
  console.log(sampleData);
  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4">Free Resources</Typography>
        {/* {data.map((item) => (
          <ListItemButton
            key={item}
            sx={{ py: 0, minHeight: 32, color: "black" }}
          >
            <ListItemIcon sx={{ color: "inherit" }}></ListItemIcon>
            <ListItemText
              primary={item}
              primaryTypographyProps={{ fontSize: 14, fontWeight: "medium" }}
            />
          </ListItemButton>
        ))} */}

        <Box mt={3} key={1}>
          {data?.map((item: any, key: number) => {
            let ReComponent = null;
            switch (key) {
              case 0:
                ReComponent = <FR_OC />;
                break;
              case 1:
                ReComponent = (
                  <SampleQuestionCard currentData={sampleData?.oc_question} />
                );
                break;
              case 2:
                ReComponent = <FR_Selective />;
                break;
              case 3:
                ReComponent = (
                  <SampleQuestionCard
                    currentData={sampleData?.selective_question}
                  />
                );
                break;
            }
            // console.log(ReComponent);

            return (
              <Accordion key={item.id}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id={`panel${key + 1}-header`}
                >
                  <ParaText3 text={item} />
                </AccordionSummary>
                <AccordionDetails>
                  <Divider sx={{marginY:1}}/>
                  {ReComponent}

                  {/* <DemoQuestionComp
                      questions={item?.get_question}
                      total_questions={item}
                    /> */}
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Box>
      </Paper>
    </Container>
  );
};

export default FreeResources;
