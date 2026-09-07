import { useState } from "react";

import { Box, IconButton } from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

import { Outlet } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((current) => !current);
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minWidth: 0,
          backgroundColor: "background.default",
        }}
      >
        <Box
          sx={{
            display: {
              xs: "flex",
              md: "none",
            },

            alignItems: "center",
            px: 1,
            py: 1,

            borderBottom: "1px solid",
            borderColor: "divider",

            backgroundColor: "background.paper",
          }}
        >
          <IconButton onClick={handleDrawerToggle} aria-label="open navigation">
            <MenuIcon />
          </IconButton>
        </Box>

        <Header />

        <Box sx={{ p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default DashboardLayout;
