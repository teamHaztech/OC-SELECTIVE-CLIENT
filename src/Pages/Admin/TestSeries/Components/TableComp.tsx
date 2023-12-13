import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { type MRT_ColumnDef } from "material-react-table";
import { data, type Person } from "../../../../Components/Common/makeData";
import { useMemo } from "react";
import SimpleTable from "../../../../Components/Common/SimpleTable";
import { useQuery } from "@tanstack/react-query";
import adminTokenAxios from "../../../../Hooks/AdminTokenAxios";
import LoadingBar from "../../../../Components/Headers/LoadingBar";

interface TableCompProps {
  tabId: string | number;
}

type ProductListApiResponse = {
  data: Array<ProductList>;
};

type ProductList = {
  id: number;
  p_name: string;
  p_description: string;
  p_price: string;
  p_image: string;
  ts_id: number;
  duration: number;
  test_month_limit: number;
  total_question: number;
  release_date: string;
  status: number;
  purchaseCount: number;
};

const TableComp = ({ tabId }: TableCompProps) => {
  const products = useQuery<ProductListApiResponse>({
    queryKey: ["productsList", tabId],
    queryFn: async () => {
      try {
        const response = await adminTokenAxios.get(
          `admin/show-product/${tabId}`
        );
        console.log("Products", response.data?.product);

        return response.data?.product;
      } catch (error) {
        console.error(error);
      }
    },
  });

  console.log("products", products.data);

  const columns = useMemo<MRT_ColumnDef<ProductList>[]>(
    //column definitions...
    () => [
      {
        accessorKey: "p_name",
        header: "Package Name",
      },

      {
        accessorKey: "purchaseCount",
        header: "Total Purchases",
      },
      {
        accessorKey: "release_date",
        header: "Release Date",
      },
      {
        accessorKey: "id",
        header: "",
        Cell: ({ cell }) => (
          <Link to={`package-details/${cell.getValue<string>()}`}>
            <Button variant="outlined">View</Button>
          </Link>
        ),
      },
    ],
    []
    //end
  );

  return (
    <>
      {products.isLoading ? (
        <LoadingBar/>
      ) : products.isSuccess ? (
        <SimpleTable columns={columns} data={products?.data} />
      ) : (
        <div>No Data</div>
      )}
    </>
  );
};

export default TableComp;
