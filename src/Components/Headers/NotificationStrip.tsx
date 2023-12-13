import { Box, Typography, makeStyles } from "@mui/material";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { Link } from "react-router-dom";

const slideRightToLeft = keyframes`
  0% {
    transform: translateX(60%);
  }
  100% {
    transform: translateX(-70%);
  }
`;

const AnimatedText = styled.p`
  animation: ${slideRightToLeft} 25s linear infinite;
  /* overflow-y: auto; */
  white-space: nowrap;
`;

const NotificationStrip = ({ data }: any) => {
  return (
    <Box
      bgcolor={"#ffbf69"}
      mb={1}
      py={1}
      textAlign={"center"}
      // sx={{ display: "inline" }}
    >
      <Link to="/user/Test-schedule">
        <AnimatedText>
          {data.map((item: any) => (
            <Typography
              component={"span"}
              key={item.id}
              mx={1}
              letterSpacing={1}
              fontFamily={"monospace"}
              fontWeight={"bold"}
            >
              Package {item.p_name} is about to expire
              {item.remaining_days == 0
                ? " Today!! "
                : item.remaining_days == 1
                ? " in " + item.remaining_days + " day!! "
                : " in " + item.remaining_days + " days!! "}
              {item.remaining_days == 0
                ? ""
                : "Take Exam before " + item.valid_till + " !!"}
            </Typography>
          ))}
        </AnimatedText>
      </Link>
    </Box>
  );
};

export default NotificationStrip;
