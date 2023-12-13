import { Alert, Box, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import axiosBaseURL from "../../../Hooks/BaseUrl";
import { Input } from "../../../Components/Common/Input";
import LoadingBar from "../../../Components/Headers/LoadingBar";
import { OButton2 } from "../../../Components/Common/Button";
import OTP from "./OTP";

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

  const getOtpMU = useMutation({
    mutationFn: async (data: Inputs) => {
      console.log(data);

      return await axiosBaseURL.post("/send-otp-mail", data);
    },
    onSuccess: (response) => {
      console.log(response.data);
      setOtp(response.data?.otp);

      if (response.data?.message === "success") {
        setEmail(response.data?.email);
        setEnterOtpForm(true);
      }
      <Alert severity="success">OTP Send Check Your Email</Alert>;
    },
  });

  return (
    <>
      {enterOtpForm ? (
        <OTP
          otpAPI={otp}
          email={email}
          setShowForgotPassword={setShowForgotPassword}
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
