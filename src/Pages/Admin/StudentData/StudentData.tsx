import { Box, Container, Stack } from "@mui/material";
import { Header1 } from "../../../Components/Common/HeaderText";
import AdvanceTable from "../components/AdvanceTable";
import {
  type MRT_ColumnDef,
  type MRT_ColumnFiltersState,
  type MRT_PaginationState,
  type MRT_SortingState,
} from "material-react-table";
import { useMemo, useState } from "react";
import { OutlineButton } from "../../../Components/Common/Button";
import { useQuery } from "@tanstack/react-query";
import { data } from "../components/Mock_Data";
import { Link } from "react-router-dom";
import adminTokenAxios from "../../../Hooks/AdminTokenAxios";
import LoadingBar from "../../../Components/Headers/LoadingBar";

// interface Column {
//   id:
//     | "userId"
//     | "studentName"
//     | "testType"
//     | "dateOfPurchase"
//     | "validFrom"
//     | "validTo"
//     | "details";
//   label: string;
//   minWidth?: number;
//   align?: "left" | "right" | "center";
//   format?: (value: number) => string;
// }

// const columns: readonly Column[] = [
//   { id: "userId", label: "User Id", minWidth: 100, align: "center" },
//   { id: "studentName", label: "Student Name", minWidth: 150, align: "left" },
//   {
//     id: "testType",
//     label: "Test Type",
//     minWidth: 170,
//     align: "center",
//     format: (value: number) => value.toLocaleString("en-US"),
//   },
//   {
//     id: "dateOfPurchase",
//     label: "Date of Purchase",
//     minWidth: 170,
//     align: "center",
//     format: (value: number) => value.toLocaleString("en-US"),
//   },

//   {
//     id: "validFrom",
//     label: "Valid From",
//     minWidth: 170,
//     align: "center",
//     format: (value: number) => value.toFixed(2),
//   },
//   {
//     id: "validTo",
//     label: "Valid To",
//     minWidth: 170,
//     align: "center",
//     format: (value: number) => value.toFixed(2),
//   },
//   {
//     id: "details",
//     label: "Details",
//     minWidth: 170,
//     align: "center",
//   },
// ];

// interface Data {
//   userId: string;
//   studentName: string;
//   testType: string;
//   dateOfPurchase: string;
//   validFrom: string;
//   validTo: string;
//   details: React.ReactNode;
// }

//example data type
type UserApiResponse = {
  data: Array<User>;
  meta: {
    totalRowCount: number;
  };
};

type Students = {
  name: string;
  email: string;
  id: number;
  phone: string;
  DOB: string;
};

type User = {
  no: string;
  id: number;
  firstName: string;
  lastName: string;
  address: string;
  state: string | null;
  phoneNumber: string;
};
type EmptyString = "";
//nested data is ok, see accessorKeys in ColumnDef below

const StudentData = () => {
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  // const handleButtonClick = (value: any) => {
  // Use the id value for further processing
  // console.log("Button clicked for ID:", value.getValue());
  // Perform additional actions with the id value
  // };

  // {
  //   accessorKey: "id",
  //   header: "Details",
  //   size: 150,
  //   Cell: ({ cell }: any) => (
  //     <OutlineButton
  //       name="View Details"
  //       func={() => handleButtonClick(cell)}
  //     />
  //   ),
  //   enableSorting: false,
  //   muiTableHeadCellProps: {
  //     align: "center",
  //   },
  //   muiTableBodyCellProps: {
  //     align: "right",
  //   },
  // },
  // const { data, isError, isFetching, isLoading, refetch } =
  //   useQuery<UserApiResponse>({
  //     queryKey: [
  //       "table-data",
  //       columnFilters, //refetch when columnFilters changes
  //       globalFilter, //refetch when globalFilter changes
  //       pagination.pageIndex, //refetch when pagination.pageIndex changes
  //       pagination.pageSize, //refetch when pagination.pageSize changes
  //       sorting, //refetch when sorting changes
  //     ],
  //     queryFn: async () => {
  //       const fetchURL = new URL(
  //         "/api/data",
  //         process.env.NODE_ENV === "production"
  //           ? "https://www.material-react-table.com"
  //           : "http://localhost:3000"
  //       );
  //       fetchURL.searchParams.set(
  //         "start",
  //         `${pagination.pageIndex * pagination.pageSize}`
  //       );
  //       fetchURL.searchParams.set("size", `${pagination.pageSize}`);
  //       fetchURL.searchParams.set(
  //         "filters",
  //         JSON.stringify(columnFilters ?? [])
  //       );
  //       fetchURL.searchParams.set("globalFilter", globalFilter ?? "");
  //       fetchURL.searchParams.set("sorting", JSON.stringify(sorting ?? []));

  //       const response = await fetch(fetchURL.href);
  //       const json = (await response.json()) as UserApiResponse;
  //       return json;
  //     },
  //     keepPreviousData: true,
  //   });

  const { isLoading, data } = useQuery(["show-all-student-details"], () =>
    adminTokenAxios.get(`admin/show-all-student-details`)
  );

  // console.log("Student DAta", data?.data?.user);

  const columns = useMemo<MRT_ColumnDef<Students>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        // Cell: ({ row }) => {
        //   const { index } = row;
        //   return <span>{index + 1}</span>;
        // },
        size: 150,
        // muiTableHeadCellProps: {
        //   align: "center",
        // },
        // muiTableBodyCellProps: {
        //   align: "center",
        // },
      },
      {
        accessorKey: "email",
        header: "Email",
        size: 150,
      },
      {
        accessorKey: "phone",
        header: "Phone No",
        size: 150,
      },

      {
        accessorKey: "DOB",
        header: "dob",
        size: 100,
        Cell: ({ cell }: any) => {
          // const { index } = row;
          return (
            <span>{cell.getValue() === null ? "-" : cell.getValue()}</span>
          );
        },
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      // {
      //   accessorKey: "state",
      //   header: "State",
      //   size: 150,
      // },
      // {
      //   accessorKey: "phoneNumber",
      //   header: "Phone Number",
      //   size: 150,
      // },
      {
        accessorKey: "id",
        header: "Details",
        size: 150,
        Cell: ({ cell }: any) => (
          <Link to={`${cell.getValue()}`}>
            <OutlineButton
              name="View Details"
              // func={() => handleButtonClick(cell)}
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
    data: data?.data?.user,
    // isError: isError,
    // isFetching: isFetching,
    // isLoading: isFetching,
    // refetch: refetch,
    setColumnFilters: setColumnFilters,
    setGlobalFilter: setGlobalFilter,
    setPagination: setPagination,
    setSorting: setSorting,
  };
  return (
    <Container maxWidth="lg">
      <Stack>
        {/* <Header1 header="Student Data" /> */}
        <Box mt={1}>
          <AdvanceTable {...props} />
        </Box>
      </Stack>
    </Container>
  );
};

export default StudentData;
