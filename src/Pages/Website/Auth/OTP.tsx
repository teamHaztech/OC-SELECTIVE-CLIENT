import { Box, TextField, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import OtpInput from "react-otp-input";
import { OButton2 } from "../../../Components/Common/Button";
import SetNewPassword from "./SetNewPassword";
import { ParaText1, ParaText3 } from "../../../Components/Common/ParaText";

interface Props {
  otpAPI: string;
  email: string;
  setShowForgotPassword: any;
  sendOTPMail: any;
  mainSetOtp: any;
}

const OTP = ({
  otpAPI,
  email,
  setShowForgotPassword,
  sendOTPMail,
  mainSetOtp,
}: Props) => {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const handleCheckOtp = () => {
    setLoading(true);
    if (parseInt(otpAPI) === parseInt(otp)) {
      // console.log("correct");
      setLoading(false);
      setNewPassword(true);
    } else {
      setLoading(false);
      setError(true);
      // console.log("wrong");
    }
  };
  const resendOTP = () => {
    let otpArray = "";

    for (let i = 0; i < 4; i++) {
      const index = Math.floor(Math.random() * 10);
      otpArray += String(index);
    }
    // console.log(otpArray);
    mainSetOtp(otpArray);

    sendOTPMail({ email: email, para_otp: otpArray });
  };
  useEffect(() => {
    setError(false);
  }, [otp]);
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
          {error && (
            <ParaText1
              text={"*Wrong OTP"}
              css={{ mx: "auto", color: "red", cursor: "pointer", mt: 2 }}
              // func={resendOTP}
            />
          )}
          <OButton2
            name={loading ? "Submitting" : "Submit"}
            css={{ my: "30px", width: "100%" }}
            func={handleCheckOtp}
            type="submit"
          />

          <ParaText1
            text={"Resend OTP"}
            css={{ mx: "auto", color: "#FA8128", cursor: "pointer" }}
            func={resendOTP}
          />
        </>
      )}
    </>
  );
};

export default OTP;
