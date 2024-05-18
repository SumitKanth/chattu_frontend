import { useFetchData } from "6pp";
import {
    AdminPanelSettings as AdminPanelSettingsIcon,
    Group as GroupIcon,
    Message as MessageIcon,
    Notifications as NotificationsIcon,
    Person as PersonIcon,
} from "@mui/icons-material";
import {
    Box,
    Container,
    Paper,
    Skeleton,
    Stack,
    Typography,
} from "@mui/material";
import moment from "moment";
import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { DoughnutChart, LineChart } from "../../components/specific/Charts";
import {
    CurveButtom,
    SearchField,
} from "../../components/styles/StyledComponents";
import { server } from "../../constants/config";
import { useErrors } from "../../hooks/hook";

const DashBoard = () => {
  const { loading, data, error } = useFetchData(
    `${server}/api/v1/admin/stats`,
    "dashboard-stats"
  );
  const { stats } = data || {};

  useErrors([
    {
      isError: error,
      error: error,
    },
  ]);

  const Appbar = (
    <Paper
      elevation={3}
      sx={{
        padding: "2rem",
        margin: "2rem 0",
        borderRadius: "1rem",
      }}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <AdminPanelSettingsIcon sx={{ fontSize: "2.5rem" }} />

        <SearchField placeholder="Search..." />
        <CurveButtom>Search</CurveButtom>
        <Box flexGrow={1} />
        <Typography
          sx={{
            display: { xs: "none", lg: "block" },
            color: "rgba(0, 0, 0, 0.7)",
            alignItems: "center",
          }}
        >
          {moment().format("dddd, D MMMM YYYY")}
        </Typography>

        <NotificationsIcon />
      </Stack>
    </Paper>
  );

  const widgets = (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      justifyContent={"space-between"}
      alignItems={"center"}
      margin={"2rem 0"}
      spacing={"2rem"}
    >
      {!loading && (
        <>
          <Widget
            title={"Users"}
            value={stats?.usersCount || 0}
            icon={<PersonIcon />}
          />
          <Widget
            title={"Chats"}
            value={stats?.totalChatsCount || 0}
            icon={<GroupIcon />}
          />
          <Widget
            title={"Messages"}
            value={stats?.messageCount || 0}
            icon={<MessageIcon />}
          />
        </>
      )}
    </Stack>
  );
  return (
    <AdminLayout>
      {loading ? (
        <Skeleton />
      ) : (
        <Container component={"main"}>
          {Appbar}

          <Stack
            direction={{
              xs: "column",
              lg: "row",
            }}
            flexWrap={"wrap"}
            spacing={"2rem"}
            justifyContent={"center"}
            alignItems={{
              xs: "center",
              lg: "stretch",
            }}
            sx={{
              gap: "2rem",
            }}
          >
            <Paper
              elevation={3}
              sx={{
                padding: "2rem 3.5rem",
                borderRadius: "1rem",
                width: "100%",
                maxWidth: "45rem",
              }}
            >
              <Typography margin={"2rem 0"} variant="h4">
                Last Messages
              </Typography>
              <LineChart value={stats?.messagesChart || []} />
            </Paper>

            <Paper
              elevation={3}
              sx={{
                padding: "1rem",
                borderRadius: "1rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: { xs: "100%", sm: "50%" },
                position: "relative",
                width: "100%",
                maxWidth: "25rem",
              }}
            >
              <DoughnutChart
                value={[
                  stats?.totalChatsCount - stats?.groupCount || 0,
                  stats?.groupCount || 0,
                ]}
                labels={["Single Chats", "Group Chats"]}
              />
              <Stack
                position={"absolute"}
                direction={"row"}
                justifyContent={"center"}
                alignItems={"center"}
                spacing={"0.5rem"}
                width={"100%"}
                height={"100%"}
              >
                <GroupIcon /> <Typography>Vs </Typography>
                <PersonIcon />
              </Stack>
            </Paper>
          </Stack>

          {widgets}
        </Container>
      )}
    </AdminLayout>
  );
};

const Widget = ({ title, value, icon }) => (
  <Paper
    elevation={3}
    sx={{
      padding: "2rem",
      margin: "2rem 0",
      borderRadius: "1.5rem",
      width: "20rem",
    }}
  >
    <Stack alignItems={"center"} spacing={"1rem"}>
      <Typography
        sx={{
          color: "rgba(0,0,0,0.7)",
          borderRadius: "50%",
          border: `5px solid rgba(0,0,0,0.9)`,
          width: "5rem",
          height: "5rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {value}
      </Typography>

      <Stack direction={"row"} spacing="1rem" alignItems={"center"}>
        {icon}

        <Typography>{title}</Typography>
      </Stack>
    </Stack>
  </Paper>
);

export default DashBoard;
