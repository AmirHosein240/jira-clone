import {
  Box,
  Card,
  CardContent,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import type { Task } from "../types/task.types";
import { useTasks } from "../hooks/useTasks";

const getStatusColor = (status: Task["status"]) => {
  switch (status) {
    case "Done":
      return "success";

    case "In Progress":
      return "info";

    case "Todo":
      return "default";

    default:
      return "default";
  }
};
const getPriorityColor = (priority: Task["priority"]) => {
  switch (priority) {
    case "High":
      return "error";

    case "Medium":
      return "warning";

    case "Low":
      return "success";

    default:
      return "default";
  }
};

function RecentTasks() {
  const { data: tasks, isLoading, isError } = useTasks();

  if (isLoading) {
    return <Typography>Loading tasks...</Typography>;
  }
  if (isError) {
    return <Typography color="error">Failed to load tasks.</Typography>;
  }

  return (
    <Card
      elevation={0}
      sx={{
        mt: 4,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
      }}
    >
      <CardContent>
        <Box
          sx={{
            mb: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Recent Tasks
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Recently created and updated tasks
          </Typography>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Task</TableCell>

                <TableCell>Status</TableCell>

                <TableCell>Priority</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {tasks?.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>{task.title}</TableCell>

                  <TableCell>
                    <Chip
                      label={task.status}
                      size="small"
                      color={getStatusColor(task.status)}
                    />
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={task.priority}
                      size="small"
                      color={getPriorityColor(task.priority)}
                      variant="outlined"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}

export default RecentTasks;
