import { Card, Box, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { ParaText1 } from "../../../../Components/Common/ParaText";
import { BButton2 } from "../../../../Components/Common/Button";
import ExamStatus from "./ExamStatus";
import {
  answered,
  markFR,
  notAnswered,
  notVisited,
  whiteText,
  answeredMarkFR,
} from "../../../../Assets/Css/TestStatus";
const fontStyle = { fontSize: "12px", fontWeight: 600 };
interface props {
  questions: any;
  func: (id: number, key: number) => void;
  submit: () => void;
 
}

const ExamSecondSection = (props: props) => {
  return (
    <Card
      sx={{
        boxShadow: "6px 6px 20px 0px #808080",
        // mb: "15px",
        // display: "flex",
        // flexDirection: { lg: "row", md: "row", sm: "row", xs: "column" },
        paddingY: "25px",
        width: "435px",
        maxHeight:"88vh",
        overflow: "auto"
      }}
    >
      <Box sx={{ paddingX: "20px" }}>
        <Stack
          direction="row"
          marginBottom="10px"
          
        >
          <Stack direction="row" spacing={1} marginRight="89px" alignItems={"center"}>
            <Box sx={{ ...answered ,}}>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: 400,
                  color: "#FFFFFF",
                }}
              >
                1
              </Typography>
            </Box>
            <ParaText1 text="Answered" css={fontStyle} />
          </Stack>
          <Stack direction="row" spacing={1} alignItems={"center"}>
            <Box sx={{ ...notAnswered }}>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: 400,
                  color: "#FFFFFF",
                }}
              >
                1
              </Typography>
            </Box>
            <ParaText1 text="Not Answered" css={fontStyle} />
          </Stack>
        </Stack>

        <Stack
          direction="row"
          marginBottom="10px"
         
        >
          <Stack direction="row" spacing={1} marginRight="89px" alignItems={"center"}>
            <Box sx={notVisited}>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: 400,
                  color: "#000000",
                }}
              >
                1
              </Typography>
            </Box>
            <ParaText1 text="Not Visited" css={fontStyle} />
          </Stack>
          <Stack direction="row" spacing={1} marginBottom="10px" alignItems={"center"}>
            <Box sx={markFR}>
              <Typography sx={whiteText}>0</Typography>
            </Box>
            <ParaText1 text="Marked for Review" css={fontStyle} />
          </Stack>
        </Stack>

        <Stack direction="row" spacing={1} marginBottom="10px" alignItems={"center"}>
          <Box sx={answeredMarkFR}>
            <Typography sx={whiteText}>0</Typography>
          </Box>
          <ParaText1 text="Answered And Marked for Review" css={fontStyle} />
        </Stack>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "30px",
          marginY: "10px",
          backgroundColor: "#3A9BDC",

          "&:hover": {
            backgroundColor: "#3A9BDC",
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      ></Box>
      <Stack paddingX={"20px"} spacing={2} maxWidth={"400px"}>
        <ExamStatus questions={props.questions} func={props.func} />

        <BButton2 name="Submit Test" func={props.submit} css={{width:"100%"}}/>
      </Stack>
    </Card>
  );
};

export default ExamSecondSection;
/* Rectangle 224 */
