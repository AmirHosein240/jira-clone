import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

import { useDeleteProject } from "../hooks/useProjects";

import type { Project } from "../types/project.types";

interface DeleteProjectDialogProps {
  open: boolean;
  onClose: () => void;
  project: Project | null;
  onSuccess?: (message: string) => void;
}

function DeleteProjectDialog({
  open,
  onClose,
  project,
  onSuccess,
}: DeleteProjectDialogProps) {
  const deleteProjectMutation = useDeleteProject();

  const handleDelete = () => {
    if (!project) {
      return;
    }

    deleteProjectMutation.mutate(project.id, {
      onSuccess: () => {
        onSuccess?.("Project deleted successfully!");
        onClose();
      },
    });
  };

  const handleClose = () => {
    if (deleteProjectMutation.isPending) {
      return;
    }

    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Delete Project</DialogTitle>

      <DialogContent>
        <Typography>
          Are you sure you want to delete <strong>{project?.name}</strong>?
        </Typography>

        <Typography color="text.secondary" sx={{ mt: 1 }}>
          This action cannot be undone.
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={handleClose}
          disabled={deleteProjectMutation.isPending}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={handleDelete}
          disabled={deleteProjectMutation.isPending}
        >
          {deleteProjectMutation.isPending ? "Deleting..." : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteProjectDialog;
