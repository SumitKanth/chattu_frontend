import React from "react";
import { Error as ErrorIcon } from "@mui/icons-material";
import { Container, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container
      maxWidth={"lg"}
      sx={{
        height: "100vh",
      }}
    >
      <Stack alignItems={"center"} justifyContent={"center"} spacing={"2rem"}>
        <ErrorIcon sx={{ fontSize: "10rem" }} />
        <Typography variant="h1">404</Typography>
        <Typography variant="h4">Not Found</Typography>
        <Link to="/">Go Back To Home</Link>
      </Stack>
    </Container>
  );
};

export default NotFound;
