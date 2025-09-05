import React from "react";
import { Link } from "react-router-dom";
import { Button, Typography, Box } from "@mui/material";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";

const NotFound = () => {
  return (
    <Box
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      bgcolor="#f5f5f5"
      px={2}
    >
      <SentimentDissatisfiedIcon sx={{ fontSize: 80, color: "grey.500", mb: 2 }} />
      <Typography variant="h2" gutterBottom>
        404
      </Typography>
      <Typography variant="h6" color="textSecondary" mb={4}>
        Oops! The page you're looking for doesn't exist.
      </Typography>
      <Button className="button"
        component={Link}
        to="/"
        variant="contained"
        style={{ color: "#fff", background: "#08053B" }}
      >
        Go Back Home
      </Button>

    </Box>
  );
};

export default NotFound;
