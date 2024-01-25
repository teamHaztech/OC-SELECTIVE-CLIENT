import {
  AppBar,
  Box,
  Container,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import FeaturedPlayListOutlinedIcon from "@mui/icons-material/FeaturedPlayListOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import img from "../../Assets/images/logo/logo2.png";
import { ReactElement, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import { Link } from "react-router-dom";
import { OButton, PIButton, WButton, SIButton } from "../Common/Button";
import SideBar from "../Sidebar/SideBar";
import { ParaText1 } from "../Common/ParaText";
import { HashLink } from "react-router-hash-link";
import { Header4 } from "../Common/HeaderText";
import { AppContext } from "../../Context/AppContext";
import MenuModel from "../Model/MenuModel";
import { CartContext } from "../../Context/CartContext";

type Type = {
  name: string;
  url: string;
  icon: ReactElement;
  func?: () => void;
};
// interface props{
//     func:()=>void;
//     func2:()=>void;
// }

const pCss = {
  height: "38px",
  width: "38px",
  m: "0px",
  p: "0px",
  color: "#FA8128",
};

const Navbar = () => {
  const { handleClickOpen, handleOpenUserMenu } = UserContext();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const { cart } = CartContext();
  const { user } = AppContext();

  const pages: Type[] = [
    { name: "Dashboard", url: "/user", icon: <HomeOutlinedIcon sx={pCss} /> },

    { name: "Home", url: "/#home", icon: <HomeOutlinedIcon sx={pCss} /> },
    {
      name: "Buy Online Tests",
      url: "/#product",
      icon: <FeedOutlinedIcon sx={pCss} />,
    },
    {
      name: "Free Resources",
      url: "/free-resources",
      icon: <FeaturedPlayListOutlinedIcon sx={pCss} />,
    },
    {
      name: `Cart (${cart.length})`,
      url: "/cart",
      icon: <ShoppingCartOutlinedIcon sx={pCss} />,
    },
  ];
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "#3A9BDC",
          boxShadow: "none",
          height: {
            xs: "4.375rem",
            lg: "7.813rem",
            md: "6.875rem",
            sm: "4.375rem",
          },
          justifyContent: "space-evenly",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ mt: { sm: 0 } }}>
            {/* PC View Header and header*/}
            {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
            <Box
              sx={{
                // pb: "10px",
                display: { xs: "none", lg: "flex" },
                width: "200px",
                height: "120px",
              }}
            >
              <Link to="/">
                {/* <Header4
                  header="AI Tech Ed"
                  css={{
                    display: { xs: "none", sm: "none", md: "none", lg: "flex" },
                  }}
                /> */}
                <img
                  src={img}
                  style={{
                    width: "100%",
                    height: "100%",
                    paddingBottom: "2px",
                  }}
                />
              </Link>
            </Box>

            {/* Mobile View SideBar Icon */}
            <Box
              sx={{
                width: "100%",
                justifyContent: "space-evenly",
                alignItems: "center",
                display: { xs: "flex", sm: "flex", md: "flex", lg: "none" },
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
                boxStyle={{
                  display: { xs: "flex", sm: "flex", md: "flex", lg: "none" },
                }}
              />

              {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
              <Stack
                spacing={4}
                direction="row"
                sx={{
                  alignItems: "center",
                  display: { xs: "flex", lg: "none" },
                }}
              >
                <Box
                  sx={{
                    // pb: "10px",
                    display: { xs: "flex", lg: "none" },
                    width: "100px",
                    height: "66px",
                  }}
                >
                  <Link to="/">
                    <img src={img} style={{ width: "100%", height: "100%" }} />
                  </Link>
                </Box>

                {user && (
                  <SIButton
                    css={{ p: "2px", height: "30px", width: "30px" }}
                    func={handleOpenUserMenu}
                  />
                )}
              </Stack>
            </Box>

            {/* PC View SideBar menu */}

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "none", md: "none", lg: "flex" },
                justifyContent: "space-evenly",
              }}
            >
              {pages.map((item, key) =>
                // Check if the user is present and the item's name is "Dashboard"
                !user && item.name === "Dashboard" ? null : (
                  <HashLink smooth to={item.url} key={key} style={{}}>
                    <Typography
                      sx={{
                        color: "white",
                        display: "block",
                        fontSize: "20px",
                        fontWeight: 600,
                      }}
                    >
                      {item.name}
                    </Typography>
                  </HashLink>
                )
              )}
            </Box>

            {/* PC View setting option */}
            <Box sx={{ flexGrow: 0 }}>
              {user ? (
                <Stack spacing={2} direction="row" padding={1}>
                  <Tooltip
                    title="Profile"
                    sx={{
                      display: {
                        xs: "none",
                        sm: "none",
                        md: "none",
                        lg: "block",
                      },
                    }}
                  >
                    <Link to="/user/profile">
                      <PIButton
                        css={{ p: "6px", height: "60px", width: "60px" }}
                      />
                    </Link>
                  </Tooltip>
                  <Tooltip
                    title="Open settings"
                    sx={{
                      display: {
                        xs: "none",
                        sm: "none",
                        md: "none",
                        lg: "block",
                      },
                    }}
                  >
                     <Link to="">
                    <SIButton
                      css={{ p: "6px", height: "60px", width: "60px" }}
                      func={handleOpenUserMenu}
                    />
                     </Link>
                  </Tooltip>
                </Stack>
              ) : (
                <Stack spacing={2} direction="row">
                  <WButton
                    name="login"
                    func={() => handleClickOpen("1")}
                    css={{ width: "127px" }}
                  />
                  <OButton
                    name="Register"
                    func={() => handleClickOpen("2")}
                    css={{ width: "127px" }}
                  />
                </Stack>
              )}

              <MenuModel />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Navbar;
