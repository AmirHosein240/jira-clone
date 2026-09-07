import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

import FolderIcon from "@mui/icons-material/Folder";
import TaskIcon from "@mui/icons-material/Task";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import RecentTasks from "../../features/tasks/components/RecentTasks";

const stats = [
  {
    title: "Total Projects",
    value: 12,
    icon: <FolderIcon />,
  },
  {
    title: "Total Tasks",
    value: 48,
    icon: <TaskIcon />,
  },
  {
    title: "Completed",
    value: 31,
    icon: <CheckCircleIcon />,
  },
  {
    title: "Pending",
    value: 17,
    icon: <PendingActionsIcon />,
  },
];

function Dashboard() {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 1, fontWeight: 700 }}>
        Dashboard
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Welcome back! Here's what's happening with your projects.
      </Typography>

      <Grid container spacing={3}>
        {stats.map((stat) => (
          <Grid key={stat.title} size={{ xs: 12, sm: 6, md: 3 }}>
            <Card
              elevation={0}
              sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 3,
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography color="text.secondary" variant="body2">
                      {stat.title}
                    </Typography>

                    <Typography variant="h4" sx={{ mt: 1, fontWeight: 700 }}>
                      {stat.value}
                    </Typography>
                  </Box>

                  {stat.icon}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <RecentTasks />
    </Box>
  );
}

export default Dashboard;
