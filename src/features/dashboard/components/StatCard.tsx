import { Card, CardContent, Typography, Box } from "@mui/material";

interface Props {
  title: string;
  value: number;
  description: string;
}

function StatCard({ title, value, description }: Props) {
  return (
    <Card
      sx={{
        height: "100%",
      }}
    >
      <CardContent>
        <Typography color="text.secondary" variant="body2">
          {title}
        </Typography>

        <Typography
          variant="h3"
          sx={{
            mt: 1,
            mb: 1,
          }}
        >
          {value}
        </Typography>

        <Box>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default StatCard;
