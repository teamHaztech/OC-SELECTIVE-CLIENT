import { CheckCircleOutline } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React from "react";
import { WButton } from "../../../Components/Common/Button";
import { UserContext } from "../../../Context/UserContext";

const PWSuccess = ({ setShowForgotPassword }: any) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      textAlign="center"
      marginTop={8}
    >
      <CheckCircleOutline
        fontSize="large"
        color="success"
        sx={{
          width: "200px",
        }}
      />
      <Typography variant="h5" color="success">
        Password Changed Successfully
      </Typography>
      <Typography>Your password has been successfully changed.</Typography>
      <WButton
        name="login"
        func={() => setShowForgotPassword(false)}
        css={{ width: "127px", marginTop: "2rem" }}
      />
    </Box>
  );
};

export default PWSuccess;
