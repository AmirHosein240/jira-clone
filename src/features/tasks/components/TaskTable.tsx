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

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { useState } from "react";

import { useTasks } from "../hooks/useTasks";

import type {
  Task,
  TaskPriorityFilter,
  TaskStatusFilter,
} from "../types/task.types";

import TableSkeleton from "../../../components/TableSkeleton";
import StatusMessage from "../../../components/StatusMessage";

interface TaskTableProps {
  search: string;
  status: TaskStatusFilter;
  priority: TaskPriorityFilter;
  onEdit: (task: Task) => void;
  onDelete: (taskId: number) => void;
  onClearFilters: () => void;
}

function TaskTable({
  search,
  status,
  priority,
  onEdit,
  onDelete,
  onClearFilters,
}: TaskTableProps) {
  const { data: tasks, isLoading, isError, refetch, isFetching } = useTasks();

  const [page, setPage] = useState(1);

  const rowsPerPage = 5;

  if (isLoading) {
    return <TableSkeleton rows={5} columns={4} />;
  }

  if (isError) {
    return (
      <StatusMessage
        title="Failed to load tasks."
        message="Something went wrong while loading tasks."
        actionLabel={isFetching ? "Retrying..." : "Try Again"}
        onAction={() => refetch()}
      />
    );
  }

  const filteredTasks =
    tasks?.filter((task) => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus = status === "All" || task.status === status;

      const matchesPriority = priority === "All" || task.priority === priority;

      return matchesSearch && matchesStatus && matchesPriority;
    }) ?? [];

  const hasActiveFilters =
    search.trim() !== "" || status !== "All" || priority !== "All";

  const totalPages = Math.ceil(filteredTasks.length / rowsPerPage);

  const paginatedTasks = filteredTasks.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage,
  );

  if (!filteredTasks.length) {
    return (
      <Box sx={{ textAlign: "center", py: 6 }}>
        <Typography variant="h6" gutterBottom>
          No tasks found
        </Typography>

        <Typography color="text.secondary" sx={{ mb: 2 }}>
          {hasActiveFilters
            ? "Try changing your search or filters."
            : "There are no tasks available yet."}
        </Typography>

        {hasActiveFilters && (
          <Button variant="outlined" onClick={onClearFilters}>
            Clear Filters
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
          Showing {filteredTasks.length}{" "}
          {filteredTasks.length === 1 ? "task" : "tasks"}
        </Typography>

        {hasActiveFilters && (
          <Button size="small" onClick={onClearFilters}>
            Clear Filters
          </Button>
        )}
      </Box>

      <TableContainer component={Paper} elevation={0}>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "action.hover",
              }}
            >
              <TableCell sx={{ fontWeight: 700 }}>Task</TableCell>

              <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>

              <TableCell sx={{ fontWeight: 700 }}>Priority</TableCell>

              <TableCell align="right" sx={{ fontWeight: 700 }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedTasks.map((task) => (
              <TableRow
                key={task.id}
                hover
                sx={{
                  "&:last-child td, &:last-child th": {
                    border: 0,
                  },
                }}
              >
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {task.title}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Chip
                    label={task.status}
                    size="small"
                    color={
                      task.status === "Done"
                        ? "success"
                        : task.status === "In Progress"
                          ? "info"
                          : "default"
                    }
                  />
                </TableCell>

                <TableCell>
                  <Chip
                    label={task.priority}
                    size="small"
                    variant="outlined"
                    color={
                      task.priority === "High"
                        ? "error"
                        : task.priority === "Medium"
                          ? "warning"
                          : "success"
                    }
                  />
                </TableCell>

                <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>
                  <Tooltip title="Edit task">
                    <IconButton
                      color="primary"
                      aria-label="edit task"
                      onClick={() => onEdit(task)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Delete task">
                    <IconButton
                      color="error"
                      aria-label="delete task"
                      onClick={() => onDelete(task.id)}
                    >
                      <DeleteIcon />
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

export default TaskTable;
