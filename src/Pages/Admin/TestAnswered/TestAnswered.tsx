import React from "react";
import AdvanceTable from "../components/AdvanceTable";
import { Box, Container, Stack } from "@mui/material";
import {
  type MRT_ColumnDef,
  type MRT_ColumnFiltersState,
  type MRT_PaginationState,
  type MRT_SortingState,
} from "material-react-table";
import { useMemo, useState } from "react";
import { OutlineButton } from "../../../Components/Common/Button";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { data } from "../components/Mock_Data";

//example data type
type UserApiResponse = {
  data: Array<User>;
  meta: {
    totalRowCount: number;
  };
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

const TestAnswered = () => {
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      {
        accessorKey: "no",
        header: "No.",
        Cell: ({ row }: any) => {
          const { index } = row;
          return <span>{index + 1}</span>;
        },
        size: 100,
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },
      },
      {
        accessorKey: "firstName",
        header: "First Name",
        size: 150,
      },
      {
        accessorKey: "lastName",
        header: "Last Name",
        size: 150,
      },

      {
        accessorKey: "address",
        header: "Address",
        size: 150,
      },
      {
        accessorKey: "state",
        header: "State",
        size: 150,
      },
      {
        accessorKey: "phoneNumber",
        header: "Phone Number",
        size: 150,
      },
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

  const props = {
    columns: columns,
    data: data,
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

export default TestAnswered;
