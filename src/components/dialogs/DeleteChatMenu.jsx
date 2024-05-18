import { Menu, Stack, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { setIsDeleteSideChat } from "../../redux/reducer/misc";
import {
  Delete as DeleteIcon,
  ExitToApp as ExitToAppIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAsyncMutation } from "../../hooks/hook";
import { useDeleteGroupMutation, useLeaveGroupMutation } from "../../redux/api/api";

const DeleteChatMenu = ({ dispatch, deleteMenuAnchor }) => {
    const naviagte = useNavigate();

  const { isDeleteSideChat, selectedDeleteChat } = useSelector(
    (state) => state.misc
  );

  const [removeFriend] = useAsyncMutation(useDeleteGroupMutation);
  const [leaveGroup] = useAsyncMutation(useLeaveGroupMutation)


  const isGroup = selectedDeleteChat.groupChat;

  const leaveGroupHandler = () => {
    leaveGroup("Deleting Group....", {chatId: selectedDeleteChat.chatId});
    closeHandle();
  };


  const removeFriendHandler = () => {
    closeHandle();
    removeFriend("Removing Friend...", {chatId: selectedDeleteChat.chatId})
  };

  const closeHandle = () => {
    dispatch(setIsDeleteSideChat(false));
    deleteMenuAnchor.current = null;
  };

  return (
    <Menu
      open={isDeleteSideChat}
      onClose={closeHandle}
      anchorEl={deleteMenuAnchor.current}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "center",
        horizontal: "center",
      }}
    >
      <Stack
        sx={{
          width: "10rem",
          padding: "0.5rem",
          cursor: "pointer",
        }}
        direction={"row"}
        alignItems={"center"}
        spacing={"0.5rem"}
        onClick={isGroup ? leaveGroupHandler : removeFriendHandler}
      >
        {isGroup ? (
          <>
            <ExitToAppIcon /> <Typography>Leave Group</Typography>
          </>
        ) : (
          <>
            <DeleteIcon />
            <Typography>Remove Friend</Typography>
          </>
        )}
      </Stack>
    </Menu>
  );
};

export default DeleteChatMenu;
