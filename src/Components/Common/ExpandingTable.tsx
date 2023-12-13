import { useMemo } from "react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";

export type Person = {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  //   state: string;
  subRows?: Person[]; //Each person can have sub rows of more people
};

const data = [
  {
    id: "Dylan",
    lastName: "Murray",
    address: "261",
    city: "East Daphne",
    // state: "Kentucky",
    subRows: [
      {
        firstName: "Ervin",
        lastName: "Reinger",
        address: "",
        city: "South Linda",
        // state: "West Virginia",
      },
      {
        firstName: "Brittany",
        lastName: "McCullough",
        address: "",
        city: "Lincoln",
        // state: "Nebraska",
      },
    ],
  },
];

const ExpandingTable = () => {
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    //column definitions...
    () => [
      {
        accessorKey: "firstName",
        header: "Serial No",
      },
      {
        accessorKey: "lastName",
        header: "Test Package Name",
      },

      {
        accessorKey: "address",
        header: "Total Sales",
      },
      {
        accessorKey: "city",
        header: "",
      },

      //   {
      //     accessorKey: "state",
      //     enableColumnOrdering: false,
      //     header: "State",
      //   },
    ],
    []
    //end
  );

  return (
    <div>
    </div>
    // <MaterialReactTable
    //   columns={columns}
    //   enableColumnActions={false}
    //   enableColumnFilters={false}
    //   enablePagination={false}
    //   enableSorting={false}
    //   enableBottomToolbar={false}
    //   enableTopToolbar={false}
    //   data={data}
    //   enableExpanding
    //   enableExpandAll //default
    // />
  );
};

export default ExpandingTable;
