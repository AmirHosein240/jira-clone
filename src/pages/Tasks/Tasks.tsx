import { Box, Button, Card, CardContent, Typography } from "@mui/material";

import { useState, type FunctionComponent } from "react";

import AddIcon from "@mui/icons-material/Add";

import TaskTable from "../../features/tasks/components/TaskTable";
import TaskFilters from "../../features/tasks/components/TaskFilters";
import CreateTaskDialog from "../../features/tasks/components/CreateTaskDialog";
import DeleteTaskDialog from "../../features/tasks/components/DeleteTaskDialog";
import AppSnackbar from "../../components/AppSnackbar";

import type {
  Task,
  TaskPriorityFilter,
  TaskStatusFilter,
} from "../../features/tasks/types/task.types";

const Tasks: FunctionComponent = () => {
  const [search, setSearch] = useState<string>("");

  const [status, setStatus] = useState<TaskStatusFilter>("All");

  const [priority, setPriority] = useState<TaskPriorityFilter>("All");

  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);

  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [deletingTaskId, setDeletingTaskId] = useState<number | null>(null);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "info" | "warning",
  });

  const handleClearFilters = () => {
    setSearch("");
    setStatus("All");
    setPriority("All");
  };

  const showSnackbar = (
    message: string,
    severity: "success" | "error" | "info" | "warning" = "success",
  ) => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }));
  };

  const handleAddTask = () => {
    setEditingTask(null);
    setIsTaskDialogOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsTaskDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsTaskDialogOpen(false);
    setEditingTask(null);
  };

  const handleDeleteTask = (taskId: number) => {
    setDeletingTaskId(taskId);
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setDeletingTaskId(null);
  };

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 1,
            }}
          >
            Tasks
          </Typography>

          <Typography color="text.secondary">
            Manage and track all your tasks.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddTask}
        >
          Add Task
        </Button>
      </Box>

      {/* Tasks Card */}
      <Card
        elevation={0}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 3,
        }}
      >
        <CardContent>
          <TaskFilters
            status={status}
            search={search}
            priority={priority}
            onSearchChange={setSearch}
            onStatusChange={setStatus}
            onPriorityChange={setPriority}
          />

          <TaskTable
            search={search}
            status={status}
            priority={priority}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onClearFilters={handleClearFilters}
          />
        </CardContent>
      </Card>

      {/* Create / Edit Dialog */}
      <CreateTaskDialog
        key={editingTask?.id ?? "new"}
        open={isTaskDialogOpen}
        task={editingTask}
        onClose={handleCloseDialog}
        onSuccess={showSnackbar}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteTaskDialog
        open={isDeleteDialogOpen}
        taskId={deletingTaskId}
        onClose={handleCloseDeleteDialog}
        onSuccess={showSnackbar}
      />
      <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
      />
    </Box>
  );
};

export default Tasks;
