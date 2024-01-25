import { Box, Card, Divider } from "@mui/material";

import { ParaText3 } from "../../../../Components/Common/ParaText";
import LineChart from "../../../../Components/Charts/LineChart";
import { useState } from "react";
import LoadingBar from "../../../../Components/Headers/LoadingBar";

const ViewThirdSection = ({ data }: any) => {
  if (data.isLoading) {
    return <LoadingBar />;
  }
  const question_number:number[] = [];
  for (let index = 1; index <= data.data?.question_time.length; index++) {
    question_number.push(index);
  }
  // console.log(question_number);
  
  const [lineData, setLineData] = useState({
    labels: question_number,
    datasets: [
      {
        label: "Seconds",
        data: data.data?.question_time,
        backgroundColor: "#3A9BDC",
      },
    ],
  });

  return (
    <Card
      sx={{
        boxShadow: "6px 6px 20px 0px #808080",
        // my: "20px",
        width:  "100%" ,
        // height: ?
        p: "14px",
        
      }}
    >
      <ParaText3 text="Time Taken per Question" />
      <Divider
        sx={{
          borderColor: "#FA8128",
          borderWidth: "3px",
          borderRadius: "3px",
          width: "200px",
         
        }}
      />
      <Box
      // width={"full"}
      // height={200}
      // display={"block"}
      // justifyContent={"stretch"}
      >
        <LineChart lineData={lineData} />
      </Box>
    </Card>
  );
};

export default ViewThirdSection;
