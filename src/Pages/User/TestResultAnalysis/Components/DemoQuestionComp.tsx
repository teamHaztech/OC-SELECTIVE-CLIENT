import { useState } from "react";
import {
  Typography,
  Radio,
  Button,
  Select,
  MenuItem,
  Stack,
  FormControl,
  InputLabel,
  Box,
  FormLabel,
} from "@mui/material";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { Controller, useForm } from "react-hook-form";
import { BButton, BButton2 } from "../../../../Components/Common/Button";
import PdfMaker from "../../../Admin/TestSeries/Components/PdfMaker";

const StyledRoot = styled.div`
  text-align: center;
  max-width: 100%;
  margin: 0 auto;
  padding: 2px;
`;

const StyledQuestion = styled(Typography)`
  text-align: left;
  margin-bottom: 2px;
`;

const StyledParagraph = styled.div`
  text-align: left;
  margin-top: 2px;
  padding: 2px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f9f9f9;
`;

const StyledConversation = styled.div`
  text-align: left;
  margin-top: 2px;
  padding: 2px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f9f9f9;
  white-space: pre-line;

  & .speaker {
    font-weight: bold;
  }
`;

const StyledOptions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const StyledSelect = styled(Select)`
  /* margin-top: 2px; */
  min-width: 300px;
`;

const StyledStack = styled(Stack)`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
`;

const StyledBuyButton = styled(Button)`
  /* margin-top: 2px; */
`;

const StyledButton = styled(Button)`
  margin-top: 2px;
`;
type FormValues = {
  total_questions: number;
};
const DemoQuestionComp = ({ questions, total_questions }: any) => {
  const [setData, setSetData] = useState<any>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [userAnswers, setUserAnswers] = useState(
    Array(questions.length).fill("")
  );
  const [showResults, setShowResults] = useState(false);
  const { register, control, watch, reset } = useForm<FormValues>();
  const handleAnswerChange = (e: any) => {
    const updatedUserAnswers = [...userAnswers];
    updatedUserAnswers[currentQuestionIndex] = e.target.value;
    setUserAnswers(updatedUserAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleSelectChange = (event: any) => {
    setSelectedOption(event.target.value as string);
  };

  const calculateScore = () => {
    let score = 0;
    for (let i = 0; i < questions.length; i++) {
      if (userAnswers[i].toUpperCase() === questions[i].correct_option) {
        score++;
      }
    }
    return score;
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers(Array(questions.length).fill(""));
    setShowResults(false);
  };

  const splitConversation = (conversation: any) => {
    const lines = conversation?.split("\n");
    const styledLines = lines?.map((line: any, index: any) => {
      const speakerRegex = /^(.*?):\s/;
      const match = line.match(speakerRegex);
      if (match) {
        const speaker = match[1];
        const dialogue = line.replace(match[0], "");
        return (
          <div key={index}>
            <span className="speaker">{speaker}:</span> {dialogue}
          </div>
        );
      }
      return <div key={index}>{line}</div>;
    });
    return styledLines;
  };

  return (
    <StyledRoot>
      {showResults ? (
        <div>
          {/* <Typography variant="h5">Quiz Results</Typography>
          <Typography variant="body1">
            Your Score: {calculateScore()} out of {questions.length}
          </Typography> */}
          <StyledStack flexDirection={"column"} padding={10} spacing={2}>
            <Stack spacing={1} width={340}>
              <FormLabel
                sx={{ fontWeight: "900", fontSize: "1.1rem" }}
                id="demo-controlled-open-select-label"
              >
                Total Questions
              </FormLabel>

              <Controller
                name="total_questions"
                control={control}
                defaultValue={0} // Set a default value here
                render={({ field }) => (
                  <FormControl fullWidth>
                    <Select
                      {...field}
                      placeholder="Enter Total Questions"
                      // sx={{ width: "50%" }}
                    >
                      <MenuItem value={0} disabled>
                        <em>None</em>
                      </MenuItem>
                      {/* <MenuItem value={5}>5</MenuItem> */}
                      <MenuItem value={15}>15</MenuItem>
                      <MenuItem value={20}>20</MenuItem>
                      <MenuItem value={25}>25</MenuItem>
                      <MenuItem value={30}>30</MenuItem>
                      <MenuItem value={50}>50</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
            </Stack>

            {total_questions && watch("total_questions") ? (
              <PdfMaker
                bol={!!total_questions}
                data={total_questions?.total_questions}
                //   randomG={true}
                button={
                  <BButton
                    type="button"
                    name="Download"
                    css={{ width: "340" }}
                  />
                }
                total={watch("total_questions")}
                topic={total_questions?.topic}
              />
            ) : (
              <BButton type="button" name="Download" css={{ width: "340px" }} />
            )}
          </StyledStack>
        </div>
      ) : (
        <div>
          <StyledParagraph>
            {questions[currentQuestionIndex].paragraph}
          </StyledParagraph>
          <StyledConversation>
            {splitConversation(questions[currentQuestionIndex].conversation)}
          </StyledConversation>
          <StyledQuestion variant="h6">
            Question {currentQuestionIndex + 1}:{" "}
            {questions[currentQuestionIndex].question}
          </StyledQuestion>
          <StyledOptions>
            {["1", "2", "3", "4"].map((option) => (
              <div key={option}>
                <Radio
                  name="answer"
                  value={option}
                  checked={userAnswers[currentQuestionIndex] === option}
                  onChange={handleAnswerChange}
                />
                {questions[currentQuestionIndex][
                  "option_" + option.toLowerCase()
                ].endsWith(".png" || ".jpeg" || ".jpg") ? (
                  <img
                    src={
                      import.meta.env.VITE_IMAGE_URL +
                      questions[currentQuestionIndex][
                        "option_" + option.toLowerCase()
                      ]
                    }
                    alt="Image"
                  />
                ) : (
                  questions[currentQuestionIndex][
                    "option_" + option.toLowerCase()
                  ]
                )}
              </div>
            ))}
          </StyledOptions>
          <StyledButton
            variant="contained"
            color="primary"
            onClick={handleNextQuestion}
          >
            Next
          </StyledButton>
        </div>
      )}
    </StyledRoot>
  );
};

export default DemoQuestionComp;
