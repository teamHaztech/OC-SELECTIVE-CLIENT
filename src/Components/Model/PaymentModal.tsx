import React, { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Box, Dialog, DialogContent, DialogContentText } from "@mui/material";
import tokenAxios from "../../Hooks/TokenAxios";
import { useMutation } from "@tanstack/react-query";
import { CartContext } from "../../Context/CartContext";
import { UserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";

const Checkout = ({
  open,
  handleClose,
  cartData,
  amount,
}: {
  open: boolean;
  handleClose: () => void;
  amount: number;
  cartData: number | number[] | undefined;
}) => {
  const { cart, removeFromCart, CRLoading, RAllFromCart, cartUpdate } =
    CartContext();
  const { handlePUSuccessOpen, handlePUSuccessOpen2, handleClickOpen } =
    UserContext();
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [orderID, setOrderID] = useState("");
  const navigate = useNavigate();
  console.log(amount);

  const purchaseMU = useMutation({
    mutationFn: async ({
      p_id,
      order_id,
    }: {
      p_id: number | number[] | undefined;
      order_id: string;
    }) => {
      // console.log(p_id);
      return await tokenAxios.post(`add-user-purchase`, {
        p_id:p_id,
        order_id:order_id,
      });
    },
    onSuccess: (res: any) => {
      if (res?.status == 200) {
        typeof cartData == "number" ? cartUpdate() : RAllFromCart();
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

  const createOrder = (data: any, actions: any) => {
    return actions.order
      .create({
        purchase_units: [
          {
            // description: "Sunflower",
            amount: {
              currency_code: "USD",
              value: amount,
            },
          },
        ],
      })
      .then((orderID: any) => {
        setOrderID(orderID);
        return orderID;
      });
  };

  // check Approval
  const onApprove = (data: any, actions: any) => {
    return actions.order.capture().then(function (details: any) {
      const { payer } = details;
      setSuccess(true);
    });
  };

  //capture likely error
  const onError = (data: any, actions: any) => {
    alert("Payment Failed!!");
    setErrorMessage("An Error occured with your payment ");
  };

  useEffect(() => {
    if (success) {
      purchaseMU.mutate({p_id:cartData,order_id:orderID});
      handleClose();
      // alert("Payment successful!!");
      console.log("Order successful . Your order id is--", orderID);
    }
  }, [success]);

  return (
    <Dialog onClose={handleClose} open={open} sx={{ height: "100%" }}>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          rowGap: "43px",
          height: "50%",
        }}
      >
        <DialogContentText
          textAlign={"center"}
          fontSize={"20px"}
          fontWeight={"600"}
        >
          Payment Method
        </DialogContentText>
        <Box
          noValidate
          component="form"
          sx={{
            width: "500px",

            m: "auto",
          }}
        >
          <PayPalButtons
            style={{ layout: "vertical" }}
            createOrder={createOrder}
            onApprove={onApprove}
            
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default Checkout;
