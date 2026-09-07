import { useState } from "react";

import { Box, Button, Card, CardContent, Typography } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import ProjectTable from "../../features/projects/components/ProjectTable";

import ProjectFilters from "../../features/projects/components/ProjectFilters";

import CreateProjectDialog from "../../features/projects/components/CreateProjectDialog";

import DeleteProjectDialog from "../../features/projects/components/DeleteProjectDialog";

import AppSnackbar from "../../components/AppSnackbar";

import type {
  Project,
  ProjectStatus,
} from "../../features/projects/types/project.types";

function Projects() {
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState<ProjectStatus | "All">("All");

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "info" | "warning",
  });

  const handleAddProject = () => {
    setSelectedProject(null);
    setIsProjectDialogOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setSelectedProject(project);
    setIsProjectDialogOpen(true);
  };

  const handleDeleteProject = (project: Project) => {
    setSelectedProject(project);
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsProjectDialogOpen(false);
    setSelectedProject(null);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setSelectedProject(null);
  };

  const handleProjectSuccess = (message: string) => {
    setSnackbar({
      open: true,
      message,
      severity: "success",
    });
  };

  const handleClearFilters = () => {
    setSearch("");
    setStatus("All");
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }));
  };

  return (
    <Box>
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
            Projects
          </Typography>

          <Typography color="text.secondary">
            Manage and track all your projects.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddProject}
        >
          Add Project
        </Button>
      </Box>

      <Card
        elevation={0}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 3,
        }}
      >
        <CardContent>
          <ProjectFilters
            search={search}
            status={status}
            onSearchChange={setSearch}
            onStatusChange={setStatus}
            onClearFilters={handleClearFilters}
          />

          <ProjectTable
            search={search}
            status={status}
            onEdit={handleEditProject}
            onDelete={handleDeleteProject}
          />
        </CardContent>
      </Card>

      <CreateProjectDialog
        key={selectedProject?.id ?? "new"}
        open={isProjectDialogOpen}
        project={selectedProject}
        onClose={handleCloseDialog}
        onSuccess={handleProjectSuccess}
      />

      <DeleteProjectDialog
        open={isDeleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        project={selectedProject}
        onSuccess={handleProjectSuccess}
      />

      <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
      />
    </Box>
  );
}

export default Projects;
