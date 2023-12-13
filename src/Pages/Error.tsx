import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item>
        <Typography variant="h2" align="center">
          404 - Not Found
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body1" align="center">
          The page you are looking for does not exist.
        </Typography>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/"
          style={{ marginTop: "20px" }}
        >
          Go Home
        </Button>
      </Grid>
    </Grid>
  );
};

export default ErrorPage;
