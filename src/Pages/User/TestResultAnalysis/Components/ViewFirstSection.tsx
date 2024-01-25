import {
  ParaText1,
  ParaText3,
  ParaText4,
} from "../../../../Components/Common/ParaText";
import { Container, Stack, Card, Divider, Box } from "@mui/material";
import LoadingBar from "../../../../Components/Headers/LoadingBar";
import { useMutation, useQuery } from "@tanstack/react-query";
import { UserContext } from "../../../../Context/UserContext";
import UseGet from "../../../../Hooks/UseGet";
import { OButton } from "../../../../Components/Common/Button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import DemoQuestionModal from "../../../../Components/Model/DemoQuestionModal";
import tokenAxios from "../../../../Hooks/TokenAxios";
import AlertBox from "../../../../Components/Common/AlertBox";
import { TempContext } from "../../../../Context/TempContext";

interface Detail {
  title: string;
  data: string;
}
const ViewFirstSection = ({ data }: any) => {
  const { handlePEOpen, dataSubmit } = UserContext();
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [showPDF, setShowPDF] = useState(false);
  const [message, setMessage] = useState("");
  const [payment_id, setPayment_id] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  console.log(payment_id);

  const result = data?.data?.all_results;

  
  const uniqueTopics = [
    ...new Set(result?.weak_topics.map((item: any) => item.topic)),
  ];
  // console.log(result?.tsc_id == 1);
  // console.log("fat", data.data?.all_results?.weak_topics);

  const tst_id = result?.weak_topics.map((item: any) => item.id);
  console.log(tst_id);
  const getTopicMutation = useMutation({
    mutationFn: async () => {
      return await tokenAxios.post(`/get-topic-question`, { tst_id });
    },
    onError: (error: any) => {
      console.error("Error creating user:", error.response?.data);
    },
    onSuccess: (res) => {
      if (res.status == 200) {
        setOpen(true);
      } else {
      }
    },
  });

  if (data?.isLoading) {
    return <LoadingBar />;
  }

  const details: Detail[] = [
    // { title: "Set Name", data: result?.set_name },
    { title: "Total Questions : ", data: result?.total_questions },
    {
      title: "Questions Attempted : ",
      data: result?.total_answered,
    },
    {
      title: "Time Taken to Attempt (min) : ",
      data: result?.time_taken + ":00",
    },
    { title: "Correct Answers : ", data: result?.total_marks },
    { title: "Marks Secured : ", data: result?.total_marks },
    {
      title: "Wrong Answers : ",
      data: result?.negative_marks,
    },
    { title: "Percentage : ", data: result?.percentage },
    { title: "Total Marks : ", data: result?.total_questions }, //result?.total_marks
    {
      title: "Rank : ",
      data: result?.rank,
    },
    {
      title: "Weak Topics : ",
      data: uniqueTopics.join(", "),
    },
  ];

  
  return (
    <>
      <TempContext.Provider
        value={{
          openAlert,
          message,
          setOpenAlert,
          setMessage,
          success,
          setSuccess,
          showPDF,
          setShowPDF,
          payment_id,
          setPayment_id
        }}
      >
        <AlertBox
          bol={openAlert}
          name={message}
          type={success ? "success" : "error"}
          handleAlertBoxClose={() => setOpenAlert(false)}
        />
        <Card
          sx={{
            boxShadow: "6px 6px 20px 0px #808080",

            width: "100%",
            px: "20px",
          }}
        >
          <ParaText4
            text={`Set Name : ${result?.set_name}`}
            css={{ textAlign: "center", fontWeight: 550, my: "10px" }}
          />
          {/* <Divider
          sx={{
            borderColor: "#000000",
            my: "10px",
            borderRadius: "3px",
            width: "100%",
            mx: "auto",
          }}
        /> */}
          <Stack
            sx={{
              flexDirection: { sm: "row", xs: "column" },
              justifyContent: "space-around",
              border: 1,
            }}
          >
            <Box flexBasis={"30%"} sx={{}}>
              {details
                ?.slice(0, Math.ceil(details.length / 2))
                .map((item: Detail, key: number) => (
                  <Stack
                    flexDirection="row"
                    sx={{ justifyContent: "space-between" }}
                    margin="20px"
                    key={key}
                  >
                    <ParaText3 text={item?.title} css={{ textAlign: "left" }} />
                    <ParaText1 text={item?.data} css={{}} />
                  </Stack>
                ))}
            </Box>
            <Divider
              sx={{
                borderColor: "#000000",
                my: "20px",
                // borderRadius: "3px",
                // width: "12%",

                border: 1,
                // mx: "auto",
              }}
              orientation="horizontal"
              flexItem
            />
            <Box flexBasis={"30%"}>
              {details
                ?.slice(Math.ceil(details.length / 2))
                .map((item: Detail, key: number) => (
                  <Stack
                    flexDirection="row"
                    sx={{ justifyContent: "space-between" }}
                    margin="20px"
                    key={key}
                  >
                    <ParaText3 text={item?.title} css={{ textAlign: "left" }} />
                    <ParaText1 text={item?.data} css={{}} />
                  </Stack>
                ))}
            </Box>
          </Stack>
          <Stack
            direction={"row"}
            justifyContent={"end"}
            sx={{ width: "80%", m: "auto", my: "15px" }}
            spacing={5}
          >
            {result && result?.tsc_id != 2 && (
              <OButton
                name={getTopicMutation.isLoading ? "Loading..." : "Buy Topics"}
                func={getTopicMutation.mutate}
                css={{ maxWidth: "50%" }}
              />
            )}
            <Link
              to={`/user/Test-result-analysis/solution/${result?.id}`}
              style={{ maxWidth: "50%" }}
            >
              <OButton name="View Solution" css={{ width: "100%" }} />
            </Link>
          </Stack>
        </Card>

        <DemoQuestionModal
          open={open}
          handleClose={handleClose}
          data={getTopicMutation.data}
          tsc_id ={result?.tsc_id }
        />
      </TempContext.Provider>
    </>
  );
};

export default ViewFirstSection;
