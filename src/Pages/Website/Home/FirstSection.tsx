import { Button, Container, Paper } from "@mui/material";
import React from "react";
import Carousel from "react-material-ui-carousel";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CircleIcon from "@mui/icons-material/Circle";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import images from "../../../../src/Assets/Data/CoursolData";
interface props {
  item: string;
}

const FirstSection = () => {
  return (
    <Container maxWidth={false} sx={{ width: "100%" }} id="home">
      <Carousel
        NextIcon={<ArrowForwardIosIcon />}
        PrevIcon={<ArrowBackIosNewIcon />}
        IndicatorIcon={
          <CircleIcon
            sx={{
              mx: "7px",
              height: { md: "19px", xs: "12px" },
              width: { md: "20px", xs: "12px" },
            }}
          />
        }
        sx={{
          width: "98%",
          height: { xs: "300px", sm: "20%" },
          py: 2,
          margin: "auto",
        }}
        indicatorIconButtonProps={{
          style: {
            color: "#3A9BDC",
          },
        }}
        activeIndicatorIconButtonProps={{
          style: {
            backgroundColor: "#FA8128",
            color: "#FA8128",
            paddingRight: "25px",
            paddingLeft: "25px",
            borderRadius: 12,
          },
        }}
        indicatorContainerProps={{ style: { padding: "10px" } }}
      >
        {images.map((item: { image: string }, key: number) => (
          <Item key={key} item={item.image} />
        ))}
      </Carousel>
    </Container>
  );
};
function Item(props: props) {
  return (
    <Paper sx={{ height:{ xs: "300px", sm: "400px", lg:'646px' }, }}>
      <img src={props.item} alt="" style={{ height: "100%", width: "100%" }} />
    </Paper>
  );
}
export default FirstSection;
