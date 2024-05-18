import React, { useEffect, useState } from "react";
import {
  Box,
  Drawer,
  Grid,
  IconButton,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import {
  Close as CloseIcon,
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  ManageAccounts as ManageAccountsIcon,
  Message as MessageIcon,
  Group as GroupIcon,
  ExitToApp as ExitToAppIcon,
} from "@mui/icons-material";
import { grayColor, matBlack, white } from "../../constants/color";
import { useLocation, Link as LinkComponent, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminLogout, getAdmin } from "../../redux/thunks/admin";

const Link = styled(LinkComponent)`
  text-decoration: none;
  border-radius: 2rem;
  padding: 1rem 2rem;
  color: black;
  &:hover {
    color: rgba(0, 0, 0, 0.54);
  }
`;

const adminTags = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <DashboardIcon />,
  },
  {
    name: "Users",
    path: "/admin/users",
    icon: <ManageAccountsIcon />,
  },
  {
    name: "Chats",
    path: "/admin/chats",
    icon: <GroupIcon />,
  },
  {
    name: "Messages",
    path: "/admin/messages",
    icon: <MessageIcon />,
  },
];


const Sidebar = ({ w = "100%" }) => {
    const location = useLocation();
    const dispatch = useDispatch()
    const logoutHandler = () => {
        dispatch(adminLogout())
    };
    
  return (
    <Stack width={w} direction={"column"} p={"3rem"} spacing={"3rem"}>
      <Typography variant="h5" textTransform={"uppercase"}>
        Chattu
      </Typography>

      <Stack spacing={"1rem"}>
        {adminTags.map((tab) => (
            <Link
            key={tab.path}
            to={tab.path}
            sx={
                location.pathname === tab.path && {
                bgcolor: matBlack,
                color: white,
                ":hover": {
                  color: white,
                },
            }
        }
        >
            <Stack spacing={"1rem"} direction={"row"} alignItems={"center"}>
              {tab.icon}

              <Typography>{tab.name}</Typography>
            </Stack>
          </Link>
        ))}

        <Link onClick={logoutHandler}>
          <Stack spacing={"1rem"} direction={"row"} alignItems={"center"}>
            <ExitToAppIcon />

            <Typography>Logout</Typography>
          </Stack>
        </Link>
      </Stack>
    </Stack>
  );
};



const AdminLayout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const {isAdmin} = useSelector(state => state.auth)

  if(!isAdmin)
    return <Navigate to={"/admin"} />

  if (!isAdmin) return <Navigate to={"/admin"} />;
  const handleMobile = () => setIsMobile(!isMobile);

  const handleClose = () => setIsMobile(false);

  return (
    <Grid container minHeight={"100vh"}>
      <Box
        sx={{ display: { xs: "block", md: "none" } }}
        position={"fixed"}
        top={"1rem"}
        right={"1rem"}
      >
        <IconButton onClick={handleMobile}>
          {isMobile ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </Box>

      <Grid item md={4} lg={3} sx={{ display: { xs: "none", md: "block" } }}>
        <Sidebar />
      </Grid>

      <Grid item xs={12} md={8} lg={9} bgcolor={grayColor}>
        {children}
      </Grid>

      <Drawer open={isMobile} onClose={handleClose}>
        <Sidebar w={"50vw"} />
      </Drawer>
    </Grid>
  );
};

export default AdminLayout;
