import { Box, Container } from "@mui/material";
import { Header3 } from "../../../Components/Common/HeaderText";
import { ParaText2 } from "../../../Components/Common/ParaText";
import ContactForm from "./components/ContactForm";
import ImageCard from "./components/ImageCard";

const FourthSection = () => {
  return (
    <Container
      maxWidth={false}
      sx={{ width: "100%", py: "15px", backgroundColor: "#3A9BDC" }}
    >
      <Box
        sx={{
          pt: "10px",
          pb: "30px",
        }}
      >
        <Header3 header="Contact Us" />
        <ParaText2 text="Get in touch with us!" />
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: {
            xs: "column",
            sm: "column",
            md: "column",
            lg: "row",
          },
          justifyContent: "space-between",
        }}
      >
        <ContactForm />
        <ImageCard />
      </Box>
    </Container>
  );
};

export default FourthSection;
