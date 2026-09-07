import {
  Box,
  Button,
  Chip,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { useState } from "react";

import { useUsers } from "../hooks/useUsers";

import type { UserRole, UserStatus } from "../types/user.types";

import TableSkeleton from "../../../components/TableSkeleton";
import StatusMessage from "../../../components/StatusMessage";

interface UserTableProps {
  search: string;
  role: UserRole | "All";
  status: UserStatus | "All";
}

function UserTable({ search, role, status }: UserTableProps) {
  const { data: users, isLoading, isError, refetch, isFetching } = useUsers();

  const [page, setPage] = useState(1);

  const rowsPerPage = 5;

  if (isLoading) {
    return <TableSkeleton rows={5} columns={4} />;
  }

  if (isError) {
    return (
      <StatusMessage
        title="Failed to load users."
        message="Something went wrong while loading users."
        actionLabel={isFetching ? "Retrying..." : "Try Again"}
        onAction={() => refetch()}
      />
    );
  }

  if (!users?.length) {
    return (
      <Box sx={{ textAlign: "center", py: 6 }}>
        <Typography variant="h6" gutterBottom>
          No users found
        </Typography>

        <Typography color="text.secondary">
          There are no users available yet.
        </Typography>
      </Box>
    );
  }

  const normalizedSearch = search.trim().toLowerCase();

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      normalizedSearch === "" ||
      user.name.toLowerCase().includes(normalizedSearch) ||
      user.email.toLowerCase().includes(normalizedSearch);

    const matchesRole = role === "All" || user.role === role;

    const matchesStatus = status === "All" || user.status === status;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const hasActiveFilters =
    search.trim() !== "" || role !== "All" || status !== "All";

  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);

  const paginatedUsers = filteredUsers.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage,
  );

  if (!filteredUsers.length) {
    return (
      <Box sx={{ textAlign: "center", py: 6 }}>
        <Typography variant="h6" gutterBottom>
          No users match your filters
        </Typography>

        <Typography color="text.secondary" sx={{ mb: 2 }}>
          Try changing your search or filters.
        </Typography>

        {hasActiveFilters && (
          <Button variant="outlined" onClick={() => setPage(1)}>
            Reset Page
          </Button>
        )}
      </Box>
    );
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Showing {filteredUsers.length}{" "}
          {filteredUsers.length === 1 ? "user" : "users"}
        </Typography>

        {hasActiveFilters && (
          <Button size="small" onClick={() => setPage(1)}>
            Reset Page
          </Button>
        )}
      </Box>

      <TableContainer
        component={Paper}
        elevation={0}
        sx={{ overflowX: "auto" }}
      >
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "action.hover",
              }}
            >
              <TableCell sx={{ fontWeight: 700 }}>User</TableCell>

              <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>

              <TableCell sx={{ fontWeight: 700 }}>Role</TableCell>

              <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedUsers.map((user) => (
              <TableRow
                key={user.id}
                hover
                sx={{
                  "&:last-child td, &:last-child th": {
                    border: 0,
                  },
                }}
              >
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {user.name}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {user.email}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Chip
                    label={user.role}
                    size="small"
                    color={
                      user.role === "Admin"
                        ? "error"
                        : user.role === "Manager"
                          ? "info"
                          : "default"
                    }
                  />
                </TableCell>

                <TableCell>
                  <Chip
                    label={user.status}
                    size="small"
                    color={user.status === "Active" ? "success" : "default"}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {totalPages > 1 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 3,
          }}
        >
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
            shape="rounded"
          />
        </Box>
      )}
    </>
  );
}

export default UserTable;
