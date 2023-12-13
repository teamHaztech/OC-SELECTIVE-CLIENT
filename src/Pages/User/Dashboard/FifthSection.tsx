import { Card, Container, TableContainer, Table, Box } from "@mui/material";
import { OButton2 } from "../../../Components/Common/Button";
import { Header1 } from "../../../Components/Common/HeaderText";
import { TableHeader, TableData } from "../../../Components/Common/Table";
import UseGet from "../../../Hooks/UseGet";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import LoadingBar from "../../../Components/Headers/LoadingBar";

const header = [
  "Sr. No",
  "Start date",
  "Percentage(%)",
  "Total Marks",
  "Test name",
  // "Subject",
  // "Rank",
];
const tableData = [
  {
    name: "test1",
    subject: "Maths",
    marks_scored: "200",
    percentage: "75%",
    test_date: "29/12/2022",
    rank: "1",
  },
  {
    name: "test2",
    subject: "Maths-2",
    marks_scored: "100",
    percentage: "55%",
    test_date: "29/12/2022",
    rank: "9",
  },
  {
    name: "test2",
    subject: "Maths-2",
    marks_scored: "100",
    percentage: "55%",
    test_date: "29/12/2022",
    rank: "9",
  },
];

const FifthSection = ({ data }: any) => {
  if (data.isLoading) {
    return <LoadingBar />;
  }
  return (
    <Container maxWidth="xl">
      <Header1 header="TEST RESULT ANALYSIS" />
      <Card sx={{ boxShadow: "5px 5px 20px 0px #808080", my: "15px" }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHeader header={header} />
            <TableData
              data={data?.data?.result}
              url="/user/Test-result-analysis/view"
            />
          </Table>
        </TableContainer>
      </Card>
      <Box sx={{ width: "344px", mx: "auto" }}>
        <Link to="Test-result-analysis">
          <OButton2 name="VIEW MORE" css={{ maxWidth: "344px" }} />
        </Link>
      </Box>
    </Container>
  );
};

export default FifthSection;
