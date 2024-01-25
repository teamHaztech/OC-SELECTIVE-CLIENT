import {
  Card,
  Container,
  Stack,
  Paper,
  Typography,
  CardMedia,
} from "@mui/material";
import { OButton2 } from "../../../Components/Common/Button";
import { Header1 } from "../../../Components/Common/HeaderText";
import img from "../../../Assets/images/TRIAL_TEST_PACKAGE.jpg";
import { Link } from "react-router-dom";
const FourthSection = ({ data }: any) => {
  return (
    <Container maxWidth="xl" sx={{ my: "15px" }}>
      <Card
        sx={{
          boxShadow: "5px 5px 20px 0px #808080",
          my: "15px",
          display: "flex",
          flexDirection: { sm: "row", lg: "row", md: "row", xs: "column" },
          height: { sm: "173px", lg: "173px", md: "173px", xs: "380px" },
        }}
      >
        <Stack
          spacing={2}
          direction="column"
          sx={{
            width: { sm: "220px", lg: "380px", md: "380px", xs: "300px" },
            m: "auto",
            alignItems: "center",
          }}
        >
          <Header1 header="New Test Package Coming Up!" />
          <Link to={`/product/${data?.latest_product_id}`}>
            <OButton2
              name="GO TO LATEST TEST PACKAGE"
              css={{ maxWidth: "344px" }}
            />
          </Link>
        </Stack>
        <Paper
          variant="outlined"
          square
          sx={{
            backgroundColor: "#3A9BDC",
            width: { sm: "400px", lg: "782px", md: "482px", xs: "400px" },
            transformOrigin: {
              lg: "bottom left",
              md: "bottom left",
              sm: "bottom left",
              xs: "0",
            },
            transform: {
              lg: "skewX(-30deg)",
              md: "skewX(-30deg)",
              sm: "skewX(-30deg)",
              xs: "skewX(0deg)",
            },
            display: "flex",
          }}
        >
          <CardMedia
            sx={{
              width: { sm: "124px", lg: "344px", md: "144px", xs: "162px" },
              height: "173px",
            }}
            image={img}
          />
          <Typography
            sx={{
              width: { sm: "200px", lg: "315px", md: "244px", xs: "150px" },
              fontSize: { xs: "18px", md: "24px", sm: "18px", lg: "24px" },
              fontWeight: 600,
              color: "#FFFFFF",
              transform: {
                lg: "skewX(30deg)",
                md: "skewX(30deg)",
                sm: "skewX(30deg)",
                xs: "skewX(0deg)",
              },
              m: "auto",
            }}
          >
            SELECTIVE ONLINE PLACEMENT TRIAL TEST PACKAGE
          </Typography>
        </Paper>
      </Card>
    </Container>
  );
};

export default FourthSection;
