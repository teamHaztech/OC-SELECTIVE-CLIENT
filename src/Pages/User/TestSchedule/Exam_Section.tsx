import { Container, Stack, Button, Box } from "@mui/material";
import { Header1 } from "../../../Components/Common/HeaderText";
import { ParaText3 } from "../../../Components/Common/ParaText";
import ExamFirstSection from "./Components/ExamFirstSection";
import ExamSecondSection from "./Components/ExamSecondSection";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import tokenAxios from "../../../Hooks/TokenAxios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { OButton, WButton } from "../../../Components/Common/Button";
import { AppContext } from "../../../Context/AppContext";
import { useEffect, useState } from "react";
import LoadingBar from "../../../Components/Headers/LoadingBar";
import { useTimer } from "react-timer-hook";
import ReadingTestSection from "./Components/ReadingTestSection";

type mutateType = {
  id: number;
  complete_status?: number;
  current_timer: string;
  test_answer?: string | number;
};
type image = {
  id: number;
  image_url: string;
  q_id: number;
};
type questionType = {
  id: number;
  q_id: number;
  status_id: number;
  test_answer: null | string;
  uts_id: number;
  test_time: number;
  questions: {
    conversation?: string;
    paragraph?: string;
    id: number;
    question: string;
    option_1: string;
    option_2: string;
    option_3: string;
    option_4: string;
    option_5: string | null;
    option_6: string | null;
    option_7: string | null;
    option_8: string | null;
    correct_option: string;
    explanation: string;
    tst_id: number;
    marks: null | number;
    status: number;
    question_image: image[];
  };
};
const Exam_Section = () => {
  // document.addEventListener('contextmenu', (e:any) => e.preventDefault());

  // function ctrlShiftKey(e:any, keyCode:any) {
  //   return e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0);
  // }

  // document.onkeydown = (e:any) => {
  //   if (

  //     ctrlShiftKey(e, 'I') ||
  //     ctrlShiftKey(e, 'J') ||
  //     ctrlShiftKey(e, 'C') ||
  //     (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0))
  //   )
  //     return false;
  // };

  const preventCopyPaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    alert("Copying and pasting is not allowed!");
  };

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const params = useParams();
  const { user } = AppContext();
  const [timer, setTimer] = useState<boolean>(true);
  const [question, setQuestion] = useState<questionType | null>(null);
  const [questions, setQuestions] = useState<questionType[] | []>([]);
  const [count, setCount] = useState<number>(0);

  const updateTStatus = useMutation({
    mutationFn: async (data: mutateType) => {
      const object: { status_id: number | undefined; current_timer: string } = {
        status_id: data?.complete_status,
        current_timer: data?.current_timer,
        ...(data.test_answer && { test_answer: null }),
      };

      return await tokenAxios.post(`/update-test-status/${data.id}`, object);
    },
    onSuccess: (res) => {
      // console.log(res);
      queryClient.setQueryData(["question-data"], res);
    },
  });

  const updateTimer = useMutation({
    mutationFn: async ({
      id,
      current_timer,
    }: {
      id: number;
      current_timer: string;
    }) => {
      return await tokenAxios.post(`/update-test-timer/${id}`, {
        current_timer: current_timer,
      });
    },
    onSuccess: (res) => {
      // console.log(res);
    },
  });

  const submitTest = useMutation({
    mutationFn: async ({
      id,
      current_timer,
    }: {
      id: number;
      current_timer: string;
    }) => {
      return await tokenAxios.post(`/submit-test/${id}`, {
        current_timer: current_timer,
      });
    },
    onSuccess: (res) => {
      // console.log(`/user/Test-result/${res.data.uts_id}`);
      navigate(`/user/Test-result/${res.data.uts_id}`);
    },
  });
  const updateAStatus = useMutation({
    mutationFn: async (data: { id: number; answer: string }) => {
      // console.log(data);
      return await tokenAxios.post(`/update-test-status/${data.id}`, {
        status_id: 1,
        test_answer: data.answer,
        current_timer: `${minutes}.${seconds}`,
      });
    },
    onSuccess: (res) => {
      // console.log(res);
      queryClient.setQueryData(["question-data"], res);
    },
  });
  const { isLoading, data } = useQuery(
    ["question-data"],
    async () => await tokenAxios.get(`/generate-question/${params.id}`)
  );
  // console.log("generate-question", data);

  const time = data?.data?.timer
    ? new Date(Date.now() + parseFloat(data?.data?.timer) * 60 * 1000)
    : new Date(Date.now() + 60 * 1000);

  const { seconds, minutes, restart } = useTimer({
    expiryTimestamp: time,
    autoStart: false,
    onExpire: () => [SubmitTestData()],
  });

  useEffect(() => {
    if (data?.data?.timer && timer) {
      const time = new Date(
        Date.now() + parseFloat(data?.data?.timer) * 60 * 1000
      );
      restart(time);
      setTimer(false);
    }

    setQuestions(data?.data.test_data);
    // console.log(!question);

    !question &&
      questions?.filter((item: questionType, key: number) => {
        if (item.id === data?.data.current_qid) {
          setCount(key);
          setQuestion(item);
        }
      });
  }, [data, questions]);

  const paginate = (id: number, key: number) => {
    setCount(key);
    setQuestion(questions[key]);
    updateTStatus.mutate({
      id: id,
      complete_status:
        questions && questions[key].status_id === 3
          ? 2
          : questions[key].status_id,
      current_timer: `${minutes}.${seconds}`,
    });
  };

  useEffect(() => {
    submitTimer(false);
  }, [minutes]);

  const submitTimer = (nav: boolean) => {
    question &&
      updateTimer.mutate({
        id: question?.uts_id,
        current_timer: `${minutes}.${seconds}`,
      });
    nav && window.close();
  };

  const MarkForReview = () => {
    // console.log(questions[count]);
    updateTStatus.mutate({
      id: data?.data.current_qid,
      complete_status: questions[count]?.test_answer ? 5 : 4,
      current_timer: `${minutes}.${seconds}`,
    });
  };

  const ClearResponse = () => {
    setQuestion((prevQuestion: any) => ({
      ...prevQuestion,
      test_answer: null,
      status_id: 2,
    }));

    updateTStatus.mutate({
      id: data?.data.current_qid,
      complete_status: 2,
      test_answer: 1,
      current_timer: `${minutes}.${seconds}`,
    });
  };

  const SubmitTestData = () => {
    question &&
      submitTest.mutate({
        id: question?.uts_id,
        current_timer: `${minutes}.${seconds}`,
      });
  };

  const SaveNext = () => {
    question &&
      updateTimer.mutate({
        id: question?.uts_id,
        current_timer: `${minutes}.${seconds}`,
      });

    if (count + 1 < questions.length)
      questions && paginate(questions[count + 1]?.id, count + 1);
  };
  console.log(data?.data?.category_id );
  
  if (isLoading) {
    return <LoadingBar />;
  }
  return (
    <Container maxWidth="xl" sx={{ height: "50px" }}>
      <Stack direction={"column"}>
        <Stack
          sx={{ width: "100%", my: 1 }}
          direction={{ lg: "row", md: "row", sm: "row", xs: "column" }}
        >
          {/* <Header1 header="Section" /> */}
          <ParaText3
            text={`Time Remaining: ${minutes}:${seconds}`}
            css={{ margin: "auto" }}
          />
          <Stack
            direction={{ lg: "row", md: "row", sm: "row", xs: "column" }}
            spacing={2}
          >
            <Button
              variant="outlined"
              sx={{
                width: "30px",
                height: "30px",
                color: "#FA8128",
                border: "1px solid #FA8128",
                backgroundColor: "#FFFFFF",
                marginY: "auto",
              }}
            >
              <Person2OutlinedIcon sx={{ width: "30px", height: "30px" }} />
            </Button>
            <Box>
              {user && (
                <ParaText3 text={user?.name} css={{ fontWeight: "500" }} />
              )}
            </Box>
          </Stack>
        </Stack>
        <Stack
          direction={{ lg: "row", md: "row", sm: "row", xs: "column" }}
          spacing={2}
          sx={{ width: "100%", my: "15px" }}
        >
          {data?.data?.category_id === 2 ? (
            <ReadingTestSection
              data={question}
              count={count}
              mutation={updateAStatus}
              isLoading={isLoading}
              index={data?.data.index }
              preventCopyPaste={preventCopyPaste}
            />
          ) : (
            <ExamFirstSection
              data={question}
              count={count}
              mutation={updateAStatus}
              isLoading={isLoading}
              index={[]}
              preventCopyPaste={preventCopyPaste}
            />
          )}

          <ExamSecondSection
            questions={questions}
            func={paginate}
            submit={SubmitTestData}
          />
        </Stack>
        <Stack direction="row" spacing={2} marginTop={2}>
          <OButton
            name="MARKED FOR REVIEW"
            css={{ width: "220px" }}
            func={MarkForReview}
          />
          <OButton
            name="CLEAR RESPONSE"
            css={{ width: "220px" }}
            func={ClearResponse}
          />

          <OButton
            name="SAVE & CONTINUE LATER"
            css={{ width: "300px" }}
            func={() => submitTimer(true)}
          />

          <WButton name="SAVE & NEXT" func={SaveNext} />
        </Stack>
      </Stack>
    </Container>
  );
};

export default Exam_Section;
