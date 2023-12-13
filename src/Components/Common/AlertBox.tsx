import React from "react";
import { Alert, Snackbar, Stack } from "@mui/material";
import { UserContext } from "../../Context/UserContext";

interface props {
  name: string;
  type: "error" | "warning" | "info" | "success";
  bol: boolean;
  handleAlertBoxClose:()=>void;
  duration?:number;
}

const AlertBox = (props: props) => {
  return (
    <Stack sx={{ width: "100%" }}>
      <Snackbar
        open={props.bol}
        autoHideDuration={props.duration ? props.duration: 6000}
        onClose={props.handleAlertBoxClose}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <Alert
          onClose={props.handleAlertBoxClose}
          severity={props.type}
          sx={{ width: "100%" }}
        >
          {props.name}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default AlertBox;
