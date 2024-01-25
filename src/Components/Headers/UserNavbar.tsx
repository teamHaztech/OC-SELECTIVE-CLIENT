import { AppBar, Box, Menu, MenuItem, Stack } from "@mui/material";
import React, { ReactElement, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import { PIButton, SIButton } from "../Common/Button";
import { Header4 } from "../Common/HeaderText";
import { ParaText1 } from "../Common/ParaText";
import SideBar from "../Sidebar/SideBar";
import EventRepeatOutlinedIcon from "@mui/icons-material/EventRepeatOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import AnalyticsOutlinedIcon from "@mui/icons-material/AnalyticsOutlined";
import PersonIcon from "@mui/icons-material/Person";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import MenuModel from "../Model/MenuModel";
import { UserContext } from "../../Context/UserContext";
import img from "../../Assets/images/logo/logo2.png";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

type userData = {
  id: number;
  name: string;
  email: string;
};

interface Type {
  name: string;
  url: string;
  icon: ReactElement;
}

const pCss = {
  height: "38px",
  width: "38px",
  m: "0px",
  p: "0px",
  color: "#FA8128",
};

const pages: Type[] = [
  { name: "Home", url: "/#home", icon: <HomeOutlinedIcon sx={pCss} /> },
  {
    name: "Dashboard",
    url: "/user",
    icon: <DashboardOutlinedIcon sx={pCss} />,
  },
  {
    name: "Test Result Analysis",
    url: "/user/Test-result-analysis",
    icon: <AnalyticsOutlinedIcon sx={pCss} />,
  },
  {
    name: "Test Schedules",
    url: "/user/Test-schedule",
    icon: <EventRepeatOutlinedIcon sx={pCss} />,
  },
  { name: "Logout", url: "/user", icon: <ExitToAppOutlinedIcon sx={pCss} /> },
];

const UserNavbar = () => {
  const { user } = AppContext();
  const { handleOpenUserMenu } = UserContext();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#3A9BDC",
        boxShadow: "none",
        height: {
          xs: "4.375rem",
          lg: "6.813rem",
          md: "6rem",
          sm: "4.375rem",
        },
        justifyContent: "space-between",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        px: { md: "10px", sm: "0px", xs: "0px", lg: "15px" },
      }}
    >
      <Box
        sx={{
          width: "55%",
          justifyContent: "space-evenly",
          display: "flex",
          alignItems: "center",
        }}
      >
        <SideBar
          // handleCloseNavMenu={handleCloseNavMenu}
          pages={pages}
          // handleOpenUserMenu={handleOpenUserMenu}
          // setAnchorElNav={setAnchorElNav}
          // anchorElNav={anchorElNav}
          // setAnchorElUser={setAnchorElUser}
          user={user}
          boxStyle={{ display: "flex" }}
        />
        <Box
          sx={{
            width: { xs: "120px", sm: "120px", md: "200px" },
            height: { xs: "66px", sm: "66px", md: "100px" },
          }}
        >
          <Link to="/user/">
            <img
              src={img}
              style={{ width: "100%", height: "100%", paddingBottom: "2px" }}
            />
            {/* <Header4 header="AI Tech Ed" /> */}
          </Link>
        </Box>
      </Box>
      <Box>
        <Stack
          spacing={{ md: 2, sm: 2, xs: 1, lg: 2 }}
          direction="row"
          padding={1}
        >
          <Link to="/user/profile">
            <PIButton
              css={{
                p: "2px",
                height: { md: "60px", sm: "40px", xs: "30px", lg: "60px" },
                width: { md: "60px", sm: "40px", xs: "30px", lg: "60px" },
              }}
            />
          </Link>
          <SIButton
            css={{
              p: "2px",
              height: { md: "60px", sm: "40px", xs: "30px", lg: "60px" },
              width: { md: "60px", sm: "40px", xs: "30px", lg: "60px" },
            }}
            func={handleOpenUserMenu}
          />
        </Stack>
        <MenuModel />
      </Box>
    </AppBar>
  );
};

export default UserNavbar;
