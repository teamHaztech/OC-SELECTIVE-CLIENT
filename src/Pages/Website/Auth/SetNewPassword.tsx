import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import tokenAxios from "../../../Hooks/TokenAxios";
import { SubmitHandler, useForm } from "react-hook-form";
import { Box, Stack, Typography } from "@mui/material";
import { Input, InputPassword } from "../../../Components/Common/Input";
import { OButton, WButton } from "../../../Components/Common/Button";
import { Header1, Header2 } from "../../../Components/Common/HeaderText";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import PWSuccess from "./PWSuccess";

interface Props {
  email: string;
  setShowForgotPassword: any;
}

type Inputs = {
  new_password: string;
  confirm_password: string;
};

type para_data = {
  new_password: string;
};

type data = {
  new_password: string;
  email: string;
};

const SetNewPassword = ({ email, setShowForgotPassword }: Props) => {
  const [success, setSuccess] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    control,
  } = useForm<Inputs>();

  const passwordChange = useMutation({
    mutationFn: async (data: data) => {
      return await tokenAxios.post("/password-change2", data);
    },
    onSuccess: (response) => {
      setSuccess(true);
      console.log("changed", response.data);
      //   dispatch({ type: "SET_dataSubmit", payload: false });
      //   handlePC2Close();
      //   handleSuccessOpen();
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (para_data: para_data) => {
    const data = {
      new_password: para_data.new_password,
      email: email,
    };
    console.log("change pass", data);

    passwordChange.mutate(data);
    // passwordCheck.mutate(para_data);
    // setPasswordData(para_data);
  };
  return (
    <>
      {success ? (
        <PWSuccess setShowForgotPassword={setShowForgotPassword} />
      ) : (
        <>
          <Stack
            spacing={1}
            direction="row"
            sx={{ my: "28px" }}
            margin={"auto"}
            alignItems={"center"}
          >
            <LockOpenIcon
              sx={{ height: "30px", width: "30px", color: "#FA8128" }}
            />
            <Header2 header="CHANGE PASSWORD" />
          </Stack>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4} direction="column" margin="auto">
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <InputPassword
                  label="New Password"
                  reg={register("new_password", {
                    minLength: { value: 8, message: "Minimum 8 characters" },
                    maxLength: {
                      value: 16,
                      message: "Maximum 16 characters",
                    },
                  })}
                />
                {errors.new_password && (
                  <Typography sx={{ mt: 3, p: 0, color: "red" }}>
                    {errors.new_password.message}
                  </Typography>
                )}
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Input
                  label="Confirm Password"
                  type="password"
                  reg={register("confirm_password", {
                    validate: (value) =>
                      value === watch("new_password") ||
                      "Passwords do not match",
                  })}
                />
                {errors.confirm_password && (
                  <Typography sx={{ mt: 3, p: 0, color: "red" }}>
                    {errors.confirm_password.message}
                  </Typography>
                )}
              </Box>
              <Stack
                spacing={{ lg: 6, md: 6, sm: 6, xs: 2 }}
                direction="row"
                marginX="auto"
              >
                {/* <WButton
                    name="CANCEL"
                    css={{ width: "177px" }}
                    func={handlePCClose}
                  /> */}
                <OButton name="Submit" css={{ width: "100%" }} type="submit" />
              </Stack>
            </Stack>
          </form>
        </>
      )}
    </>
  );
};

export default SetNewPassword;
