import { useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import { useCreateTask, useUpdateTask } from "../hooks/useTasks";

import type { Task, TaskPriority, TaskStatus } from "../types/task.types";

interface CreateTaskDialogProps {
  open: boolean;
  onClose: () => void;
  task?: Task | null;
  onSuccess?: (message: string) => void;
}

function CreateTaskDialog({
  open,
  onClose,
  task,
  onSuccess,
}: CreateTaskDialogProps) {
  const [title, setTitle] = useState(task?.title ?? "");
  const [status, setStatus] = useState<TaskStatus>(task?.status ?? "Todo");
  const [priority, setPriority] = useState<TaskPriority>(
    task?.priority ?? "Medium",
  );

  const createTaskMutation = useCreateTask();
  const updateTaskMutation = useUpdateTask();

  const isEditMode = Boolean(task);

  const handleSubmit = () => {
    if (!title.trim()) {
      return;
    }

    const taskData = {
      title: title.trim(),
      status,
      priority,
    };

    if (task) {
      updateTaskMutation.mutate(
        {
          taskId: task.id,
          task: taskData,
        },
        {
          onSuccess: () => {
            onSuccess?.("Task updated successfully!");
            onClose();
          },
        },
      );

      return;
    }

    createTaskMutation.mutate(taskData, {
      onSuccess: () => {
        onSuccess?.("Task created successfully!");
        onClose();
      },
    });
  };

  const isPending =
    createTaskMutation.isPending || updateTaskMutation.isPending;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{isEditMode ? "Edit Task" : "Create New Task"}</DialogTitle>

      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Task Title"
          fullWidth
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Status</InputLabel>

          <Select
            value={status}
            label="Status"
            onChange={(event) => setStatus(event.target.value as TaskStatus)}
          >
            <MenuItem value="Todo">Todo</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Done">Done</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Priority</InputLabel>

          <Select
            value={priority}
            label="Priority"
            onChange={(event) =>
              setPriority(event.target.value as TaskPriority)
            }
          >
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={isPending || !title.trim()}
        >
          {isPending
            ? "Saving..."
            : isEditMode
              ? "Save Changes"
              : "Create Task"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateTaskDialog;
