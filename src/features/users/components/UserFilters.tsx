import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import type { UserRole, UserStatus } from "../types/user.types";

interface UserFiltersProps {
  search: string;
  role: UserRole | "All";
  status: UserStatus | "All";
  onSearchChange: (value: string) => void;
  onRoleChange: (value: UserRole | "All") => void;
  onStatusChange: (value: UserStatus | "All") => void;
  onClearFilters: () => void;
}

function UserFilters({
  search,
  role,
  status,
  onSearchChange,
  onRoleChange,
  onStatusChange,
  onClearFilters,
}: UserFiltersProps) {
  const hasActiveFilters =
    search.trim() !== "" || role !== "All" || status !== "All";

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        mb: 3,
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <TextField
        label="Search users"
        placeholder="Search by name or email..."
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        size="small"
        sx={{
          minWidth: 280,
          flex: 1,
        }}
      />

      <FormControl
        size="small"
        sx={{
          minWidth: 160,
        }}
      >
        <InputLabel id="user-role-label">Role</InputLabel>

        <Select
          labelId="user-role-label"
          value={role}
          label="Role"
          onChange={(event) =>
            onRoleChange(event.target.value as UserRole | "All")
          }
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Admin">Admin</MenuItem>
          <MenuItem value="Manager">Manager</MenuItem>
          <MenuItem value="Member">Member</MenuItem>
        </Select>
      </FormControl>

      <FormControl
        size="small"
        sx={{
          minWidth: 160,
        }}
      >
        <InputLabel id="user-status-label">Status</InputLabel>

        <Select
          labelId="user-status-label"
          value={status}
          label="Status"
          onChange={(event) =>
            onStatusChange(event.target.value as UserStatus | "All")
          }
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Inactive">Inactive</MenuItem>
        </Select>
      </FormControl>

      {hasActiveFilters && (
        <Button variant="outlined" onClick={onClearFilters}>
          Clear Filters
        </Button>
      )}
    </Box>
  );
}

export default UserFilters;
