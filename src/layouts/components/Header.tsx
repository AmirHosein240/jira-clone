import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";

import { DarkMode, LightMode } from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

import { logout } from "../../features/auth/auth";

import { useThemeMode } from "../../theme/ThemeModeContext";

function Header() {
  const navigate = useNavigate();

  const { mode, toggleTheme } = useThemeMode();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      color="inherit"
      sx={{
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Task Manager
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <Tooltip
            title={
              mode === "light" ? "Switch to dark mode" : "Switch to light mode"
            }
          >
            <IconButton
              onClick={toggleTheme}
              color="inherit"
              aria-label="Toggle theme"
            >
              {mode === "light" ? <DarkMode /> : <LightMode />}
            </IconButton>
          </Tooltip>

          <Avatar
            sx={{
              width: 36,
              height: 36,
            }}
          >
            A
          </Avatar>

          <Box
            sx={{
              display: {
                xs: "none",
                sm: "block",
              },
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Amir
            </Typography>

            <Typography variant="caption" color="text.secondary">
              Admin
            </Typography>
          </Box>

          <Button variant="outlined" size="small" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
