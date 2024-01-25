import {
  Box,
  Container,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Stack,
  Button,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  DeleteIconButton,
  OButton,
  OButton2,
  WButton,
} from "../../../Components/Common/Button";
import { Header1, Header2 } from "../../../Components/Common/HeaderText";
import { CartContext } from "../../../Context/CartContext";
import UseGet from "../../../Hooks/UseGet";
import { Link, useNavigate } from "react-router-dom";
import LoadingBar from "../../../Components/Headers/LoadingBar";
import { AppContext } from "../../../Context/AppContext";
import tokenAxios from "../../../Hooks/TokenAxios";
import axiosBaseURL from "../../../Hooks/BaseUrl";
import { UserContext } from "../../../Context/UserContext";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useState } from "react";
import PaymentModal from "../../../Components/Model/PaymentModal";
function createData(
  srNo: number,
  courses: string,
  testSeries: string,
  price: string
) {
  return { srNo, courses, testSeries, price };
}
const tHead = ["#", "Package Names", "Test Series", "Price", "Action"];

const Cart = () => {
  const [cartData, setCartData] = useState<number[]>([]);
  const [amount, setAmount] = useState<number>(0);
  const { cart, removeFromCart, CRLoading, RAllFromCart } = CartContext();
  const { user } = AppContext();
  const navigate = useNavigate();
  const { handlePUSuccessOpen, handlePUSuccessOpen2, handleClickOpen } =
    UserContext();
  const [open, setOpen] = useState<boolean>(false);
  const handleAlertBoxOpen = () => {
    setOpen(true);
  };

  const handleAlertBoxClose = () => {
    setOpen(false);
  };
  const purchaseMU = useMutation({
    mutationFn: async (p_id: number[]) => {
      console.log(p_id);
      return await tokenAxios.post(`add-user-purchase`, {
        p_id: p_id,
      });
    },
    onSuccess: (res: any) => {
      if (res?.status == 200) {
        RAllFromCart();
        handlePUSuccessOpen2();
      } else {
        handlePUSuccessOpen();
        navigate("/");
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });

  // const { data: newData, isLoading: Loading, } = useQuery(
  //   [user,cart,purchaseMU.data,'userCart'],
  //   () => tokenAxios.get(`/get-cart-data/${user?.id}`),
  //   { enabled: !!user}
  // );

  const { isLoading, data } = useQuery(
    [user, cart, "product"],
    () => axiosBaseURL.get(`/get-product-data`)
    // { enabled: !user }
  );

  let filter_data: any = [];

  // console.log(newData);

  const loginCheck = (id: number[], amount: number) => {
    if (user) {
      setCartData(id);
      setAmount(amount);
      handleAlertBoxOpen();
      // purchaseMU.mutate(id);
      return 0;
    }
    handleClickOpen("1");
  };

  if (purchaseMU.isLoading && !user) {
    return <LoadingBar />;
  }

  if (isLoading) {
    return <LoadingBar />;
  }

  if (CRLoading) {
    return <LoadingBar />;
  }
  // console.log(cartData);
  // if (user) {
  // filter_data = newData?.data.cart_data?.map((item: any) => {
  //   return item.ts_product;
  // });
  // } else {
  //   filter_data = data?.data.product_data.filter((item: any) => {
  //     return cart.includes(item.id);
  //   });

  // }

  filter_data = data?.data.product_data.filter((item: any) => {
    return cart.includes(item.id);
  });

  let arr: number[] = [];
  let t_amount: number = 0;
  return (
    <>
      <Container maxWidth="xl" sx={{ my: "50px" }}>
        <Header1 header="CHECKOUT CART" />
        <Box sx={{ m: "30px" }}>
          {filter_data?.length != 0 && (
            <TableContainer
              sx={{ maxWidth: "770px", borderBottom: "1px solid " }}
            >
              <Table sx={{ width: "770px" }}>
                <TableHead>
                  <TableRow>
                    {tHead.map((item: string, key) => {
                      return (
                        <TableCell align="center" key={key}>
                          {item}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filter_data?.map((item: any, key: number) => {
                    arr.push(item.id);
                    t_amount += parseFloat(item.p_price);
                    return (
                      <TableRow key={key}>
                        <TableCell align="center" sx={{ border: "none" }}>
                          {key + 1}
                        </TableCell>
                        <TableCell align="center" sx={{ border: "none" }}>
                          {item.p_name}
                        </TableCell>
                        <TableCell align="center" sx={{ border: "none" }}>
                          {item.p_description}
                        </TableCell>
                        <TableCell align="center" sx={{ border: "none" }}>
                          {item.p_price}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ border: "none", cursor: "pointer" }}
                          onClick={() => removeFromCart(item.id)}
                        >
                          <DeleteIconButton />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
        {filter_data?.length !== 0 ? (
          <Stack
            spacing={8}
            direction="row"
            sx={{
              maxWidth: "770px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Link to="/">
              <WButton name="Back" css={{ width: "127px" }} />
            </Link>
            <OButton name="Checkout" func={() => loginCheck(arr, t_amount)} />
          </Stack>
        ) : (
          <Stack
            spacing={2}
            direction="column"
            sx={{
              maxWidth: "370px",
              display: "flex",
              textAlign: "center",
              mx: "auto",
            }}
          >
            <Header2 header="No Item in cart" />
            <Link to="/">
              <OButton2 name="Go to home" />
            </Link>
          </Stack>
        )}
      </Container>
      <PaymentModal
        amount={amount}
        open={open}
        handleClose={handleAlertBoxClose}
        cartData={cartData}
      />
    </>
  );
};

export default Cart;
