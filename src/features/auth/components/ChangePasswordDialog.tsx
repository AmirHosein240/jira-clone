import { useState, type ChangeEvent } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";

import type { UserProfile } from "../types/user.types";

interface ChangePasswordDialogProps {
  open: boolean;
  profile: UserProfile;
  onClose: () => void;
  onSave: (profile: UserProfile) => void;
}

function ChangePasswordDialog({
  open,
  profile,
  onClose,
  onSave,
}: ChangePasswordDialogProps) {
  const [currentPassword, setCurrentPassword] = useState("");

  const [newPassword, setNewPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);

  const [showNewPassword, setShowNewPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [currentPasswordError, setCurrentPasswordError] = useState("");

  const [newPasswordError, setNewPasswordError] = useState("");

  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handleCurrentPasswordChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setCurrentPassword(event.target.value);
    setCurrentPasswordError("");
  };

  const handleNewPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value);
    setNewPasswordError("");
    setConfirmPasswordError("");
  };

  const handleConfirmPasswordChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setConfirmPassword(event.target.value);
    setConfirmPasswordError("");
  };

  const validateForm = (): boolean => {
    let isValid = true;

    setCurrentPasswordError("");
    setNewPasswordError("");
    setConfirmPasswordError("");

    if (!currentPassword) {
      setCurrentPasswordError("Current password is required");
      isValid = false;
    } else if (currentPassword !== profile.password) {
      setCurrentPasswordError("Current password is incorrect");
      isValid = false;
    }

    if (!newPassword) {
      setNewPasswordError("New password is required");
      isValid = false;
    } else if (newPassword.length < 6) {
      setNewPasswordError("Password must be at least 6 characters");
      isValid = false;
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Please confirm your password");
      isValid = false;
    } else if (newPassword !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    }

    if (currentPassword === newPassword && currentPassword) {
      setNewPasswordError("New password must be different");
      isValid = false;
    }

    return isValid;
  };

  const handleSave = () => {
    if (!validateForm()) {
      return;
    }

    onSave({
      ...profile,
      password: newPassword,
    });

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    onClose();
  };

  const handleClose = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    setCurrentPasswordError("");
    setNewPasswordError("");
    setConfirmPasswordError("");

    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);

    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: 700 }}>Change Password</DialogTitle>

      <DialogContent>
        <TextField
          label="Current Password"
          type={showCurrentPassword ? "text" : "password"}
          fullWidth
          margin="normal"
          value={currentPassword}
          onChange={handleCurrentPasswordChange}
          error={Boolean(currentPasswordError)}
          helperText={currentPasswordError}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip
                    title={
                      showCurrentPassword ? "Hide password" : "Show password"
                    }
                  >
                    <IconButton
                      onClick={() =>
                        setShowCurrentPassword((current) => !current)
                      }
                      edge="end"
                      aria-label={
                        showCurrentPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
            },
          }}
        />

        <TextField
          label="New Password"
          type={showNewPassword ? "text" : "password"}
          fullWidth
          margin="normal"
          value={newPassword}
          onChange={handleNewPasswordChange}
          error={Boolean(newPasswordError)}
          helperText={newPasswordError}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip
                    title={showNewPassword ? "Hide password" : "Show password"}
                  >
                    <IconButton
                      onClick={() => setShowNewPassword((current) => !current)}
                      edge="end"
                      aria-label={
                        showNewPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
            },
          }}
        />

        <TextField
          label="Confirm New Password"
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
        <Button onClick={handleClose}>Cancel</Button>

        <Button variant="contained" onClick={handleSave}>
          Change Password
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ChangePasswordDialog;
