import { Box, Button, Typography } from "@mui/material";

interface StatusMessageProps {
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

function StatusMessage({
  title,
  message,
  actionLabel,
  onAction,
}: StatusMessageProps) {
  return (
    <Box
      sx={{
        textAlign: "center",
        py: 6,
      }}
    >
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>

      <Typography color="text.secondary" sx={{ mb: actionLabel ? 2 : 0 }}>
        {message}
      </Typography>

      {actionLabel && onAction && (
        <Button variant="contained" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </Box>
  );
}

export default StatusMessage;
