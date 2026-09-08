import { useState, type MouseEvent } from "react";

import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";

import {
  DarkMode,
  LightMode,
  Lock,
  Logout as LogoutIcon,
  Person,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

import { logout } from "../../features/auth/auth";

import { useProfile } from "../../features/auth/hooks/useProfile";

import ProfileDialog from "../../features/auth/components/ProfileDialog";

import ChangePasswordDialog from "../../features/auth/components/ChangePasswordDialog";

import { useThemeMode } from "../../theme/ThemeModeContext";

function Header() {
  const navigate = useNavigate();

  const { mode, toggleTheme } = useThemeMode();

  const { profile, saveProfile } = useProfile();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);

  const [isChangePasswordDialogOpen, setIsChangePasswordDialogOpen] =
    useState(false);

  const isMenuOpen = Boolean(anchorEl);

  const handleAvatarClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    handleMenuClose();

    setIsProfileDialogOpen(true);
  };

  const handleChangePasswordClick = () => {
    handleMenuClose();

    setIsChangePasswordDialogOpen(true);
  };

  const handleThemeClick = () => {
    toggleTheme();

    handleMenuClose();
  };

  const handleLogout = () => {
    handleMenuClose();

    logout();

    navigate("/login");
  };

  const handleProfileSave = (updatedProfile: typeof profile) => {
    saveProfile(updatedProfile);
  };

  const handlePasswordSave = (updatedProfile: typeof profile) => {
    saveProfile(updatedProfile);
  };

  return (
    <>
      {/* Header */}
      <Box
        component="header"
        sx={{
          borderBottom: "1px solid",
          borderColor: "divider",
          backgroundColor: "background.paper",
        }}
      >
        <Box
          sx={{
            minHeight: 64,
            px: { xs: 2, sm: 3 },
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* Logo / Title */}
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
              }}
            >
              Task Manager
            </Typography>
          </Box>

          {/* User Section */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            {/* User Name */}
            <Box
              sx={{
                display: {
                  xs: "none",
                  sm: "block",
                },
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                }}
              >
                {profile.name}
              </Typography>

              <Typography variant="caption" color="text.secondary">
                {profile.username}
              </Typography>
            </Box>

            {/* Avatar */}
            <Tooltip title="Account">
              <IconButton
                onClick={handleAvatarClick}
                aria-label="Open account menu"
                aria-controls={isMenuOpen ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={isMenuOpen ? "true" : undefined}
              >
                <Avatar
                  src={profile.avatar ?? undefined}
                  sx={{
                    width: 38,
                    height: 38,
                  }}
                >
                  {!profile.avatar && profile.name.charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>

      {/* Account Menu */}
      <Menu
        id="account-menu"
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {/* Account Information */}
        <Box
          sx={{
            px: 2,
            py: 1.5,
            minWidth: 240,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <Avatar
              src={profile.avatar ?? undefined}
              sx={{
                width: 44,
                height: 44,
              }}
            >
              {!profile.avatar && profile.name.charAt(0).toUpperCase()}
            </Avatar>

            <Box>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 700,
                }}
              >
                {profile.name}
              </Typography>

              <Typography variant="caption" color="text.secondary">
                @{profile.username}
              </Typography>

              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: "block" }}
              >
                {profile.email}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Divider />

        {/* Profile Settings */}
        <MenuItem onClick={handleProfileClick}>
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>

          <ListItemText>Profile Settings</ListItemText>
        </MenuItem>

        {/* Change Password */}
        <MenuItem onClick={handleChangePasswordClick}>
          <ListItemIcon>
            <Lock fontSize="small" />
          </ListItemIcon>

          <ListItemText>Change Password</ListItemText>
        </MenuItem>

        {/* Theme */}
        <MenuItem onClick={handleThemeClick}>
          <ListItemIcon>
            {mode === "light" ? (
              <DarkMode fontSize="small" />
            ) : (
              <LightMode fontSize="small" />
            )}
          </ListItemIcon>

          <ListItemText>
            {mode === "light" ? "Dark Mode" : "Light Mode"}
          </ListItemText>
        </MenuItem>

        <Divider />

        {/* Logout */}
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>

          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>

      {/* Profile Settings Dialog */}
      {isProfileDialogOpen && (
        <ProfileDialog
          profile={profile}
          open={isProfileDialogOpen}
          onClose={() => setIsProfileDialogOpen(false)}
          onSave={handleProfileSave}
        />
      )}

      {/* Change Password Dialog */}
      {isChangePasswordDialogOpen && (
        <ChangePasswordDialog
          profile={profile}
          open={isChangePasswordDialogOpen}
          onClose={() => setIsChangePasswordDialogOpen(false)}
          onSave={handlePasswordSave}
        />
      )}
    </>
  );
}

export default Header;
