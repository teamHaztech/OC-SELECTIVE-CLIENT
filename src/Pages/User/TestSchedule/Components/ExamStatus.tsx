import { Box, Stack, Typography } from "@mui/material";
import {
  answered,
  answeredMarkFR,
  notAnswered,
  markFR,
  notVisited,
  whiteText,
} from "../../../../Assets/Css/TestStatus";

interface props {
  questions: any;
  func: any;
}
const ExamStatus = (props: props) => {
  let count = 1;
  return (
    <Stack spacing={2} direction="column" maxWidth={"100%"}>
      {props.questions &&
        Array.from({ length: Math.ceil(props.questions.length / 5) }).map(
          (row, rowIndex) => (
            <Stack
              key={rowIndex}
              spacing={{lg:7,md:6,sm:5}}
              direction="row"
              justifyContent="center"

            >
              {props.questions
                .slice(rowIndex * 5, rowIndex * 5 + 5)
                .map((item: any, key: number) => {
                  const uniqueKey = rowIndex * 5 + key;

                  const val = item.status_id;
                  let boxStyle = null;
                  let textContent = null;
                  let text = null;
                  if (val === 1) {
                    boxStyle = answered;
                    text = whiteText;
                    textContent = count.toString();
                  } else if (val === 2) {
                    boxStyle = notAnswered;
                    text = whiteText;
                    textContent = count.toString();
                  } else if (val === 3) {
                    boxStyle = notVisited;
                    text = {
                      fontSize: "16px",
                      fontWeight: 400,
                      color: "#000000",
                    };
                    textContent = count.toString();
                  } else if (val === 4) {
                    text = whiteText;
                    boxStyle = markFR;
                    textContent = count.toString();
                  } else if (val === 5) {
                    text = whiteText;
                    boxStyle = answeredMarkFR;
                    textContent = count.toString();
                  }

                  count++;
              
                  return (
                    <Box
                      key={uniqueKey} 
                      sx={boxStyle}
                      onClick={() => {
                        props.func(item.id, uniqueKey);
                      }}
                    >
                      <Typography sx={text}>{textContent}</Typography>
                    </Box>
                  );
                })}
            </Stack>
          )
        )}
    </Stack>


  );
};

export default ExamStatus;
