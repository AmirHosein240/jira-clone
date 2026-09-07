import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { useDeleteTask } from "../hooks/useTasks";

interface DeleteTaskDialogProps {
  open: boolean;
  taskId: number | null;
  onClose: () => void;
  onSuccess?: (message: string) => void;
}

function DeleteTaskDialog({
  open,
  taskId,
  onClose,
  onSuccess,
}: DeleteTaskDialogProps) {
  const deleteTaskMutation = useDeleteTask();

  const handleDelete = () => {
    if (taskId === null) {
      return;
    }

    deleteTaskMutation.mutate(taskId, {
      onSuccess: () => {
        onSuccess?.("Task deleted successfully!");
        onClose();
      },
    });
  };

  const handleClose = () => {
    if (deleteTaskMutation.isPending) {
      return;
    }

    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle
        sx={{
          fontWeight: 700,
        }}
      >
        Delete Task?
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this task? This action cannot be
          undone.
        </DialogContentText>
      </DialogContent>

      <DialogActions
        sx={{
          px: 3,
          pb: 2,
        }}
      >
        <Button onClick={handleClose} disabled={deleteTaskMutation.isPending}>
          Cancel
        </Button>

        <Button
          onClick={handleDelete}
          variant="contained"
          color="error"
          disabled={deleteTaskMutation.isPending || taskId === null}
        >
          {deleteTaskMutation.isPending ? "Deleting..." : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteTaskDialog;
