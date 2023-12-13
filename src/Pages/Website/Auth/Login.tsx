import { Box, Typography, Alert, InputAdornment } from "@mui/material";
import { Input, InputPassword } from "../../../Components/Common/Input";
import { useForm, SubmitHandler } from "react-hook-form";
import { LoadingButton, OButton2 } from "../../../Components/Common/Button";
import { useMutation } from "@tanstack/react-query";
import axiosBaseURL from "../../../Hooks/BaseUrl";
import LoadingBar from "../../../Components/Headers/LoadingBar";
import { AppContext } from "../../../Context/AppContext";

import { CartContext } from "../../../Context/CartContext";
import { useState } from "react";
import ForgotPassword from "./ForgotPassword";
// import { LoadingButton } from "@mui/lab";

type Inputs = {
  email: string;
  password: string;
};
// type userData = {
//   id: number;
//   name: string;
//   email: string;
// };
const Login = () => {
  const [showForgotPassword, setShowForgotPassword] = useState<boolean>(false);
  const { login } = AppContext();
  const { addToCartFL } = CartContext();
  const { register, handleSubmit } = useForm<Inputs>();

  const LoginMU = useMutation({
    mutationFn: async (data: Inputs) => {
      return await axiosBaseURL.post("/login", data);
    },
    onSuccess: (response) => {
      const user = response.data?.user;
      const accessToken = response.data?.access_token;

      if (user && accessToken) {
        login(user, accessToken);
        addToCartFL(user.id);
      }
      <Alert severity="success">SuccessFully Logged</Alert>;
    },
  });

  // if (LoginMU.isLoading) {
  //   return <LoadingBar />;
  // }

  const onSubmit: SubmitHandler<Inputs> = async (para_data: Inputs) => {
    LoginMU.mutate(para_data);
  };

  return (
    <Box
      sx={{
        width: { lg: "440px" },
        height: { lg: "410px" },
        display: "flex",
        flexDirection: "column",
        px: "30px",
        // justifyContent: "center",
        // alignItems: "center",
      }}
    >
      {showForgotPassword ? (
        <ForgotPassword setShowForgotPassword={setShowForgotPassword} />
      ) : (
        <>
          {LoginMU?.status === "error" && (
            <Typography sx={{ color: "red", textAlign: "left" }}>
              *Email and Password does not match
            </Typography>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Email"
              type="email"
              reg={register("email")}
              css={{ my: "20px" }}
            />
            <InputPassword
              label="Password"
              reg={register("password")}
              css={{ my: "30px" }}
            />
            <Typography
              sx={{
                color: "#FA8128",
                textAlign: "right",
                cursor: "pointer",
                "&:hover": {
                  color: "#e65100",
                },
              }}
              onClick={() => setShowForgotPassword(true)}
            >
              Forgot Password?
            </Typography>
            {LoginMU.isLoading ? (
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
                name="Login"
                css={{ my: "30px", width: "100%" }}
                type="submit"
              />
            )}
          </form>
        </>
      )}
    </Box>
  );
};

export default Login;
