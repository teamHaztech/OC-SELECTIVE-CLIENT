import Container from "@mui/material/Container";
import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import LoadingBar from "../../Components/Headers/LoadingBar";
import Navbar from "../../Components/Headers/Navbar";
import { AppContext } from "../../Context/AppContext";
import { UserContext } from "../../Context/UserContext";
import ErrorPage from "../Error";
import MainAuth from "./Auth/MainAuth";
import HomePage from "./Home/Main";
import Cart from "./Product/Cart";
import Product from "./Product/Product";
import LogoutIcon from "@mui/icons-material/Logout";
import ConfirmModel from "../../Components/Model/ConfirmModel";
import PasswordChangeModal from "../../Components/Model/PasswordChangeModal";
import img from "../../Assets/images/password_success.jpg";
import SuccessModel from "../../Components/Model/SuccessModel";
import AlertBox from "../../Components/Common/AlertBox";
const Index = () => {
  const { Logout } = AppContext();
  // const {  handleClickOpen} = UserContext();
  const { handleMenuClose, openMenu } = UserContext();
  const location = useLocation();
  // useEffect(() => {

  //   if (location.pathname === '/' && user===false) {
  //     console.log(location.pathname );

  //     // handleClickOpen('1');
  //   }
  // }, [location]);
  return (
    <Container
      maxWidth={false}
      sx={{
        width: "100%",
        m: 0,
        p: 0,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#F5F5F5",
      }}
      disableGutters
    >
      <ConfirmModel
        handleClose={handleMenuClose}
        open={openMenu}
        icon={
          <LogoutIcon
            sx={{
              height: "100px",
              width: "100px",
              color: "#FA8128",
              mx: "auto",
            }}
          />
        }
        text="Are you sure you want to log out?"
        func={Logout}
      />


      <PasswordChangeModal />
      <MainAuth />
      <Navbar />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </Container>
  );
};

export default Index;
