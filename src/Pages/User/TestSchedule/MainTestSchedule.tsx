import {
  Card,
  Container,
  Link,
  Stack,
  Table,
  TableContainer,
} from "@mui/material";
import EventRepeatOutlinedIcon from "@mui/icons-material/EventRepeatOutlined";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Header1 } from "../../../Components/Common/HeaderText";
import SelectBox from "../../../Components/Common/Select";
import { TableData, TableHeader } from "../../../Components/Common/Table";
import LoadingBar from "../../../Components/Headers/LoadingBar";
import tokenAxios from "../../../Hooks/TokenAxios";
import TestPurchasesTable from "./Components/TestPurchasesTable";
import axiosBaseURL from "../../../Hooks/BaseUrl";
import { MRT_ColumnDef } from "material-react-table";
import AdvanceTable from "../../Admin/components/AdvanceTable";
import { useNavigate } from "react-router-dom";

const header = [
  "#",
  "Test Name",
  "Subject",
  "Time Limit",
  "Valid From",
  "Valid Till",
];

type mUData = {
  ps_id: number;
  set_id: number;
};

type Purchases = {
  id: number;
  purchase_id: string;
  tspc_id: number;
  set_number: number;
  set_name: string;
  status: number;
  valid_from: string;
  valid_till: string;
  tsc_type: string;
  duration: number;
  package_name:string;
};

const MainTestSchedule = () => {
  const navigate = useNavigate();

  const [selectVal, setSelectVal] = useState<number>(1);

  const { data: ts_data } = useQuery(["ts"], () =>
    axiosBaseURL.get(`/get-test-series`)
  );

  const { isLoading, data } = useQuery([selectVal, "purchases"], () =>
    tokenAxios.get(`/get-user-purchases/${selectVal}`)
  );
// console.log(data);

  const TestMU = useMutation({
    mutationFn: async (data: mUData) => {
      return await tokenAxios.post("/post-user-test-status", {
        ps_id: data.ps_id,
        set_id: data.set_id,
      });
    },
    onSuccess: (response) => {
      console.log(response);

      // navigate(`/user/Test-schedule/Test-section/${response.data.uts_id}`);
      let url =`/#/user/Test-schedule/Test-section/${response.data.uts_id}`;
      window.open(url, '_blank', 'width=1400,height=600');
    },
  });

  const columns = useMemo<MRT_ColumnDef<Purchases>[]>(
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
        accessorKey: "tsc_type",
        header: "Subject",
        size: 50,
      },
    
      {
        accessorKey: "duration",
        header: "Time Limit",
        size: 40,

        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "valid_from",
        header: "Valid From",
        size: 150,
      },
      {
        accessorKey: "valid_till",
        header: "Valid Till",
        size: 150,
      },
      {
        accessorKey: "id",
        header: "",
        size: 50,
        Cell: ({ cell, row }: any) => (
          // <Link to={`${cell.getValue()}`}>
          <EventAvailableIcon
            sx={{
              width: "25px",
              height: "25px",
              color: "#3A9BDC",
              cursor: "pointer",
            }}
            onClick={() =>
              TestMU.mutate({
                ps_id: row.original.purchase_id,
                set_id: cell.getValue(),
              })
            }
          />
          // </Link>
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

  // console.log("Test schedule", data?.data?.tsp);

  if (isLoading) {
    return <LoadingBar />;
  }

  const props = {
    columns: columns,
    data: data?.data?.tsp,
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
    <Container maxWidth="lg">
      <Stack
        direction="row"
        sx={{
          my: "2px",
          justifyContent: "center",
          mx: "auto",
          pr: { lg: "100px", xs: "0px", sm: "100px", md: "100px" },
        }}
      >
        <EventRepeatOutlinedIcon
          sx={{
            height: "28px",
            width: "28px",
            color: "#FA8128",
            mx: "8px",
            my: "auto",
          }}
        />
        <Header1 header="TEST SCHEDULE" />
      </Stack>
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
          // display: "flex",
          // justifyContent: "space-between",
          py: "20px",
          minWidth: 650,
        }}
      > */}
        {/* <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHeader header={header} />
            <TestPurchasesTable data={data?.data?.tsp} />
          </Table>
        </TableContainer> */}
        <AdvanceTable {...props} />
        {/* </Card> */}
      </Stack>
    </Container>
  );
};

export default MainTestSchedule;
