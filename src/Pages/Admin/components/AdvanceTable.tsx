import { IconButton, Tooltip } from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Header1 } from "../../../Components/Common/HeaderText";
export default function AdvanceTable({
  columns,
  data,
  isError,
  isFetching,
  isLoading,
  refetch,
  setColumnFilters,
  setGlobalFilter,
  setPagination,
  setSorting,
}: any) {
  return (
    <MaterialReactTable
      columns={columns}
      enableColumnActions={false}
      data={data ?? []} //data is undefined on first render
      enableFullScreenToggle={false}
      enableDensityToggle={false}
      // initialState={{
      //   density: "compact",
      //   columnOrder: [
      //     "no",
      //     "firstName",
      //     "lastName",
      //     "address",
      //     "state",
      //     "phoneNumber",
      //     "id",
      //   ],
      // }}
      enableRowNumbers
      rowNumberMode="original"
      enableHiding={false}
      // initialState={{ showColumnFilters: true }}
      // manualFiltering
      // manualPagination
      // manualSorting
      // muiToolbarAlertBannerProps={
      //   isError
      //     ? {
      //         color: "error",
      //         children: "Error loading data",
      //       }
      //     : undefined
      // }
      // onColumnFiltersChange={setColumnFilters}
      // onGlobalFilterChange={setGlobalFilter}
      // onPaginationChange={setPagination}
      // onSortingChange={setSorting}
      renderTopToolbarCustomActions={() => (
        <>
          {/* <Header1 header="Student Data" /> */}
          {/* <Tooltip arrow title="Refresh Data">
            <IconButton onClick={() => refetch()}>
              <RefreshIcon />
            </IconButton>
          </Tooltip> */}
        </>
      )}
      // rowCount={data?.meta?.totalRowCount ?? 0}
      // state={{
      //   columnFilters,
      //   globalFilter,
      //   isLoading,
      //   pagination,
      //   showAlertBanner: isError,
      //   showProgressBars: isFetching,
      //   sorting,
      // }}
    />
  );
}
