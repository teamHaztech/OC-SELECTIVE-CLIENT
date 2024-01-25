import { AppBar, Box, Menu, MenuItem, Stack } from "@mui/material";
import React, { ReactElement, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import { PIButton, SIButton } from "../Common/Button";
import { Header4 } from "../Common/HeaderText";
import { ParaText1 } from "../Common/ParaText";
import SideBar from "../Sidebar/SideBar";
import EventRepeatOutlinedIcon from "@mui/icons-material/EventRepeatOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import AnalyticsOutlinedIcon from "@mui/icons-material/AnalyticsOutlined";
import PersonIcon from "@mui/icons-material/Person";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import MenuModel from "../Model/MenuModel";
import { UserContext } from "../../Context/UserContext";
import img from "../../Assets/images/logo/logo2.png";
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
  {
    name: "Dashboard ", //don't remove space at the end
    url: "/admin",
    icon: <DashboardOutlinedIcon sx={pCss} />,
  },
  {
    name: "Students",
    url: "/admin/students",
    icon: <PeopleAltOutlinedIcon sx={pCss} />,
  },
  {
    name: "Test Packages",
    url: "/admin/test-packages",
    icon: <EventRepeatOutlinedIcon sx={pCss} />,
  },
  {
    name: "View Topics",
    url: "/admin/view-topics",
    icon: <EventRepeatOutlinedIcon sx={pCss} />,
  },
  {
    name: "Non-Verbal",
    url: "/admin/non-verbal",
    icon: <EventRepeatOutlinedIcon sx={pCss} />,
  },
  // {
  //   name: "Add-Reading-Question",
  //   url: "/admin/view-topics/add-topics/add-question-to-reading-set",
  //   icon: <EventRepeatOutlinedIcon sx={pCss} />,
  // },
  {
    name: "Profile",
    url: "/admin/profile",
    icon: <AccountBoxOutlinedIcon sx={pCss} />,
  },
];

const AdminNavbar = () => {
  const { admin } = AppContext();
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
          lg: "5rem",
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
          user={admin}
          boxStyle={{ display: "flex" }}
        />

        {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}

        <Box
          sx={{
            width: { xs: "120px", sm: "120px", md: "200px" },
            height: { xs: "66px", sm: "66px", md: "71px" },
          }}
        >
          <Link to="/user/">
            <img src={img} style={{ width: "100%", height: "100%" }} />
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
          {/* <Link to="/admin/profile">
            <PIButton
              css={{
                p: "2px",
                height: { md: "60px", sm: "40px", xs: "30px", lg: "50px" },
                width: { md: "60px", sm: "40px", xs: "30px", lg: "50px" },
              }}
            />
          </Link> */}
          <SIButton
            css={{
              p: "2px",
              height: { md: "60px", sm: "40px", xs: "30px", lg: "50px" },
              width: { md: "60px", sm: "40px", xs: "30px", lg: "50px" },
            }}
            func={handleOpenUserMenu}
          />
        </Stack>
        <MenuModel />
      </Box>
    </AppBar>
  );
};

export default AdminNavbar;
