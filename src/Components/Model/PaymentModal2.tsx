import React, { useState, useEffect, useContext } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Box, Dialog, DialogContent, DialogContentText } from "@mui/material";
import tokenAxios from "../../Hooks/TokenAxios";
import { useMutation } from "@tanstack/react-query";
import { CartContext } from "../../Context/CartContext";
import { UserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import AlertBox from "../Common/AlertBox";
import { TempContext } from "../../Context/TempContext";

const Checkout2 = ({
  open,
  handleClose,
  amount,
  tst_id
}: {
  open: boolean;
  handleClose: () => void;
  amount: number;
  tst_id:number;
}) => {
  // const { cart, removeFromCart, CRLoading, RAllFromCart, cartUpdate } =
  //   CartContext();
  // const { handlePUSuccessOpen, handlePUSuccessOpen2, handleClickOpen } =
  //   UserContext();
  const {
    setOpenAlert,
    setMessage,
    success,
    setSuccess,
    setShowPDF,
    setPayment_id,payment_id

  } = useContext(TempContext);

  const [orderID, setOrderID] = useState("");

  const createOrder = (data: any, actions: any) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: "Payment for Question Set",
            amount: {
              currency: "AUD",
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
  const onError = () => {
    setOpenAlert(true);

    setMessage("An Error occured with your payment ");
  };

  useEffect(() => {
    if (success) {
      // purchaseMU.mutate({p_id:cartData,order_id:orderID});
      handleClose();
      setPayment_id([tst_id,...payment_id])
      setOpenAlert(true);
      setShowPDF(true);
      setMessage("Payment Successful");
      // alert("Payment successful!!");
      // console.log("Order successful . Your order id is--", orderID);
    }
  }, [success]);

  return (
    <>
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
              onError={onError}
            />
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Checkout2;
