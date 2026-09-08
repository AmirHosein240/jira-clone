import { useState, type ChangeEvent } from "react";

import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import { PhotoCamera, Visibility, VisibilityOff } from "@mui/icons-material";

import type { UserProfile } from "../types/user.types";

interface ProfileDialogProps {
  open: boolean;
  profile: UserProfile;
  onClose: () => void;
  onSave: (profile: UserProfile) => void;
}

function ProfileDialog({ open, profile, onClose, onSave }: ProfileDialogProps) {
  const [draftProfile, setDraftProfile] = useState<UserProfile>(profile);

  const [confirmPassword, setConfirmPassword] = useState(profile.password);

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [nameError, setNameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDraftProfile((current) => ({
      ...current,
      name: event.target.value,
    }));

    setNameError("");
  };

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDraftProfile((current) => ({
      ...current,
      username: event.target.value,
    }));

    setUsernameError("");
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDraftProfile((current) => ({
      ...current,
      email: event.target.value,
    }));

    setEmailError("");
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDraftProfile((current) => ({
      ...current,
      password: event.target.value,
    }));

    setPasswordError("");
    setConfirmPasswordError("");
  };

  const handleConfirmPasswordChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setConfirmPassword(event.target.value);
    setConfirmPasswordError("");
  };

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setDraftProfile((current) => ({
        ...current,
        avatar: reader.result as string,
      }));
    };

    reader.readAsDataURL(file);
  };

  const validateForm = (): boolean => {
    let isValid = true;

    setNameError("");
    setUsernameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    if (!draftProfile.name.trim()) {
      setNameError("Name is required");
      isValid = false;
    }

    if (!draftProfile.username.trim()) {
      setUsernameError("Username is required");
      isValid = false;
    }

    if (!draftProfile.email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draftProfile.email)) {
      setEmailError("Please enter a valid email");
      isValid = false;
    }

    if (!draftProfile.password.trim()) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (draftProfile.password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      isValid = false;
    }

    if (draftProfile.password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    }

    return isValid;
  };

  const handleSave = () => {
    if (!validateForm()) {
      return;
    }

    onSave({
      ...draftProfile,
      name: draftProfile.name.trim(),
      username: draftProfile.username.trim(),
      email: draftProfile.email.trim(),
    });

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: 700 }}>Profile Settings</DialogTitle>

      <DialogContent>
        {/* Profile Avatar */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Box sx={{ position: "relative", mb: 1 }}>
            <Avatar
              src={draftProfile.avatar ?? undefined}
              sx={{
                width: 96,
                height: 96,
                fontSize: 36,
              }}
            >
              {!draftProfile.avatar &&
                draftProfile.name.charAt(0).toUpperCase()}
            </Avatar>

            <Tooltip title="Change profile photo">
              <IconButton
                component="label"
                sx={{
                  position: "absolute",
                  right: -4,
                  bottom: -4,
                  backgroundColor: "background.paper",
                  border: "1px solid",
                  borderColor: "divider",
                  "&:hover": {
                    backgroundColor: "action.hover",
                  },
                }}
              >
                <PhotoCamera fontSize="small" />

                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
              </IconButton>
            </Tooltip>
          </Box>

          <Typography variant="body2" color="text.secondary">
            Click the camera icon to change your photo
          </Typography>
        </Box>

        {/* Name */}
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          value={draftProfile.name}
          onChange={handleNameChange}
          error={Boolean(nameError)}
          helperText={nameError}
        />

        {/* Username */}
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          value={draftProfile.username}
          onChange={handleUsernameChange}
          error={Boolean(usernameError)}
          helperText={usernameError}
        />

        {/* Email */}
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={draftProfile.email}
          onChange={handleEmailChange}
          error={Boolean(emailError)}
          helperText={emailError}
        />

        {/* Password */}
        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          fullWidth
          margin="normal"
          value={draftProfile.password}
          onChange={handlePasswordChange}
          error={Boolean(passwordError)}
          helperText={passwordError}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    <IconButton
                      onClick={() => setShowPassword((current) => !current)}
                      edge="end"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
            },
          }}
        />

        {/* Confirm Password */}
        <TextField
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          error={Boolean(confirmPasswordError)}
          helperText={confirmPasswordError}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip
                    title={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                  >
                    <IconButton
                      onClick={() =>
                        setShowConfirmPassword((current) => !current)
                      }
                      edge="end"
                      aria-label={
                        showConfirmPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
            },
          }}
        />
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose}>Cancel</Button>

        <Button variant="contained" onClick={handleSave}>
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ProfileDialog;
