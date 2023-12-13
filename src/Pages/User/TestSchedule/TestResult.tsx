import { Card, Container, Stack, Table, TableContainer } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useParams } from "react-router-dom";
import { TableHeader } from "../../../Components/Common/Table";
import LoadingBar from "../../../Components/Headers/LoadingBar";
import tokenAxios from "../../../Hooks/TokenAxios";
import ExamResultTable from "./Components/ExamResultTable";
import PieChartIcon from "@mui/icons-material/PieChart";
import { Header1 } from "../../../Components/Common/HeaderText";
import { OButton2 } from "../../../Components/Common/Button";

const header = [
  "Total Questions",
  "Total Marks",
  // "Duration",
  "Total Time",
  "Attempted",
  "Wrong Answer",
  "Right Answer",
  "Marks Scored",
];
type dataType = {
  total_questions: number;
  total_answered: number;
  total_marks: number;
  right_answer: number;
  time_taken: number;
  wrong_answer: number;
  total_time: number;
  marks_obtained: number;
};

const TestResult = () => {
  const params = useParams();

  const { isLoading, data } = useQuery<AxiosResponse<dataType, any>>(
    ["test-result"],
    async () => await tokenAxios.get<dataType>(`/get-test-result/${params.id}`)
  );

  if (isLoading) {
    return <LoadingBar />;
  }
  console.log(data);

  return (
    <Container maxWidth="xl">
      <Stack
        direction="row"
        sx={{
          my: "18px",
          justifyContent: "center",
          mx: "auto",
          pr: { lg: "100px", xs: "0px", sm: "100px", md: "100px" },
        }}
      >
        <PieChartIcon
          sx={{
            height: "28px",
            width: "28px",
            color: "#FA8128",
            mx: "8px",
            my: "auto",
          }}
        />
        <Header1 header="TEST OVERVIEW" />
      </Stack>
      <Card
        sx={{
          boxShadow: "6px 6px 20px 0px #808080",
          my: "15px",
          display: "flex",
          justifyContent: "space-between",
          py: "20px",
        }}
      >
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHeader header={header} />
            {data && <ExamResultTable data={data?.data} />}
          </Table>
        </TableContainer>
      </Card>

      <OButton2
        func={()=>window.close()}
        name="Back To Dashboard"
        css={{ width: "360px", mx: "auto", my: "15px" }}
      />
    </Container>
  );
};

export default TestResult;
