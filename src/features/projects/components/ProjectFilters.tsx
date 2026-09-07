import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import type { ProjectStatus } from "../types/project.types";

interface ProjectFiltersProps {
  search: string;
  status: ProjectStatus | "All";
  onSearchChange: (value: string) => void;
  onStatusChange: (value: ProjectStatus | "All") => void;
  onClearFilters: () => void;
}

function ProjectFilters({
  search,
  status,
  onSearchChange,
  onStatusChange,
  onClearFilters,
}: ProjectFiltersProps) {
  const hasActiveFilters = search.trim() !== "" || status !== "All";

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        mb: 3,
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <TextField
        label="Search projects"
        placeholder="Search by name or description..."
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        size="small"
        sx={{
          minWidth: 280,
          flex: 1,
        }}
      />

      <FormControl
        size="small"
        sx={{
          minWidth: 180,
        }}
      >
        <InputLabel id="project-status-label">Status</InputLabel>

        <Select
          labelId="project-status-label"
          value={status}
          label="Status"
          onChange={(event) =>
            onStatusChange(event.target.value as ProjectStatus | "All")
          }
        >
          <MenuItem value="All">All</MenuItem>

          <MenuItem value="Planning">Planning</MenuItem>

          <MenuItem value="Active">Active</MenuItem>

          <MenuItem value="Completed">Completed</MenuItem>
        </Select>
      </FormControl>

      {hasActiveFilters && (
        <Button variant="outlined" onClick={onClearFilters}>
          Clear Filters
        </Button>
      )}
    </Box>
  );
}

export default ProjectFilters;
