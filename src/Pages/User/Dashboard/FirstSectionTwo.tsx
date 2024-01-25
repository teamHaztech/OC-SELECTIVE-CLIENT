import {
  Card,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Header1 } from "../../../Components/Common/HeaderText";
import { TableHeader } from "../../../Components/Common/Table";
import { AppContext } from "../../../Context/AppContext";
import { CartContext } from "../../../Context/CartContext";
import tokenAxios from "../../../Hooks/TokenAxios";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { UserContext } from "../../../Context/UserContext";
import LoadingBar from "../../../Components/Headers/LoadingBar";
import { Link } from "react-router-dom";

const header = ["Sr. No", "Test name", "Price", ""];

const FirstSectionTwo = ({ data }: any) => {
  const queryClient = useQueryClient();
  // const { cart, removeFromCart, cartUpdate } = CartContext();
  const { user } = AppContext();
  // const { handlePUSuccessOpen2 } = UserContext();
  // const purchaseMU = useMutation({
  //   mutationFn: async (p_id: number) => {
  //     removeFromCart(p_id);
  //     return await tokenAxios.post(`add-user-purchase`, {
  //       p_id: p_id,
  //     });
  //   },
  //   onSuccess: (res) => {
  //     if (res?.status == 200) {
  //       cartUpdate();
  //       handlePUSuccessOpen2();
  //     }
  //   },
  //   onError: (err) => {
  //     console.log(err);
  //   },
  // });

  // const { data, isLoading } = useQuery([user, cart, purchaseMU.data], () =>
  //   tokenAxios.get(`/get-cart-data/${user?.id}`)
  // );

  if (data.isLoading) {
    return <LoadingBar />;
  }
  // console.log("2", data?.data?.remaining_product);

  return (
    <Container maxWidth="xl">
      <Header1 header="Buy Test Packages" />
      <Card sx={{ boxShadow: "5px 5px 20px 0px #808080", my: "15px" }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHeader header={header} />
            <TableBody>
              {data?.data?.remaining_product?.length === 0 ? (
                <TableRow>
                  <TableCell align="center" sx={{ border: 0 }} colSpan={5}>
                    No Item Found
                  </TableCell>
                </TableRow>
              ) : (
                data?.data?.remaining_product.map((item: any, key: number) => {
                  // console.log(item.tsp_id);

                  return (
                    <TableRow key={key}>
                      <TableCell align="center" sx={{ border: 0 }}>
                        {key + 1}
                      </TableCell>
                      <TableCell align="center" sx={{ border: 0 }}>
                        {item.p_name}
                      </TableCell>
                      {/* <TableCell align="center" sx={{ border: 0 }}>
                        {item.duration}
                      </TableCell> */}
                      <TableCell align="center" sx={{ border: 0 }}>
                        {item.p_price}
                      </TableCell>
                      <TableCell align="center" sx={{ border: 0 }}>
                        <Link to={`/product/${item.id}`}>
                          <ShoppingCartIcon
                            sx={{
                              width: "25px",
                              height: "25px",
                              color: "#3A9BDC",
                            }}
                            // onClick={() => purchaseMU.mutate(item.tsp_id)}
                          />
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Container>
  );
};

export default FirstSectionTwo;
