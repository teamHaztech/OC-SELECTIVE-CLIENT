import { Box, TextField, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import OtpInput from "react-otp-input";
import { OButton2 } from "../../../Components/Common/Button";
import SetNewPassword from "./SetNewPassword";

interface Props {
  otpAPI: string;
  email: string;
  setShowForgotPassword: any;
}

const OTP = ({ otpAPI, email, setShowForgotPassword }: Props) => {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState<boolean>(false);
  console.log(otpAPI);

  const handleCheckOtp = () => {
    if (parseInt(otpAPI) === parseInt(otp)) setNewPassword(true);
    else console.log("wrong");
  };

  return (
    <>
      {newPassword ? (
        <SetNewPassword
          email={email}
          setShowForgotPassword={setShowForgotPassword}
        />
      ) : (
        <>
          <Typography variant="body2" textAlign={"center"} my={2}>
            Enter OTP
          </Typography>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={4}
            renderSeparator={<span>-</span>}
            renderInput={(props) => <input {...props} />}
            inputStyle={{
              border: "1px solid gray",
              borderRadius: "8px",
              width: "54px",
              height: "54px",
              fontSize: "20px",
              color: "#000",
              fontWeight: "400",
              caretColor: "blue",
              marginLeft: "1rem",
              marginRight: "1rem",
            }}
          />
          <OButton2
            name="Submit"
            css={{ my: "30px", width: "100%" }}
            func={handleCheckOtp}
            type="submit"
          />
        </>
      )}
    </>
  );
};

export default OTP;
