import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import Throughput from "../reports/Throughput";
import { Routes, Route } from "react-router-dom";
import sidebarBg from "../assets/images/sidebar-bg.png";
import Redirect from "./Redirect";
import { SwipeableDrawer } from "@mui/material";
import { TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import FloorBoard from "./FloorBoard";
import SOP from "./SOP";
import Bulletin from "./Bulletin";
import WorkerDetails from "./WorkerDetails";
import BulletinSheet from "./BulletinSheet";
import UploadSOP from "./UploadSOP";

const drawerWidth = 240;
const drawerPaperStyles = {
  backgroundColor: "#252e3e",
  backgroundImage: `url(${sidebarBg})`,
  backgroundAttachment: "fixed",
  backgroundPosition: "left 0 bottom 0 !important",
  backgroundSize: "250px !important",
  backgroundRepeat: "no-repeat",
  padding: "0 20px",
};
const drawerStyles = {
  "& .MuiDrawer-paper": {
    boxSizing: "border-box",
    width: drawerWidth,
  },
};

function ResponsiveDrawer() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const currentDate = new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState(currentDate);
  const sizeSmall = useMediaQuery("(max-width:576px)");

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          ml: { lg: `${drawerWidth}px` },
          backgroundColor: "rgba(249, 250, 251, 0.3)",
          backdropFilter: "blur(6px) !important",
          boxShadow: "none",
        }}
        className="appbar"
      >
        <Toolbar className="appbar">
          <div style={{ flex: 1 }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={() => setMobileOpen(!mobileOpen)}
              sx={{ display: { lg: "none" } }}
            >
              <MenuIcon sx={{ color: "#000" }} />
            </IconButton>
            <img
              src={require("../assets/images/Tex.png")}
              alt="logo"
              height="25px"
            />
          </div>

          {!sizeSmall && (
            <p style={{ color: "#000", marginBottom: 0, marginRight: "10px" }}>
              Select Date
            </p>
          )}
          <TextField
            size="large"
            margin="normal"
            variant="outlined"
            id="date"
            type="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            inputProps={{
              max: currentDate,
            }}
          />
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { lg: drawerWidth }, flexShrink: { lg: 0 } }}
        aria-label="mailbox folders"
      >
        {/* Drawer mobile */}
        <SwipeableDrawer
          PaperProps={{
            sx: drawerPaperStyles,
          }}
          variant="temporary"
          open={mobileOpen}
          onOpen={() => setMobileOpen(!mobileOpen)}
          onClose={() => setMobileOpen(!mobileOpen)}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{ ...drawerStyles, display: { xs: "block", lg: "none" } }}
        >
          <Sidebar />
        </SwipeableDrawer>

        {/* Drawer desktop */}
        <Drawer
          PaperProps={{
            sx: drawerPaperStyles,
          }}
          variant="permanent"
          sx={{
            ...drawerStyles,
            display: { xs: "none", lg: "block" },
          }}
          open
        >
          <Sidebar />
        </Drawer>
      </Box>

      {/* Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: {
            lg: `calc(100% - ${drawerWidth}px)`,
            backgroundColor: "rgb(249, 250, 251)",
            height: "100vh",
            overflow: "scroll",
          },
        }}
      >
        <Toolbar />

        <Routes>
          <Route exact path="/" element={<Redirect />} />
          <Route exact path="/dashboard" element={<Dashboard date={date} />} />
          <Route
            exact
            path="/throughput"
            element={<Throughput date={date} />}
          />
          <Route
            exact
            path="/floorboard"
            element={<FloorBoard date={date} />}
          />
          <Route exact path="/sop" element={<SOP />} />
          <Route exact path="/upload-sop" element={<UploadSOP />} />
          <Route exact path="/bulletin" element={<Bulletin />} />
          <Route exact path="/bulletin-sheet" element={<BulletinSheet />} />
          <Route exact path="/worker-details/:id" element={<WorkerDetails />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;
