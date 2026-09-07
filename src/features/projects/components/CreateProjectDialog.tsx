import { useState, type ChangeEvent } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import { useCreateProject, useUpdateProject } from "../hooks/useProjects";

import type { Project, ProjectStatus } from "../types/project.types";

interface CreateProjectDialogProps {
  open: boolean;
  onClose: () => void;
  project?: Project | null;
  onSuccess?: (message: string) => void;
}

function CreateProjectDialog({
  open,
  onClose,
  project,
  onSuccess,
}: CreateProjectDialogProps) {
  const [name, setName] = useState(project?.name ?? "");
  const [description, setDescription] = useState(project?.description ?? "");
  const [status, setStatus] = useState<ProjectStatus>(
    project?.status ?? "Planning",
  );
  const [nameError, setNameError] = useState("");

  const createProjectMutation = useCreateProject();
  const updateProjectMutation = useUpdateProject();

  const isEditMode = Boolean(project);

  const isPending =
    createProjectMutation.isPending || updateProjectMutation.isPending;

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setName(value);

    if (value.trim()) {
      setNameError("");
    }
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleSubmit = () => {
    if (!name.trim()) {
      setNameError("Project name is required.");
      return;
    }

    setNameError("");

    const projectData = {
      name: name.trim(),
      description: description.trim(),
      status,
    };

    if (project) {
      updateProjectMutation.mutate(
        {
          projectId: project.id,
          project: projectData,
        },
        {
          onSuccess: () => {
            onSuccess?.("Project updated successfully!");
            onClose();
          },
        },
      );

      return;
    }

    createProjectMutation.mutate(projectData, {
      onSuccess: () => {
        onSuccess?.("Project created successfully!");
        onClose();
      },
    });
  };

  const handleClose = () => {
    if (isPending) {
      return;
    }

    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: 700 }}>
        {isEditMode ? "Edit Project" : "Create New Project"}
      </DialogTitle>

      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Project Name"
          placeholder="Enter project name..."
          fullWidth
          value={name}
          onChange={handleNameChange}
          error={Boolean(nameError)}
          helperText={nameError}
        />

        <TextField
          label="Description"
          placeholder="Describe your project..."
          fullWidth
          multiline
          rows={4}
          margin="normal"
          value={description}
          onChange={handleDescriptionChange}
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Status</InputLabel>

          <Select
            value={status}
            label="Status"
            onChange={(event) => setStatus(event.target.value as ProjectStatus)}
          >
            <MenuItem value="Planning">Planning</MenuItem>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>

          <FormHelperText>Choose the current project status.</FormHelperText>
        </FormControl>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={handleClose} disabled={isPending}>
          Cancel
        </Button>

        <Button variant="contained" onClick={handleSubmit} disabled={isPending}>
          {isPending
            ? "Saving..."
            : isEditMode
              ? "Save Changes"
              : "Create Project"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateProjectDialog;
