import { Grid, Paper } from "@mui/material";
import React, { useMemo, useState } from "react";
type gridType={
    type:string,
    image?:string,
}
const UNFCube = ({ newData }: { newData: any }) => {
  const TBox = {
    height: "100px",
    width: "100px",
    borderRadius: 0,
    border: 0,
    boxShadow: "0px 0px",
    opacity: 0.0,
  };
  const DBox = {
    height: "100px",
    width: "100px",
    borderRadius: 0,
    border: "1px solid ",
    paddingY: "10px",
    // Add margin for spacing
  };

  const image_style = {
    width: "50px",
    height: "50px",
    margin: "auto",
  };
   const [gridData, setGridData] = useState<gridType[]>([]);

useMemo(() => {
  setGridData([
    {
      type: "TBox",
    },
    {
      type: "DBox",
      image: newData[0],
    },
    {
      type: "DBox",
      image: newData[1],
    },
    {
      type: "DBox",
      image: newData[2],
    },
    {
      type: "DBox",
      image: newData[3],
    },
    {
      type: "TBox",
    },
    {
      type: "DBox",
      image: newData[4],
    },
    {
      type: "TBox",
    },
    {
      type: "DBox",
      image: newData[5],
    },
  ]);
}, [newData]);

return (
  <Grid container justifyContent="center" alignItems="center">
    {gridData.map((item:gridType) => (
      <Grid item xs={12} sm={5} sx={{ w: "100%", m: "auto" }}>
        <Grid container sx={{ w: "100%", m: "auto" }} columns={3}>
          {item.type === "TBox" ? (
            <Paper style={TBox}></Paper>
          ) : (
            <Paper style={DBox}>
              <img
                src={`${import.meta.env.VITE_IMAGE_URL}${item.image}`}
                alt=""
                style={image_style}
              />
            </Paper>
          )}
        </Grid>
      </Grid>
    ))}
  </Grid>
  );
};

export default UNFCube;
