import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, IconButton, InputAdornment, outlinedInputClasses, TextField } from "@mui/material";
import { ParaText1 } from "./ParaText";
import { useState } from "react";
interface props {
  reg: any;
  inputProps?:any;
  label: string;
  type?: string;
  css?: object;
  defaultVal?: any;
  required?:boolean;
}


const Input = (props: props) => {
  return (
    <Box sx={{ ...props.css }}>
      <ParaText1 text={props.label} css={{ textAlign: "left" }} />
      <TextField

        type={props.type}
        required={props.required ? props.required : true}
        defaultValue={props.defaultVal}
       
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
        {...props.reg}
        {...props.inputProps}
      />
    </Box>
  );
};


const InputPassword = (props: props) => {

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  return (
    <Box sx={{ ...props.css }}>
      <ParaText1 text={props.label} css={{ textAlign: "left" }} />
      <TextField
      
        type={showPassword ? "text" : "password"}
        required={true}
        defaultValue={props.defaultVal}
        
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
        {...props.reg}

        InputProps={{ 
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          )
        }}
       
      />
    </Box>
  );
};



export { Input,InputPassword};
