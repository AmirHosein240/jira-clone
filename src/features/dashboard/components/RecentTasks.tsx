import { useTasks } from "../../tasks/hooks/useTasks";

import { CircularProgress, Box } from "@mui/material";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Typography,
} from "@mui/material";

type ChipColor =
  | "default"
  | "primary"
  | "secondary"
  | "error"
  | "info"
  | "success"
  | "warning";

function getStatusColor(status: string): ChipColor {
  switch (status) {
    case "Done":
      return "success";

    case "In Progress":
      return "primary";

    case "Todo":
      return "default";

    default:
      return "default";
  }
}
function getPriorityColor(priority: string): ChipColor {
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
}

function RecentTasks() {
  const { data: tasks, isLoading } = useTasks();
  if (isLoading) {
    if (isLoading) {
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            p: 3,
          }}
        >
          <CircularProgress />
        </Box>
      );
    }
  }
  return (
    <>
      <Typography
        variant="h5"
        sx={{
          mb: 2,
          mt: 4,
        }}
      >
        RecentTasks
      </Typography>
      <TableContainer component={Paper}>
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
                    color={getStatusColor(task.status)}
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={task.priority}
                    color={getPriorityColor(task.priority)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default RecentTasks;
