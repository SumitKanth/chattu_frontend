import { useFileHandler, useInputValidation } from "6pp";
import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
import {
    Avatar,
    Button,
    Container,
    IconButton,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { VisuallyHiddenInput } from "../components/styles/StyledComponents";
import { bgGradient } from "../constants/color";
import { server } from "../constants/config";
import { userExists } from "../redux/reducer/auth";
import { usernameValidator } from "../utils/validator";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const name = useInputValidation("");
  const bio = useInputValidation("");
  const username = useInputValidation("", usernameValidator);
  const password = useInputValidation("");
  const avatar = useFileHandler("single");

  const handleLogin = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Logging In....");

    setIsLoading(true);
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/login`,
        {
          username: username.value,
          password: password.value,
        },
        config
      );
      dispatch(userExists(data.user));
      toast.success(data.message, {id: toastId});
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Worng", {id: toastId});
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const toastId = toast.loading("Signin Up....");

    const formData = new FormData();

    formData.append("avatar", avatar.file);
    formData.append("name", name.value);
    formData.append("bio", bio.value);
    formData.append("username", username.value);
    formData.append("password", password.value);

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/new`,
        formData,
        config
      );

      dispatch(userExists(data.user));

      toast.success(data.message, {id: toastId});
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Worng", {id: toastId});
    } finally {
      setIsLoading(false);
    }
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
          {isLogin ? (
            <>
              <Typography variant="h5">Login</Typography>

              <form
                style={{
                  marginTop: "1rem",
                  width: "100%",
                }}
                onSubmit={handleLogin}
              >
                <TextField
                  required
                  fullWidth
                  label="Username"
                  variant="outlined"
                  margin="normal"
                  value={username.value}
                  onChange={username.changeHandler}
                />
                <TextField
                  required
                  fullWidth
                  label="password"
                  variant="outlined"
                  margin="normal"
                  type="password"
                  value={password.value}
                  onChange={password.changeHandler}
                />

                <Button
                  sx={{
                    marginTop: "1rem",
                  }}
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  disabled={isLoading}
                >
                  Login
                </Button>

                <Typography
                  variant="h6"
                  sx={{
                    marginTop: "1rem",
                    textAlign: "center",
                  }}
                >
                  OR
                </Typography>
                <Button
                  sx={{
                    marginTop: ".5rem",
                  }}
                  variant="text"
                  fullWidth
                  onClick={() => setIsLogin(false)}
                  disabled={isLoading}
                >
                  Sign Up
                </Button>
              </form>
            </>
          ) : (
            <>
              <Typography variant="h5">Sign Up</Typography>

              <form
                style={{
                  marginTop: "1rem",
                  width: "100%",
                }}
                onSubmit={handleSignUp}
              >
                <Stack
                  sx={{
                    width: "10rem",
                    margin: "auto",
                    position: "relative",
                  }}
                >
                  <Avatar
                    sx={{
                      height: "10rem",
                      width: "10rem",
                      objectFit: "contain",
                    }}
                    src={avatar.preview}
                  />

                  <IconButton
                    sx={{
                      position: "absolute",
                      bottom: "0",
                      right: "0",
                      bgcolor: "rgba(0, 0, 0, 0.5)",
                      color: "white",
                      ":hover": {
                        bgcolor: "rgba(0, 0, 0, 0.7)",
                      },
                    }}
                    component="label"
                  >
                    <>
                      <CameraAltIcon />
                      <VisuallyHiddenInput
                        type="file"
                        onChange={avatar.changeHandler}
                      />
                    </>
                  </IconButton>
                </Stack>

                {avatar.error && (
                  <Typography
                    variant="caption"
                    color={"error"}
                    display={"block"}
                    m={"1rem auto"}
                    width={"fit-content"}
                  >
                    {avatar.error}
                  </Typography>
                )}

                <TextField
                  required
                  fullWidth
                  label="Name"
                  variant="outlined"
                  margin="normal"
                  value={name.value}
                  onChange={name.changeHandler}
                />

                <TextField
                  required
                  fullWidth
                  label="Bio"
                  variant="outlined"
                  margin="normal"
                  value={bio.value}
                  onChange={bio.changeHandler}
                />

                <TextField
                  required
                  fullWidth
                  label="Username"
                  variant="outlined"
                  margin="normal"
                  value={username.value}
                  onChange={username.changeHandler}
                />
                {username.error && (
                  <Typography variant="caption" color={"error"}>
                    {username.error}
                  </Typography>
                )}

                <TextField
                  required
                  fullWidth
                  label="password"
                  variant="outlined"
                  margin="normal"
                  type="password"
                  value={password.value}
                  onChange={password.changeHandler}
                />

                {password.error && (
                  <Typography variant="caption" color={"error"}>
                    {password.error}
                  </Typography>
                )}

                <Button
                  sx={{
                    marginTop: "1rem",
                  }}
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  disabled={isLoading}
                >
                  Sign Up
                </Button>

                <Typography
                  variant="h6"
                  sx={{
                    marginTop: "1rem",
                    textAlign: "center",
                  }}
                >
                  OR
                </Typography>
                <Button
                  sx={{
                    marginTop: ".5rem",
                  }}
                  variant="text"
                  fullWidth
                  onClick={() => setIsLogin(true)}
                  disabled={isLoading}
                >
                  Login
                </Button>
              </form>
            </>
          )}
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
