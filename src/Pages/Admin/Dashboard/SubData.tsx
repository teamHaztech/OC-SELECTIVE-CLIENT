import {
  Box,
  Container,
  Stack,
  Card,
  TableContainer,
  Table,
} from "@mui/material";
import SelectBox from "../../../Components/Common/Select";
import SimpleCard from "../components/SimpleCard";
import { TableData, TableHeader } from "../../../Components/Common/Table";
import { Header2, Header4 } from "../../../Components/Common/HeaderText";

interface Option {
  name: string;
  value: number;
}

interface DataItem {
  name: string;
  total_purchases: string;
}

interface PerformanceItem {
  name: string;
  percentage: string;
}

interface SubDataProps {
  options: Option[];
  func: (value: number) => void;
  header: string[];
  tableData: DataItem[];
  studentPerformance: PerformanceItem[];
  header2: string[];
  data: any;
  name: string;
}

const SubData = ({
  options,
  func,
  header,
  tableData,
  header2,
  studentPerformance,
  data,
  name,
}: SubDataProps) => {
  console.log("dash", data);

  return (
    <Container maxWidth={false} sx={{ p: 0, border: 1 }}>
      <Box my={1}>
        {/* <SelectBox
          name="Select Test"
          selectName="Select_Test"
          options={options}
          func={func}
        /> */}
      </Box>
      <Box mt={0} mb={1} sx={{ flexGrow: 1 }}>
        <Box display={"flex"} justifyContent={"space-around"} gap={2}>
          {/* Left Side */}
          <Stack flex={1}>
            <Box>
              <Stack
                marginY={2}
                direction="row"
                spacing={2}
                justifyContent="center"
              >
                <SimpleCard
                  title={`Total Packages`}
                  subtitle={data?.product_count}
                />
                <SimpleCard
                  title={`Total Package Purchases`}
                  subtitle={data?.purchase_count}
                />
                <SimpleCard
                  title={`Total Topics`}
                  subtitle={data?.topic_count}
                />
                <SimpleCard title="Total Users" subtitle={data?.user_count} />
              </Stack>
            </Box>
            {/* <Box>
              <Header2 header="Test Series" css={{ fontSize: "1.2rem" }} />
              <Card sx={{ boxShadow: "5px 5px 20px 0px #808080", my: "15px" }}>
                <Box sx={{ height: 240, overflow: "auto" }}>
                  <TableContainer>
                    <Table sx={{}}>
                      <TableHeader header={header} />
                      <TableData
                        data={tableData}
                        url="/user/Test-result-analysis"
                      />
                    </Table>
                  </TableContainer>
                </Box>
              </Card>
            </Box> */}
          </Stack>
          {/* Right Side */}
          {/* <Stack flex={1}>
            <Box>
              <Header2
                header="Student Perforamnce"
                css={{ mt: "1rem", fontSize: "1.2rem" }}
              />
              <Card
                sx={{ boxShadow: "5px 5px 20px 0px #808080", mt: "0.5rem" }}
              >
                <Box sx={{ height: 400, overflow: "auto" }}>
                  <TableContainer>
                    <Table sx={{}}>
                      <TableHeader header={header2} />
                      <TableData
                        data={studentPerformance}
                        url="/user/Test-result-analysis"
                      />
                    </Table>
                  </TableContainer>
                </Box>
              </Card>
            </Box>
          </Stack> */}
        </Box>
      </Box>
    </Container>
  );
};

export default SubData;
