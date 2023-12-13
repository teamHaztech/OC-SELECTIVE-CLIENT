import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Container, Tab } from "@mui/material";
import React from "react";
import SOTT from "./SOTT";
import OTT from "./OTT";

const AdminMainDash = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        width: "96%",
        my: 1,
        // mx: "auto",
        // py: 2,

        // minHeight: "100vh",
        // display: "flex",
        // flexDirection: "column",
        // border: 1,
        // height: "85vh",
        backgroundColor: "#F5F5F5",
      }}
      disableGutters
    >
      <TabContext value={value}>
        <Box sx={{ borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="Tabs">
            <Tab label="OTT" value="1" />
            <Tab label="SOTT" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <OTT value={value} />
        </TabPanel>
        <TabPanel value="2">
          <SOTT value={value} />
        </TabPanel>
      </TabContext>
    </Container>
  );
};

export default AdminMainDash;
