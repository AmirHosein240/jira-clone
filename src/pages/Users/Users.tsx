import { useState } from "react";

import { Box, Card, CardContent, Typography } from "@mui/material";

import UserFilters from "../../features/users/components/UserFilters";
import UserTable from "../../features/users/components/UserTable";

import type {
  UserRole,
  UserStatus,
} from "../../features/users/types/user.types";

function Users() {
  const [search, setSearch] = useState("");

  const [role, setRole] = useState<UserRole | "All">("All");

  const [status, setStatus] = useState<UserStatus | "All">("All");

  const handleClearFilters = () => {
    setSearch("");
    setRole("All");
    setStatus("All");
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: 1,
          }}
        >
          Users
        </Typography>

        <Typography color="text.secondary">
          Manage and view all users.
        </Typography>
      </Box>

      <UserFilters
        search={search}
        role={role}
        status={status}
        onSearchChange={setSearch}
        onRoleChange={setRole}
        onStatusChange={setStatus}
        onClearFilters={handleClearFilters}
      />

      <Card
        elevation={0}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 3,
        }}
      >
        <CardContent>
          <UserTable search={search} role={role} status={status} />
        </CardContent>
      </Card>
    </Box>
  );
}

export default Users;
