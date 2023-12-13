import { Menu, MenuItem, Stack } from "@mui/material";
import { ReactElement } from "react";
import { Link } from "react-router-dom";
import { ParaText1 } from "../Common/ParaText";
import PersonIcon from "@mui/icons-material/Person";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import { UserContext } from "../../Context/UserContext";
const pCss = {
  height: "38px",
  width: "38px",
  m: "0px",
  p: "0px",
  color: "#FA8128",
};

const sCss = {
  height: "28px",
  width: "28px",
  color: "#FA8128",
  mx: "8px",
};

// interface props {
//   anchorElUser: null | HTMLElement;
//   handleCloseUserMenu: () => void;
// }

const MenuModel = () => {
  const { handleMenuOpen, handlePCOpen,handleCloseUserMenu,anchorElUser } = UserContext();
  return (
    <Menu
      sx={{
        width: "272px",
        height: "270px",
        mt: { md: "45px", lg: "65px", xs: "45px" },
      }}
      id="menu-appbar"
      anchorEl={anchorElUser}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorElUser)}
      onClose={handleCloseUserMenu}
    >
      {/* <MenuItem>
        <Link to="/user/profile">
          <Stack spacing={1} direction="row">
            <PersonIcon sx={sCss} />
            <ParaText1 text="Profile" />
          </Stack>
        </Link>
      </MenuItem> */}
      <MenuItem onClick={handlePCOpen}>
        <Stack spacing={1} direction="row">
          <LockOutlinedIcon sx={sCss} />
          <ParaText1 text="Change Password" />
        </Stack>
      </MenuItem>
      <MenuItem onClick={handleMenuOpen}>
        <Stack spacing={1} direction="row">
          <ExitToAppOutlinedIcon sx={sCss} />
          <ParaText1 text="Logout" />
        </Stack>
      </MenuItem>
    </Menu>
  );
};

export default MenuModel;
