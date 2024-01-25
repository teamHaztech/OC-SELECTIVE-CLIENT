import { Alert, Box, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import axiosBaseURL from "../../../Hooks/BaseUrl";
import { Input } from "../../../Components/Common/Input";
import LoadingBar from "../../../Components/Headers/LoadingBar";
import { OButton2 } from "../../../Components/Common/Button";
import OTP from "./OTP";
import emailjs from "@emailjs/browser";
interface Props {
  setShowForgotPassword: any;
}
type Inputs = {
  email: string;
};

const ForgotPassword = ({ setShowForgotPassword }: Props) => {
  const [otp, setOtp] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [enterOtpForm, setEnterOtpForm] = useState<boolean>(false);
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (para_data: Inputs) => {
    getOtpMU.mutate(para_data);
  };
  // console.log(otp);
  
  const sendOTPMail = ({
    para_otp,
    email,
  }: {
    para_otp: string | number;
    email: string;
  }) => {
    const OTPDetails = {
      user_email: email,
      otp: para_otp,
    };
    console.log(OTPDetails);
    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICEID,
        import.meta.env.VITE_MAILJS_OTP_TEMPLATEID,
        OTPDetails,
        import.meta.env.VITE_MAILJS_PUBLIC_KEY
      )
      .then(
        (result) => {
          // console.log(result.text);
        },
        (error) => {
          console.log("error " + error.text);
        }
      );
  };
  const getOtpMU = useMutation({
    mutationFn: async (data: Inputs) => {
      // console.log(data);

      return await axiosBaseURL.post("/send-otp-mail", data);
    },
    onError: (err) => {
      console.log("err " + err);
    },
    onSuccess: (response) => {
      console.log("email:", response.data.email);
      console.log("OTP:", response.data.otp);
      // console.log("OTP:", response.status);
      // console.log(JSON.stringify(response).data);

      if (response.status == 200) {
        const email: string = response.data.email;
        const otp: string = response.data.otp;
        response.data.otp;
        setOtp(otp);
        setEmail(email);
        setEnterOtpForm(true);
        sendOTPMail({ email: email, para_otp: otp });
      }
      // <Alert severity="success">OTP Sent Check Your Email</Alert>;
    },
  });

  return (
    <>
      {enterOtpForm ? (
        <OTP
          otpAPI={otp}
          email={email}
          setShowForgotPassword={setShowForgotPassword}
          sendOTPMail={sendOTPMail}
          mainSetOtp={setOtp}
        />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Enter Your Email "
            type="email"
            reg={register("email")}
            css={{ my: "20px" }}
          />

          {getOtpMU?.isError && (
            <Typography sx={{ color: "red", textAlign: "left", mb: "6px" }}>
              *Email Not Found
            </Typography>
          )}

          {getOtpMU.isLoading ? (
            <Box
              sx={{
                height: "60px",
                width: "80%",
              }}
            >
              <LoadingBar />
            </Box>
          ) : (
            <OButton2
              name="Send OTP"
              css={{ my: "30px", width: "100%" }}
              type="submit"
            />
          )}
        </form>
      )}
    </>
  );
};

export default ForgotPassword;
