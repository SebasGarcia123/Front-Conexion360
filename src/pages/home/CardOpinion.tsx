import { Card, CardContent, Typography, Box, Rating } from "@mui/material";

interface Opinion {
  name: string;
  role: string;
  company: string;
  comment: string;
  rating: number;
}

interface CardOpinionProps {
  opinion: Opinion;
}

export const CardOpinion = ({ opinion }: CardOpinionProps) => {
  return (
    <Box px={1}>
      <Card sx={{ height: "100%" }}>
        <CardContent>
          <Rating value={opinion.rating} precision={0.5} readOnly />

          <Typography variant="body2" sx={{ mt: 1, mb: 2 }}>
            “{opinion.comment}”
          </Typography>

          <Typography variant="subtitle1" fontWeight="bold">
            {opinion.name}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {opinion.role} · {opinion.company}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};
