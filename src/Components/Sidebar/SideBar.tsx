import {
  Box,
  Divider,
  IconButton,
  List,
  Stack,
  SwipeableDrawer,
  ListItem,
  ListItemButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, { Dispatch, ReactElement, SetStateAction, useState } from "react";
import { OButton, PIButton, WButton } from "../Common/Button";
// import { Link } from 'react-router-dom';
import { Header3 } from "../Common/HeaderText";
import { ParaText2 } from "../Common/ParaText";
import { HashLink } from "react-router-hash-link";
import { UserContext } from "../../Context/UserContext";
import { Link } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

interface pageType {
  name: string;
  url: string;
  icon: ReactElement;
}
type userData= {
  id: number,
  name: string,
  email: string,
}
interface props {
  pages: pageType[];
  // handleCloseNavMenu: () => void;
  // handleOpenUserMenu: (p: any) => void;
  // setAnchorElNav: Dispatch<SetStateAction<null | HTMLElement>>;
  // anchorElNav: null | HTMLElement;
  // setAnchorElUser: Dispatch<SetStateAction<null | HTMLElement>>;
  user:userData | null;
  boxStyle: object;
}

const SideBar = (props: props) => {
  const [state, setState] = useState<boolean>(false);
  const { handleClickOpen } = UserContext();
  const {user}=  AppContext();
  
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setState(open);
    };

  return (
    <Box sx={{ width: "100%", ...props.boxStyle }}>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={toggleDrawer(true)}
        color="inherit"
      >
        <MenuIcon sx={{ height: "50px", width: "40px" }} />
      </IconButton>
      <SwipeableDrawer
        PaperProps={{
          sx: { width: { md: "50%", sm: "50%", xs: "70%", lg: "30%" } },
        }}
        anchor="left"
        open={state}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <List sx={{ pt: 0 }}>
          <Stack
            direction="row"
            sx={{
              backgroundColor: "#3A9BDC",
              width: "100%",
              height: { md: "198px", sm: "198px", xs: "178px" },
              textAlign: "center",
              display: { sm: "flex", md: "flex", xs: "flex" },
              flexDirection: { sm: "row", md: "row", xs: "column" },
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {props.user ? (
              <>
               <Link to="/user/profile">
                <PIButton
                  css={{
                    height: { md: "90px", sm: "90px", xs: "60px" },
                    width: { md: "90px", sm: "90px", xs: "60px" },
                    mx: { xs: "auto", md: "0", sm: "0" },
                  }}
                />
               </Link>
                <Box
                  sx={{
                    ml: { sm: "10px", xs: 0, md: "30px" },
                    mt: { sm: 0, xs: "10px", md: 0 },
                  }}
                >
                  <Header3 header={props.user.name} />
                  <ParaText2 text={props.user.email} />
                </Box>
              </>
            ) : (
              <Stack direction="column" spacing={2}>
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
          </Stack>

          {props.pages.map((item: pageType, key) => (
             !user && item.name === "Dashboard" ? null : (
            <HashLink to={item.url} key={key}>
              <ListItemButton
                sx={{ px: "10px", fontSize: "20px", fontWeight: 600 }}
              >
                <ListItem sx={{ width: "50px", height: "50px" }}>
                  {item.icon}
                </ListItem>
                <ListItem>{item.name}</ListItem>
              </ListItemButton>
            </HashLink>)
          ))}
        </List>
      </SwipeableDrawer>
    </Box>
  );
};

export default SideBar;
