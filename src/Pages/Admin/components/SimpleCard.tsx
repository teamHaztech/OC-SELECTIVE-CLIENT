import { Box, Card, CardContent, Stack, Typography } from "@mui/material";

interface Props {
  title: string;
  subtitle?: string | number;
}

const SimpleCard = ({ title, subtitle }: Props) => {
  return (
    <Card
      sx={{
        // background: "inherit",
        width: 1,
        // height: "10rem",
        border: "1px solid lightgray",
        boxShadow: "2px 2px 6px rgba(0, 0, 0, 0.1)",
        py: 2,
      }}
    >
      <CardContent >
        <Stack textAlign="center" rowGap={2} >
          <Typography
            mt={1}
            variant="h4"
            color="textSecondary"
            fontWeight={600}
          >
            {subtitle}
          </Typography>
          <Typography variant="h6" component="div" fontWeight={600}>
            {title}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default SimpleCard;
