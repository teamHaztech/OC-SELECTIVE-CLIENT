import Button from "@mui/material/Button";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import React, { ReactNode } from "react";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Switch } from "@mui/material";
import LoadingBar from "../Headers/LoadingBar";

interface props {
  name?: ReactNode;
  func?: (e: any) => void;
  css?: object;
  type?: "button" | "submit" | "reset" | undefined;
  checked?: boolean;
  children?: ReactNode;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const DownloadIconButton = (props: props) => {
  return (
    <Button
      type={props.type}
      variant="outlined"
      onClick={props.func}
      disabled={props.disabled}
    >
      <FileDownloadOutlinedIcon /> {props.name}
    </Button>
  );
};

const EditIconButton = (props: props) => {
  return (
    <Button
      type={props.type}
      variant="outlined"
      onClick={props.func}
      disabled={props.disabled}
    >
      <EditOutlinedIcon />
    </Button>
  );
};

const DeleteIconButton = (props: props) => {
  return (
    <Button
      type={props.type}
      variant="outlined"
      color="error"
      onClick={props.func}
      disabled={props.disabled}
    >
      <DeleteOutlinedIcon />
    </Button>
  );
};

const SwitchComp = (props: props) => {
  return (
    <Switch
      checked={props.checked} // Set the initial state based on API response
      onChange={props.onChange} // Attach the event handler
    />
  );
};

const WButton = (props: props) => {
  return (
    <Button
      variant="contained"
      type={props.type}
      sx={{
        backgroundColor: "#FFFFFF",
        color: "#FA8128",
        borderRadius: "3px",
        height: "60px",
        fontSize: "16px",
        fontWeight: 600,
        border: "1px solid #FA8128",
        "&:hover": {
          backgroundColor: "#FFFFFF ",
        },
        ...props.css,
      }}
      size="large"
      disableElevation
      onClick={props.func}
      disabled={props.disabled}
    >
      {props.children}
      {props.name}
    </Button>
  );
};

const OButton = (props: props) => {
  return (
    <Button
      variant="contained"
      color="warning"
      type={props.type}
      disabled={props.disabled}
      sx={{
        ...props.css,
        backgroundColor: "#FA8128",
        borderRadius: "3px",
        height: "60px",
        fontSize: "16px",
        fontWeight: 600,
        border: "1px solid #F0F0F0",
      }}
      size="large"
      disableElevation
      onClick={props.func}
      startIcon={props.children}
    >
      {props.name}{" "}
    </Button>
  );
};

const BButton = (props: props) => {
  return (
    <Button
      variant="contained"
      type={props.type}
      sx={{
        ...props.css,
        backgroundColor: "#3A9BDC",
        borderRadius: "3px",
      }}
      size="large"
      disableElevation
      onClick={props.func}
      disabled={props.disabled}
    >
      {props.name}
    </Button>
  );
};

const PIButton = (props: props) => {
  return (
    <Button
      type={props.type}
      disabled={props.disabled}
      sx={{
        ...props.css,
        color: "#FA8128",
        backgroundColor: "#FFFFFF",
        borderRadius: "3px",
        border: "1px solid #FA8128",
        "&:hover": {
          color: "#FFFFFF ",
          backgroundColor: "#FA8128",
        },
      }}
      color="warning"
      variant="outlined"
      onClick={props.func}
    >
      <PersonIcon sx={{ ...props.css }} />
    </Button>
  );
};

const SIButton = (props: props) => {
  return (
    <Button
      type={props.type}
      disabled={props.disabled}
      sx={{
        ...props.css,
        color: "#FA8128",
        backgroundColor: "#FFFFFF",
        border: "1px solid #FA8128",
        "&:hover": {
          color: "#FFFFFF ",
          backgroundColor: "#FA8128",
        },
      }}
      variant="outlined"
      color="warning"
      onClick={props.func}
    >
      <SettingsIcon sx={{ ...props.css }} />
    </Button>
  );
};

const OButton2 = (props: props) => {
  return (
    <Button
      variant="contained"
      color="warning"
      type={props.type}
      disabled={props.disabled}
      sx={{
       
        backgroundColor: "#FA8128",
        borderRadius: "3px",
        height: "60px",
        width: "100%",
        fontSize: "16px",
        fontWeight: 600,
        border: "1px solid #F0F0F0",
        ...props.css,
      }}
      size="large"
      disableElevation
      onClick={props.func}
    >
      {props.name}
    </Button>
  );
};

const BButton2 = (props: props) => {
  return (
    <Button
      variant="contained"
      type={props.type}
      disabled={props.disabled}
      sx={{
        backgroundColor: "#3A9BDC",
        color: "#FFFFFF",
        borderRadius: "3px",
        height: "60px",
        width: "360px",
        fontSize: "16px",
        fontWeight: 600,
        border: "1px solid #FFFFFF",
        mx: "auto",
        ...props.css,
      }}
      size="large"
      disableElevation
      onClick={props.func}
    >
      {props.name}{" "}
    </Button>
  );
};

const OButton3 = (props: props) => {
  return (
    <Button
      variant="contained"
      color="warning"
      type={props.type}
      disabled={props.disabled}
      sx={{
        backgroundColor: "#FA8128",
        borderRadius: "3px",
        height: "60px",
        width: "284px",
        fontSize: "16px",
        fontWeight: 600,
        border: "1px solid #F0F0F0",
        m: "auto",
        ...props.css,
      }}
      size="large"
      disableElevation
      onClick={props.func}
    >
      {props.name}{" "}
    </Button>
  );
};
const LoadingButton = (props: props) => {
  return (
    // <LoadingButton sx={{
    //   ...props.css,
    //   borderRadius: "3px",
    //   height: "60px",
    //   fontSize: "16px",
    //   fontWeight: 600,
    //   border: "1px solid #F0F0F0",
    // }}/>
    <Button
      variant="outlined"
      disabled={props.disabled}
      sx={{
        ...props.css,
        borderRadius: "3px",
        backgroundColor: "#FFFFFF",
        height: "60px",
        fontSize: "16px",
        fontWeight: 600,
        border: "1px solid #F0F0F0",
      }}
      disableElevation
      startIcon={props.children}
    >
      <LoadingBar />
    </Button>
  );
};
const OutlineButton = ({ name, func, disabled }: props) => {
  return (
    <Button size="small" variant="outlined" onClick={func} disabled={disabled}>
      {name}
    </Button>
  );
};
export {
  LoadingButton,
  WButton,
  OButton,
  BButton,
  PIButton,
  SIButton,
  OButton2,
  BButton2,
  OButton3,
  OutlineButton,
  DownloadIconButton,
  DeleteIconButton,
  EditIconButton,
  SwitchComp,
};
