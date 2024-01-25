import { SubmitHandler, useForm } from "react-hook-form";
import { Box, Container, Typography } from "@mui/material";
import { Input } from "../Common/Input";
import { OButton2 } from "../Common/Button";
import { Header1 } from "../Common/HeaderText";
import { AppContext } from "../../Context/AppContext";
import { useMutation } from "@tanstack/react-query";
import axiosBaseURL from "../../Hooks/BaseUrl";
import LoadingBar from "../Headers/LoadingBar";

type Inputs = {
  email: string;
  password: string;
};

const LoginComponent = () => {
  const { adminLogin } = AppContext();
  const {
    register,
    handleSubmit,
    // watch,
    // formState: { errors },
    // reset,
  } = useForm<Inputs>();

  const adminLoginMutation = useMutation({
    mutationFn: async (data: Inputs) => {
      return await axiosBaseURL.post("/admin/login", data);
    },
    onSuccess: (response) => {
      const user = response.data?.user;
      const accessToken = response.data?.access_token;

      if (user && accessToken) {
        adminLogin(user, accessToken);
      }
    },
  });

  if (adminLoginMutation.isLoading) {
    return <LoadingBar />;
  }

  const onSubmit: SubmitHandler<Inputs> = async (para_data: Inputs) => {
    adminLoginMutation.mutate(para_data);
  };
  return (
    <Container
      maxWidth="sm"
      sx={{
        my: "10rem",
      }}
    >
      <Box
        sx={{
          //   width: { lg: "440px" },
          //   height: { lg: "410px" },
          display: "flex",
          flexDirection: "column",
          textAlign: "center",

          px: "30px",
        }}
      >
        <Header1 header="Admin Login" css={{ mb: "1rem" }} />
        {adminLoginMutation?.status === "error" && (
          <Typography sx={{ color: "red", textAlign: "left" }}>
            *Email and Password does not match
          </Typography>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Email"
            type="email"
            reg={register("email")}
            css={{ mb: "30px" }}
          />
          <Input
            label="Password"
            type="password"
            reg={register("password")}
            css={{ my: "20px" }}
          />
          {/* <Typography sx={{ color: "#FA8128", textAlign: "right" }}>
            Forgot Password?
          </Typography> */}
          <OButton2
            name="Login"
            css={{ my: "30px", width: "100%" }}
            type="submit"
          />
        </form>
      </Box>
    </Container>
  );
};

export default LoginComponent;
