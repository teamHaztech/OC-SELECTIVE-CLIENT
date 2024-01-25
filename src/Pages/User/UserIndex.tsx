import { Container } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { Navigate, Route, Routes } from "react-router-dom";
import UserNavbar from "../../Components/Headers/UserNavbar";
import { AppContext } from "../../Context/AppContext";
import { UserContext } from "../../Context/UserContext";
import ErrorPage from "../Error";
import MainDash from "./Dashboard/MainDash";
import ConfirmModel from "../../Components/Model/ConfirmModel";
import PasswordChangeModal from "../../Components/Model/PasswordChangeModal";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import SuccessModel from "../../Components/Model/SuccessModel";
import img from "../../Assets/images/password_success.jpg";
import ProfileIndex from "./Profile/ProfileIndex";
import ProfileEditModal from "../../Components/Model/ProfileEditModel";
import TestRAIndex from "./TestResultAnalysis/TestRAIndex";
import TestScheduleIndex from "./TestSchedule/TestScheduleIndex";
import Exam_Section from "./TestSchedule/Exam_Section";
import UserFooter from "../../Components/Footer/UserFooter";
import TestSeries from "./TestSchedule/TestSeries";

const UserIndex = () => {
  const { user, Logout } = AppContext();
  const {
    handleMenuClose,
    openMenu,
    openPC2,
    handlePC2Close,
    handleSubmit,
    openSuccess,
    handleSuccessClose,
    openPE2,
    handlePESuccessClose,
    handlePE2Close,
    openPESuccess,
  } = UserContext();
  return (
    <>
      {user ? (
        <>
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

          <ConfirmModel
            handleClose={handlePC2Close}
            open={openPC2}
            icon={
              <LockOpenIcon
                sx={{
                  height: "100px",
                  width: "100px",
                  color: "#FA8128",
                  mx: "auto",
                }}
              />
            }
            text="Are you sure you want to Change your password?"
            func={handleSubmit}
          />

          <ConfirmModel
            handleClose={handlePE2Close}
            open={openPE2}
            icon={
              <LockOpenIcon
                sx={{
                  height: "100px",
                  width: "100px",
                  color: "#FA8128",
                  mx: "auto",
                }}
              />
            }
            text="Are you sure you want to Change your Details?"
            func={handleSubmit}
          />

          <PasswordChangeModal />

          <ProfileEditModal />

          <SuccessModel
            handleClose={handleSuccessClose}
            open={openSuccess}
            icon={
              <img
                src={img}
                style={{
                  height: "150px",
                  width: "150px",
                  color: "#FA8128",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              />
            }
            header="Your password has been changed successfully!"
            text="Back to Dashboard"
            link="/user"
          />

          <SuccessModel
            handleClose={handlePESuccessClose}
            open={openPESuccess}
            icon={
              <img
                src={img}
                style={{
                  height: "150px",
                  width: "150px",
                  color: "#FA8128",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              />
            }
            header="Your Details has been changed successfully!"
            text="Back to Dashboard"
            link="/user"
          />

          <Container
            maxWidth={false}
            sx={{
              width: "100%",
              m: 0,
              p: 0,
              rowGap:"26px",
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#F5F5F5",
            }}
            disableGutters
          >
            <UserNavbar />
            <Routes>
              <Route index element={<MainDash />} />
              <Route path="/profile" element={<ProfileIndex />} />
              <Route path="/Test-result-analysis/*" element={<TestRAIndex />} />
              <Route path="/Test-schedule/*" element={<TestScheduleIndex />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
            <UserFooter />
          </Container>
         
        </>
      ) : (
        <>
          <Navigate to="/" replace={true} />
        </>
      )}
    </>
  );
};

export default UserIndex;
