import {
  Box,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  TextField,
  Typography,
  outlinedInputClasses,
} from "@mui/material";
import { Input } from "../../../Components/Common/Input";
import { useForm, SubmitHandler } from "react-hook-form";
import { OButton2 } from "../../../Components/Common/Button";
import { useMutation } from "@tanstack/react-query";
import axiosBaseURL from "../../../Hooks/BaseUrl";
import { AppContext } from "../../../Context/AppContext";
import { AxiosError } from "axios";
import { CartContext } from "../../../Context/CartContext";
import LoadingBar from "../../../Components/Headers/LoadingBar";
import { ParaText1 } from "../../../Components/Common/ParaText";

type Inputs = {
  email: string;
  password: string;
  phone: string;
  fname: string;
  lname: string;
};

const Register = () => {
  const { login } = AppContext();
  const { addToCartFL } = CartContext();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<Inputs>();
  const RegisterMU = useMutation({
    mutationFn: async (data: Inputs) => {
      return await axiosBaseURL.post("/register", data);
    },
    onSuccess: (response) => {
      const user = response.data?.user;
      const accessToken = response.data?.access_token;

      if (user && accessToken) {
        login(user, accessToken);
        addToCartFL(user.id);
      }
    },
    // onError:(err) => {
    //     console.log(err.response);

    // }
  });
  const onSubmit: SubmitHandler<Inputs> = async (para_data: Inputs) => {
    RegisterMU.mutate(para_data);
  };
  const errorResponse: any = (RegisterMU.error as AxiosError)?.response?.data;
  if (errorResponse && errorResponse.email) {
    const emailErrorMessage = errorResponse.email[0];
  }

  return (
    <Box
      sx={{
        width: { lg: "440px" },
        height: { lg: "490px" },
        display: "flex",
        flexDirection: "column",
        px: "30px",
      }}
    >
      {errorResponse?.email && (
        <Typography sx={{ color: "red", textAlign: "left" }}>
          *Email is already taken
        </Typography>
      )}
      {errorResponse?.phone && (
        <Typography sx={{ color: "red", textAlign: "left" }}>
          *Phone Number is already taken
        </Typography>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input label="Email" type="email" reg={register("email")} />
        {/* <Input
          label="Phone Number"
         InputProps={InputProps={
            startAdornment: <InputAdornment position="start">kg</InputAdornment>,
          }}
          type="tel"
          reg={register("phone", { maxLength: 10 })}
          css={{ my: "30px" }}
        /> */}
        <Box sx={{my:4}}>
        <ParaText1 text="Phone Number" css={{ textAlign: "left" }} />
         <TextField
         type="tel"
         required={true}
          InputLabelProps={{
            sx: {
              color: "#000000",
              fontWeight: "500",
            },
          }}
          sx={{
            width: "100%",
            height: "36px",
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#FFFFFF",
              color: "#000000",
              [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
                borderColor: "#FA8128",
              },
              [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
                border: "1px solid #FA8128",
              },
            },
          }}
         {...register("phone", { maxLength: 10 })}
          InputProps={{
            startAdornment: <InputAdornment position="start">+61</InputAdornment>,
          }}
        />
        </Box>
        
        {errors.phone && (
          <Typography sx={{ mt: 3, p: 0, color: "red" }}>
            *It should contain 10 digits
          </Typography>
        )}
        <Input
          label="Password"
          type="password"
          reg={register("password", { minLength: 8, maxLength: 16 })}
          css={{ my: "30px" }}
        />
        {errors.password && (
          <Typography sx={{ mt: 3, p: 0, color: "red" }}>
            *Minimum 8 - Maximum 16 character
          </Typography>
        )}
        <Box
          sx={{
            display: "flex",
            flexWrap: { sm: "wrap", md: "nowrap", xs: "wrap" },
            my: "30px",
          }}
        >
          <Input
            label="First Name"
            type="text"
            reg={register("fname")}
            css={{ pr: { lg: "10px", md: "10px", sm: "0", xs: "0" } }}
          />
          <Input
            label="Last Name"
            type="text"
            reg={register("lname")}
            css={{
              pr: { lg: "10px", md: "10px", sm: "0", xs: "0" },
              mt: { lg: "0px", md: "0px", sm: "10px", xs: "30px" },
            }}
          />
        </Box>
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="By signing up you agree to our terms and conditions."
          sx={{ fontSize: "14px" }}
        />
        {RegisterMU.isLoading ? (
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
            name="Register"
            css={{ my: "30px", width: "100%" }}
            type="submit"
          />
        )}
      </form>
    </Box>
  );
};

export default Register;
