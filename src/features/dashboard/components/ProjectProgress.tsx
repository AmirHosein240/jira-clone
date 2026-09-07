import { Box, Typography, LinearProgress, Paper } from "@mui/material";

const projects = [
  {
    name: "Website",
    progress: 70,
  },

  {
    name: "Mobile App",
    progress: 40,
  },

  {
    name: "Dashboard",
    progress: 90,
  },
];

function ProjectProgress() {
  return (
    <Paper
      sx={{
        p: 3,
        mt: 3,
      }}
    >
      <Typography variant="h5">Project Progress</Typography>

      {projects.map((project) => (
        <Box key={project.name}>
          <Typography>{project.name}</Typography>

          <LinearProgress variant="determinate" value={project.progress} />

          <Typography variant="body2">{project.progress}%</Typography>
        </Box>
      ))}
    </Paper>
  );
}

export default ProjectProgress;
