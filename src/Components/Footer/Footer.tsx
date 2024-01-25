import { Box, Container, Typography } from "@mui/material";
import { Header2 } from "../Common/HeaderText";
import { ParaText1 } from "../Common/ParaText";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const pages = ["FREE RESOURCES", "FAQS"];
const purl = ["/free-resources", "/faqs"];
const pages2 = [
  "TERMS AND CONDITIONS ",
  "PRIVACY POLICY",
  "REFUND AND RETURN POLICY",
];
const surl = [
  "/Terms-And-Conditions",
  "/Privacy-Policy",
  "/Refund-Return-Policy",
];

const Footer = () => {
  return (
    <Container
      maxWidth={false}
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: {
          lg: "space-evenly",
          md: "space-evenly",
          sm: "space-evenly",
          xs: "space-between",
        },
        mt: "auto",
        backgroundColor: "#FFFFFF",
      }}
    >
      <Box sx={{ my: "auto" }}>
        {pages.map((item, key) => {
          return (
            <Link  to={purl[key]} key={key}>
             
              <Header2 header={item} css={{ py: "10px" }} />
            </Link>
          );
        })}
      </Box>
      <Box sx={{ my: "auto" }}>
        {pages2.map((item, key) => {
          return (
            <Link  to={surl[key]} key={key}>
            
              <Header2 header={item} css={{ py: "10px" }} />
            </Link>
          );
        })}
      </Box>
      {/* <Box sx={{my:'auto',}}>
                <Typography noWrap align='center' component="a"
                    sx={{
                        fontSize: '48px', display: { xs: 'none', sm: 'none', md: 'none', lg: 'flex' }, 
                        fontWeight: 600,
                        color: '#3A9BDC',
                        textDecoration: 'none',
                    }}> AI Tech ED </Typography>
            </Box> */}
    </Container>
  );
};

export default Footer;
