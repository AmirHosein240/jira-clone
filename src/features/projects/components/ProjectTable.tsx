import {
  Box,
  Button,
  Chip,
  IconButton,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useState } from "react";

import { useProjects } from "../hooks/useProjects";

import type { Project, ProjectStatus } from "../types/project.types";

import TableSkeleton from "../../../components/TableSkeleton";
import StatusMessage from "../../../components/StatusMessage";

interface ProjectTableProps {
  search: string;
  status: ProjectStatus | "All";
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
}

function ProjectTable({ search, status, onEdit, onDelete }: ProjectTableProps) {
  const {
    data: projects,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useProjects();

  const [page, setPage] = useState(1);

  const rowsPerPage = 5;

  if (isLoading) {
    return <TableSkeleton rows={5} columns={5} />;
  }

  if (isError) {
    return (
      <StatusMessage
        title="Failed to load projects."
        message="Something went wrong while loading projects."
        actionLabel={isFetching ? "Retrying..." : "Try Again"}
        onAction={() => refetch()}
      />
    );
  }

  if (!projects?.length) {
    return (
      <Box sx={{ textAlign: "center", py: 6 }}>
        <Typography variant="h6" gutterBottom>
          No projects found
        </Typography>

        <Typography color="text.secondary">
          There are no projects available yet.
        </Typography>
      </Box>
    );
  }

  const normalizedSearch = search.trim().toLowerCase();

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(normalizedSearch) ||
      project.description.toLowerCase().includes(normalizedSearch);

    const matchesStatus = status === "All" || project.status === status;

    return matchesSearch && matchesStatus;
  });

  const hasActiveFilters = search.trim() !== "" || status !== "All";

  const totalPages = Math.ceil(filteredProjects.length / rowsPerPage);

  const paginatedProjects = filteredProjects.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage,
  );

  if (!filteredProjects.length) {
    return (
      <Box sx={{ textAlign: "center", py: 6 }}>
        <Typography variant="h6" gutterBottom>
          No matching projects
        </Typography>

        <Typography color="text.secondary" sx={{ mb: 2 }}>
          Try changing your search or filter.
        </Typography>

        {hasActiveFilters && (
          <Button variant="outlined" sx={{ mt: 2 }} onClick={() => setPage(1)}>
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
          Showing {filteredProjects.length}{" "}
          {filteredProjects.length === 1 ? "project" : "projects"}
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
        <Table sx={{ minWidth: 750 }}>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "action.hover",
              }}
            >
              <TableCell sx={{ fontWeight: 700 }}>Project</TableCell>

              <TableCell sx={{ fontWeight: 700 }}>Description</TableCell>

              <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>

              <TableCell sx={{ fontWeight: 700 }}>Tasks</TableCell>

              <TableCell
                sx={{
                  fontWeight: 700,
                  width: 120,
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedProjects.map((project) => (
              <TableRow
                key={project.id}
                hover
                sx={{
                  "&:last-child td, &:last-child th": {
                    border: 0,
                  },
                }}
              >
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {project.name}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      maxWidth: 400,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {project.description}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Chip
                    label={project.status}
                    size="small"
                    color={
                      project.status === "Completed"
                        ? "success"
                        : project.status === "Active"
                          ? "info"
                          : "default"
                    }
                  />
                </TableCell>

                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {project.tasksCount}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Tooltip title="Edit project">
                    <IconButton
                      size="small"
                      onClick={() => onEdit(project)}
                      aria-label="edit project"
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Delete project">
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => onDelete(project)}
                      aria-label="delete project"
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
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

export default ProjectTable;
