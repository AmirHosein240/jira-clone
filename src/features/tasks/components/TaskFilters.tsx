import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Grid,
} from "@mui/material";

import type { TaskPriorityFilter, TaskStatusFilter } from "../types/task.types";

interface TaskFiltersProps {
  search: string;
  status: TaskStatusFilter;
  priority: TaskPriorityFilter;

  onSearchChange: (value: string) => void;
  onStatusChange: (value: TaskStatusFilter) => void;
  onPriorityChange: (value: TaskPriorityFilter) => void;
}

function TaskFilters({
  search,
  status,
  priority,
  onSearchChange,
  onStatusChange,
  onPriorityChange,
}: TaskFiltersProps) {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          label="Search tasks"
          placeholder="Search by title..."
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          fullWidth
        />
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>

          <Select
            value={status}
            label="Status"
            onChange={(event) =>
              onStatusChange(event.target.value as TaskStatusFilter)
            }
          >
            <MenuItem value="All">All</MenuItem>

            <MenuItem value="Todo">Todo</MenuItem>

            <MenuItem value="In Progress">In Progress</MenuItem>

            <MenuItem value="Done">Done</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid size={{ xs: 12, md: 3 }}>
        <FormControl fullWidth>
          <InputLabel>Priority</InputLabel>

          <Select
            value={priority}
            label="Priority"
            onChange={(event) =>
              onPriorityChange(event.target.value as TaskPriorityFilter)
            }
          >
            <MenuItem value="All">All</MenuItem>

            <MenuItem value="Low">Low</MenuItem>

            <MenuItem value="Medium">Medium</MenuItem>

            <MenuItem value="High">High</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}

export default TaskFilters;
