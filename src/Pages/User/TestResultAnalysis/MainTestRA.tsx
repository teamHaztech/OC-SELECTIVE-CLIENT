import {
  Card,
  Container,
  Stack,
  Box,
  TableContainer,
  Table,
} from "@mui/material";
import { useMemo, useState } from "react";
import UseGet from "../../../Hooks/UseGet";
import { useQuery } from "@tanstack/react-query";
import LoadingBar from "../../../Components/Headers/LoadingBar";
import SelectBox from "../../../Components/Common/Select";
import { TableData, TableHeader } from "../../../Components/Common/Table";
import tokenAxios from "../../../Hooks/TokenAxios";
import axiosBaseURL from "../../../Hooks/BaseUrl";
import { AppContext } from "../../../Context/AppContext";
import AdvanceTable from "../../Admin/components/AdvanceTable";
import { MRT_ColumnDef } from "material-react-table";
import FindInPageOutlinedIcon from "@mui/icons-material/FindInPageOutlined";
import { Link } from "react-router-dom";

// const header = [
//   "Sr. No",
//   "Test name",
//   "Test date",
//   "Subject",
//   "Marks scored",
//   "Percentage",
//   "Time Taken",
//   "Total Questions Answered",
//   "Correct Questions Answered",
//   "Rank",
// ];
// const tableData = [
//   {
//     id: 1,
//     name: "test1",
//     test_date: "29/9/2022",
//     subject: "Maths-1",
//     Marks_scored: "37/50",
//     Percentage: "75%",
//     Time_Taken: "00.45.00",
//     Total_Questions_Answered: "15/15",
//     Correct_Questions_Answered: "15/15",
//     Rank: "1",
//   },
//   {
//     id: 2,
//     name: "test2",
//     test_date: "29/10/2022",
//     subject: "maths-2",
//     Marks_scored: "37/50",
//     Percentage: "75%",
//     Time_Taken: "00.45.00",
//     Total_Questions_Answered: "15/15",
//     Correct_Questions_Answered: "10/15",
//     Rank: "1",
//   },
//   {
//     id: 5,
//     name: "test2",
//     test_date: "29/10/2022",
//     subject: "maths-2",
//     Marks_scored: "37/50",
//     Percentage: "75%",
//     Time_Taken: "00.45.00",
//     Total_Questions_Answered: "15/15",
//     Correct_Questions_Answered: "9/15",
//     Rank: "1",
//   },
// ];

type Results = {
  id: number;
  tsps_id: number;
  set_id: number;
  complete_status: number;
  start_date: string;
  end_date: string;
  time_taken: string;
  current_timer: any;
  percentage: number;
  total_marks: number;
  total_answered: number;
  q_id: number;
  package_name:string;
  set_name: string;
};

const MainTestRA = () => {
  const { user } = AppContext();
  const [selectVal, setSelectVal] = useState<number>(1);

  const { data: ts_data, isLoading } = useQuery(["ts"], () =>
    axiosBaseURL.get(`/get-test-series`)
  );

  const getUserAllResultQuery = useQuery({
    queryKey: ["get-user-all-results", selectVal],
    queryFn: async () => {
      try {
        const response = await tokenAxios.get(
          `/get-user-all-results/${user?.id}/${selectVal}`
        );
        // console.log("ALL Results", response.data?.all_results);

        return response.data?.all_results;
      } catch (error) {
        console.error(error);
      }
    },
  });

  const columns = useMemo<MRT_ColumnDef<Results>[]>(
    () => [
      // {
      //   accessorKey: "no",
      //   header: "No.",
      //   Cell: ({ row }) => {
      //     const { index } = row;
      //     return <span>{index + 1}</span>;
      //   },
      //   size: 100,
      //   muiTableHeadCellProps: {
      //     align: "center",
      //   },
      //   muiTableBodyCellProps: {
      //     align: "center",
      //   },
      // },
      {
        accessorKey: "package_name",
        header: "Package Name",
        size: 200,
      },
      {
        accessorKey: "set_name",
        header: "Test Name",
        size: 200,
      },
      {
        accessorKey: "start_date",
        header: "Start Date",
        size: 100,
      },

      {
        accessorKey: "end_date",
        header: "End Date",
        size: 100,

        // muiTableHeadCellProps: {
        //   align: "center",
        // },
        // muiTableBodyCellProps: {
        //   align: "center",
        // },
      },
      {
        accessorKey: "time_taken",
        header: "Total Time Taken",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "total_answered",
        header: "Total Answered",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "total_marks",
        header: "Total Marks",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "percentage",
        header: "Percentage",
        size: 50,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "id",
        header: "",
        size: 50,
        Cell: ({ cell, row }: any) => (
          <Link to={`view/${cell.getValue()}`}>
            <FindInPageOutlinedIcon
              sx={{
                width: "25px",
                height: "25px",
                color: "#3A9BDC",
                cursor: "pointer",
              }}
              // onClick={() =>
              //   TestMU.mutate({
              //     ps_id: row.original.purchase_id,
              //     set_id: cell.getValue(),
              //   })
              // }
            />
          </Link>
        ),
        enableSorting: false,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
    ],
    []
  );

  if (isLoading) {
    return <LoadingBar />;
  }

  const props = {
    columns: columns,
    data: getUserAllResultQuery?.data,
    // isError: isError,
    // isFetching: isFetching,
    // isLoading: isFetching,
    // refetch: refetch,
    // setColumnFilters: setColumnFilters,
    // setGlobalFilter: setGlobalFilter,
    // setPagination: setPagination,
    // setSorting: setSorting,
  };

  return (
    <Container maxWidth="xl">
      <Stack spacing={1} marginBottom={2}>
        <SelectBox
          name="choose test type"
          selectName="test_type"
          defaultValue="1"
          options={ts_data?.data.ts}
          func={setSelectVal}
        />
        {/* <Card
        sx={{
          boxShadow: "6px 6px 20px 0px #808080",
          my: "15px",
          display: "flex",
          justifyContent: "space-between",
          py: "20px",
        }}
      > */}
        {getUserAllResultQuery.isLoading ? (
          <Stack justifyContent={"center"} alignItems={"center"}>
            <LoadingBar />
          </Stack>
        ) : (
          <AdvanceTable {...props} />
        )}

        {/* <TableContainer>
          <Table sx={{ minWidth: 650 }}>
          <TableHeader header={header} />
          <TableData data={tableData} url="/user/Test-result-analysis/view" />
          </Table>
        </TableContainer> */}
        {/* </Card> */}
      </Stack>
    </Container>
  );
};

export default MainTestRA;
