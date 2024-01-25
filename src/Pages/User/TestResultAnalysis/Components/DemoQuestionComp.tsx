import { useContext, useEffect, useState } from "react";
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
import PaymentModal2 from "../../../../Components/Model/PaymentModal2";
import AlertBox from "../../../../Components/Common/AlertBox";
import DownloadPDF from "../../../Admin/TestSeries/Components/PDF/DownloadPDF";
import { TempContext } from "../../../../Context/TempContext";

// import PaymentModal2 from "../../../Components/Model/PaymentModal2";
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
const DemoQuestionComp = ({
  questions,
  total_questions,
  handleClose,
  tsc_id,
  tst_id,
}: any) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [amount, setAmount] = useState(0);
  const [userAnswers, setUserAnswers] = useState(
    Array(questions.length).fill("")
  );
  const [showResults, setShowResults] = useState(false);
  const { showPDF, setShowPDF, setSuccess,setPayment_id,payment_id } = useContext(TempContext);
  const { register, control, watch, reset } = useForm<FormValues>();
  const handleAnswerChange = (e: any) => {
    const updatedUserAnswers = [...userAnswers];
    updatedUserAnswers[currentQuestionIndex] = e.target.value;
    setUserAnswers(updatedUserAnswers);
  };
  // const [open, setOpen] = useState<boolean>(false);
  // const handleAlertBoxOpen = () => {
  //   setOpen(true);
  // };
  const [paymentOpen, setPaymentOpen] = useState<boolean>(false);
  useEffect(() => {
   
   
    let amount = 0;
    switch (watch("total_questions")) {
      case 10:
        amount = 5;
        break;

      case 25:
        amount = 15;
        break;
      case 35:
        amount = 20;
        break;
    }
    setAmount(amount);
  }, [watch("total_questions")]);
  // const handleAlertBoxClose = () => {
  //   setOpen(false);
  // };
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
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
  
  let q_data = total_questions?.total_questions;
  // console.log(q_data );
  return (
    <>
      <StyledRoot>
        {showResults ? (
         ( showPDF && payment_id.includes(tst_id))? (
            <DownloadPDF
              bol={false}
              data={q_data}
              randomG={true}
              total={watch("total_questions")}
              topic={total_questions?.topic}
              set={false}
              // index={set?.index}
              cateId={tsc_id} //need to set this properly
            />
          ) : (
            // <PdfMaker
            //   bol={!!total_questions}
            //   data={total_questions?.total_questions}
            //   //   randomG={true}
            //   button={
            //     <BButton type="button" name="Download" css={{ width: "340" }} />
            //   }
            //   total={watch("total_questions")}
            //   topic={total_questions?.topic}
            // />
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
                        <Select {...field} placeholder="Enter Total Questions">
                          <MenuItem value={0} disabled>
                            <em>None</em>
                          </MenuItem>
                          {/* <MenuItem value={5}>5</MenuItem> */}
                          <MenuItem value={10} disabled={q_data?.length < 10}>
                            10 - $5
                          </MenuItem>
                          <MenuItem value={25} disabled={q_data?.length < 25}>
                            25 - $15
                          </MenuItem>
                          <MenuItem value={35} disabled={q_data?.length < 35}>
                            35 - $20
                          </MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                </Stack>
                {watch("total_questions") && amount ? (
                  <>
                    <PaymentModal2
                      amount={amount}
                      open={paymentOpen}
                      handleClose={()=>setPaymentOpen(false)}
                      tst_id={tst_id}
                    />
                    <BButton
                      type="button"
                      name="Buy"
                      css={{ width: "340px" }}
                      func={()=>setPaymentOpen(true)}
                    />
                  </>
                ) : (
                  // <PdfMaker
                  //   bol={!!total_questions}
                  //   data={total_questions?.total_questions}
                  //   //   randomG={true}
                  //   button={
                  //     <BButton
                  //       type="button"
                  //       name="Download"
                  //       css={{ width: "340" }}
                  //     />
                  //   }
                  //   total={watch("total_questions")}
                  //   topic={total_questions?.topic}
                  // />
                  <BButton type="button" name="Buy" css={{ width: "340px" }} />
                )}
              </StyledStack>
            </div>
          )
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
                      alt=""
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
    </>
  );
};

export default DemoQuestionComp;
