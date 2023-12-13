import { useState, useEffect } from "react";
import { Box, CircularProgress, LinearProgress } from "@mui/material";
import zIndex from "@mui/material/styles/zIndex";
import { AppContext } from "../../Context/AppContext";

interface props {
  isLoading?: boolean;
}
const LoadingBar = (props: props) => {
  // const [progress, setProgress] = useState<number>(0);
  // const [val, setVal] = useState<boolean>(false);
  // const { setIsLoading,isLoading } = AppContext();
  // useEffect(() => {

  //     if (props.isLoading) {
  //       setProgress(50);
  //         setVal(true);
  //     } else {
  //       setProgress(70);
  //       setInterval(() => {
  //         setProgress(100);
  //       }, 500);
  //       setVal(false);
  //       setIsLoading(false);
  //     }

  //   }, [props.isLoading]);

  return (
    <>
      {
        <Box
          key="progress"
          sx={{ width: "20%", position: "relative", height: "20%", m: "auto" }}
        >
          <CircularProgress color="warning" sx={{ m: "50%" }} />
        </Box>
      }
    </>
  );
};

export default LoadingBar;
