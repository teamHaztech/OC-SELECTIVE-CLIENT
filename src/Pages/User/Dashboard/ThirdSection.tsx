import { Card, Container, TableContainer, Table, Box } from "@mui/material";
import { Header1 } from "../../../Components/Common/HeaderText";
import { TableHeader, TableData } from "../../../Components/Common/Table";
import LoadingBar from "../../../Components/Headers/LoadingBar";
import UseGet from "../../../Hooks/UseGet";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { OButton2 } from "../../../Components/Common/Button";
import tokenAxios from "../../../Hooks/TokenAxios";

const header = [
  "SrNo",
  "Test name",
  "Valid from",
  "Valid till",
  "Subject",
  "Duration",
  "Status"
];

// const tableData = [
//   { id: "1", name: "test1", valid_from: "29/9/2022", valid_till: "29/10/2022" },
//   {
//     id: "2",
//     name: "test2",
//     valid_from: "29/10/2022",
//     valid_till: "29/12/2022",
//   },
// ];

const ThirdSection = ({ data }: any) => {
  if (data.isLoading) {
    return <LoadingBar />;
  }

  console.log("third section", data.data);
  const test_data = data.data
  return (
    <Container maxWidth="xl">
      <Header1 header="Test Schedule" />
      <Card sx={{ boxShadow: "5px 5px 20px 0px #808080", my: "15px" }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHeader header={header} />
            <TableData
              data={test_data?.tsp}
              psId={test_data?.ps_id}
              third={true}
            />
          </Table>
        </TableContainer>
      </Card>
      <Box sx={{ width: "344px", mx: "auto" }}>
        <Link to="Test-schedule">
          {test_data.tsp && <OButton2 name="VIEW MORE" css={{ maxWidth: "344px" }} />}
        </Link>
      </Box>
    </Container>
  );
};

export default ThirdSection;
