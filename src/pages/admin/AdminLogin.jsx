import { useInputValidation } from "6pp";
import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { bgGradient } from "../../constants/color";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin, getAdmin } from "../../redux/thunks/admin";

const AdminLogin = () => {
  const dispatch = useDispatch();
  const { isAdmin } = useSelector((state) => state.auth);
  const secretkey = useInputValidation("");

  useEffect(() => {
    dispatch(getAdmin());
  }, [dispatch]);

  if (isAdmin) return <Navigate to={"/admin/dashboard"} />;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(adminLogin(secretkey.value));
  };
  return (
    <div
      style={{
        backgroundImage: bgGradient,
      }}
    >
      <Container
        component={"main"}
        maxWidth={"xs"}
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">Admin Login</Typography>

          <form
            style={{
              marginTop: "1rem",
              width: "100%",
            }}
            onSubmit={submitHandler}
          >
            <TextField
              required
              fullWidth
              label="Secret Key"
              variant="outlined"
              margin="normal"
              type="password"
              value={secretkey.value}
              onChange={secretkey.changeHandler}
            />

            <Button
              sx={{
                marginTop: "1rem",
              }}
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
            >
              Login
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default AdminLogin;
