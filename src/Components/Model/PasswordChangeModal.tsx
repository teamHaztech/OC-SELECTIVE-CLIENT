import { Box, Dialog, Stack, Typography } from "@mui/material";
import { UserContext } from "../../Context/UserContext";
import { OButton, WButton } from "../Common/Button";
import { Header1 } from "../Common/HeaderText";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Input, InputPassword } from "../Common/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { AppContext } from "../../Context/AppContext";
import LoadingBar from "../Headers/LoadingBar";
import axiosBaseURL from "../../Hooks/BaseUrl";
import tokenAxios from "../../Hooks/TokenAxios";

type Inputs = {
  prev_password: string;
  new_password: string;
  confirm_password: string;
};

type para_data = {
  prev_password: string;
  new_password: string;
};

const PasswordChangeModal = () => {
  const { token } = AppContext();

  const {
    openPC,
    handlePCClose,
    handlePC2Open,
    dataSubmit,
    dispatch,
    handleSuccessOpen,
    handlePC2Close,
    openPC2,
  } = UserContext();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    control,
  } = useForm<Inputs>();

  const [passwordData, setPasswordData] = useState<para_data>({
    prev_password: "",
    new_password: "",
  });

  const passwordCheck = useMutation({
    mutationFn: async (data: para_data) => {
      return await tokenAxios.post("/password-check", data);
    },
    onSuccess: (res) => {
      console.log(res?.status);
      if(res?.status===200){
        handlePCClose();
        handlePC2Open();

      }
    },
  });

  const passwordChange = useMutation({
    mutationFn: async (data: para_data) => {
      return await tokenAxios.post("/password-change", data);
    },
    onSuccess: (response) => {
      console.log("changed");
      dispatch({ type: "SET_dataSubmit", payload: false });
      handlePC2Close();
      handleSuccessOpen();
    },
  });

  useEffect(() => {
    reset({
      prev_password: "",
      new_password: "",
      confirm_password: "",
    });
  }, [openPC]);

  useEffect(() => {
    if (dataSubmit == true && openPC2 == true) {
      passwordChange.mutate(passwordData);
    }
  }, [dataSubmit]);

  const onSubmit: SubmitHandler<Inputs> = async (para_data: para_data) => {
    passwordCheck.mutate(para_data);
    setPasswordData(para_data);
  };

console.log(passwordCheck?.data);

  return (
    <Dialog onClose={handlePCClose} open={openPC}>
      (
      <Box
        sx={{
          width: { lg: "482px", md: "482px", sm: "482px", xs: "320px" },
          height: "499px",
          display: "flex",
          flexDirection: "column",
          px: "40px",
        }}
      >
        {passwordCheck.isLoading ? (
          <LoadingBar />
        ) : (
          <>
            <Stack
              spacing={1}
              direction="row"
              margin="auto"
              sx={{ my: "28px" }}
            >
              <LockOpenIcon
                sx={{ height: "30px", width: "30px", color: "#FA8128" }}
              />
              <Header1 header="CHANGE PASSWORD" />
            </Stack>

            {passwordCheck?.data && passwordCheck?.data?.status !== 200 && (
              <Typography sx={{ color: "red", textAlign: "left", mb: "6px" }}>
                *Incorrect Current Password
              </Typography>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={4} direction="column" margin="auto">
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <InputPassword
                    label="Current Password"
                    reg={register("prev_password", {
                      minLength: { value: 8, message: "Minimum 8 characters" },
                      maxLength: {
                        value: 16,
                        message: "Maximum 16 characters",
                      },
                    })}
                  />
                  {errors.prev_password && (
                    <Typography sx={{ mt: 3, p: 0, color: "red" }}>
                      {errors.prev_password.message}
                    </Typography>
                  )}
                </Box>
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
                  <WButton
                    name="CANCEL"
                    css={{ width: "177px" }}
                    func={handlePCClose}
                  />
                  <OButton name="NEXT" css={{ width: "177px" }} type="submit" />
                </Stack>
              </Stack>
            </form>
          </>
        )}
      </Box>
      )
    </Dialog>
  );
};

export default PasswordChangeModal;
