import {
    Add as AddIcon,
    Delete as DeleteIcon,
    Done as DoneIcon,
    Edit as EditIcon,
    KeyboardBackspace as KeyboardBackspaceIcon,
    Menu as MenuIcon,
} from "@mui/icons-material";
import {
    Backdrop,
    Box,
    Button,
    CircularProgress,
    Drawer,
    Grid,
    IconButton,
    Stack,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";
import React, { Suspense, lazy, memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import ConfirmDeleteDailog from "../components/dialogs/ConfirmDeleteDailog";
import { LayoutLoader } from "../components/layout/Loaders";
import AvatarCard from "../components/shared/AvatarCard";
import UserItem from "../components/shared/UserItem";
import { Link } from "../components/styles/StyledComponents";
import { bgGradient, matBlack, white } from "../constants/color";
import { useAsyncMutation, useErrors } from "../hooks/hook";
import { useChatDetailsQuery, useDeleteGroupMutation, useMyGroupsQuery, useRemoveGroupMemberMutation, useRenameGroupMutation } from "../redux/api/api";
import { setIsAddMember, setIsDeleteMenu } from "../redux/reducer/misc";

const AddMembersDialog = lazy(() =>
  import("../components/dialogs/AddMembersDialog")
);

const Groups = () => {
  const chatId = useSearchParams()[0].get("group");

  const dispatch = useDispatch();
  const {isAddMember, isDeleteMenu} = useSelector(state => state.misc)

  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState("");
  const [members, setMembers] = useState([]);

  const myGroups = useMyGroupsQuery("");
  const groupDetails = useChatDetailsQuery(
    { chatId, populate: true },
    { skip: !chatId } // * skip mtlb jb chatId hogi tb hi chlega
  );

  const [renameGroup, isLoadingRenameGroup ] = useAsyncMutation(useRenameGroupMutation);
  const [removeGroupMember, isLoadingRemoveGroupMember] = useAsyncMutation(useRemoveGroupMemberMutation);
  const [deleteGroup, isLoadingDeleteGroup] = useAsyncMutation(useDeleteGroupMutation)

  const navigateBack = () => {
    navigate("/");
  };

  const errors = [
    { isError: myGroups.isError, error: myGroups.error },
    {
      isError: groupDetails.isError,
      error: groupDetails.error,
      fallback: navigateBack,
    },
  ];

  useErrors(errors);

  useEffect(() => {
    if(groupDetails.data){
        setGroupName(groupDetails.data?.chat.name);
        setGroupNameUpdatedValue(groupDetails.data?.chat.name);
        setMembers(groupDetails.data.chat.members)
    }

    return () => {
        setGroupName("");
        setGroupNameUpdatedValue("");
        setIsEdit(false);
      };
  
    
  }, [groupDetails.data])
  



  const handleMobile = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleMobileClose = () => {
    setIsMobileMenuOpen(false);
  };

  const updateGroupName = () => {
    setIsEdit(false);
    renameGroup("Updating Group Name...", {chatId, name: groupNameUpdatedValue})
  };

  const deleteGroupHandler = () => {

    deleteGroup("Deleting Group...", {chatId})

    dispatch(setIsDeleteMenu(false))
  };

  const openConfirmDeleteHandler = () => {
    dispatch(setIsDeleteMenu(true))
  };

  const closeConfrimDeleteHandler = () => {
    dispatch(setIsDeleteMenu(false))
  };

  const openAddMemberHandler = () => {
    dispatch(setIsAddMember(true))
  };

  const removeMemberHandler = (id) => {
    removeGroupMember("Removing Member....", {userId: id, chatId})
  };


  const IconBtns = (
    <>
      <Tooltip
        title="back"
        sx={{
          border: "2px solid red",
        }}
      >
        <IconButton
          sx={{
            position: "absolute",
            top: "2rem",
            left: "2rem",
            bgcolor: matBlack,
            color: white,
            ":hover": {
              bgcolor: "rgba(0,0,0,07)",
            },
          }}
          onClick={navigateBack}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
      </Tooltip>

      <Box
        sx={{
          display: { xs: "block", sm: "none" },
          position: "absolute",
          top: "2rem",
          right: "2rem",
        }}
      >
        <IconButton onClick={handleMobile}>
          <MenuIcon />
        </IconButton>
      </Box>
    </>
  );

  const GroupName = (
    <Stack
      sx={{
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
      direction={"row"}
      spacing={"1rem"}
    >
      {isEdit ? (
        <>
          <TextField
            value={groupNameUpdatedValue}
            onChange={(e) => setGroupNameUpdatedValue(e.target.value)}
          />
          <IconButton onClick={updateGroupName} disabled={isLoadingRenameGroup}>
            <DoneIcon />
          </IconButton>
        </>
      ) : (
        <>
          <Typography variant="h4">{groupName}</Typography>
          <IconButton onClick={() => setIsEdit(true)}>
            <EditIcon />
          </IconButton>
        </>
      )}
    </Stack>
  );

  const ButtonGroup = (
    <Stack
      direction={{
        xs: "column-reverse",
        sm: "row",
      }}
      spacing={"1rem"}
      p={{
        xs: "1rem 0",
        sm: "1rem",
        md: "2rem",
      }}
    >
      <Button
        variant="text"
        size="large"
        startIcon={<DeleteIcon />}
        color="error"
        onClick={openConfirmDeleteHandler}
      >
        Delete Group
      </Button>
      <Button
        variant="contained"
        size="large"
        startIcon={<AddIcon />}
        onClick={openAddMemberHandler}
      >
        Add Members
      </Button>
    </Stack>
  );
  return myGroups.isLoading ? (
    <LayoutLoader />
  ) : (
    <Grid container height={"100vh"}>
      <Grid
        item
        sx={{
          display: {
            xs: "none",
            sm: "block",
          },
        }}
        sm={4}
      >
        <GroupList myGroups={myGroups?.data?.groups} chatId={chatId} />
      </Grid>

      <Grid
        item
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          position: "relative",
          padding: "1rem 3rem",
          border: "2px solid red",
        }}
        sm={8}
        xs={12}
      >
        {IconBtns}

        {groupName && (
          <>
            {GroupName}

            <Typography
              margin={"2rem"}
              alignSelf={"flex-start"}
              variant="body1"
            >
              Members
            </Typography>

            <Stack
              maxWidth={"45rem"}
              width={"100%"}
              boxSizing={"border-box"}
              padding={{
                sx: "1rem",
                xs: "0",
                md: "1rem 4rem",
              }}
              spacing={"2rem"}
              height={"50vh"}
              overflow={"auto"}
            >
              {/* Members */}

              {
              isLoadingRemoveGroupMember ? (<CircularProgress />) :
              (members.length > 0 &&
                members.map((user) => (
                  <UserItem
                    key={user._id}
                    user={user}
                    isAdded
                    styling={{
                      boxShadow: "0 0 0.5rem rgba(0,0,0,0.2)",
                      padding: "1rem 2rem",
                      borderRadius: "1rem",
                    }}
                    handler={removeMemberHandler}
                    handlerIsLoading={isLoadingRemoveGroupMember}
                  />
                )))}
            </Stack>

            {ButtonGroup}
          </>
        )}
      </Grid>

      {isAddMember && (
        <Suspense fallback={<Backdrop open />}>
          <AddMembersDialog addMember={isAddMember} chatId={chatId} />
        </Suspense>
      )}

      {isDeleteMenu && (
        <Suspense fallback={<Backdrop open />}>
          <ConfirmDeleteDailog
            open={isDeleteMenu}
            handleClose={closeConfrimDeleteHandler}
            deleteHanlder={deleteGroupHandler}
            isLoadingDeleteGroup={isLoadingDeleteGroup}
          />
        </Suspense>
      )}

      <Drawer
        sx={{
          display: { xs: "block", sm: "none" },
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileClose}
      >
        <GroupList
          w={"60vw"}
          myGroups={myGroups?.data?.groups}
          chatId={chatId}
        />
      </Drawer>
    </Grid>
  );
};

const GroupList = ({ w = "100%", myGroups = [], chatId }) => {
  return (
    <Stack
      width={w}
      direction={"column"}
      sx={{
        backgroundImage: bgGradient,
        height: "100vh",
        overflow: "auto",
      }}
    >
      {myGroups.length > 0 ? (
        myGroups.map((group) => (
          <GroupListItem group={group} chatId={chatId} key={group._id} />
        ))
      ) : (
        <Typography padding="1rem" textAlign={"center"}>
          No Groups
        </Typography>
      )}
    </Stack>
  );
};

const GroupListItem = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group;

  return (
    <Link
      to={`?group=${_id}`}
      onClick={(e) => {
        if (chatId === _id) e.preventDefault();
      }}
    >
      <Stack direction={"row"} spacing={"2rem"} alignItems={"center"}>
        <AvatarCard avatar={avatar} />

        <Typography>{name}</Typography>
      </Stack>
    </Link>
  );
});

export default Groups;
