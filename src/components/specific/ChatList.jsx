import { Stack } from "@mui/material";
import React from "react";
import ChatItems from "../shared/ChatItems";

const ChatList = ({
  w = "100%",
  chats = [],
  chatId,
  onlineUsers = [],
  newMessagesAlert = [
    {
      chatId: "",
      count: 0,
    },
  ],
  handleDeleteChat,
}) => {
  return (
    <>
      <Stack
        width={w}
        direction={"column"}
        overflow={"auto"}
        height={"calc(100vh - 4rem)"}
      >
        {chats?.map((data, ind) => {
          const { avatar, _id, name, groupChat, members } = data;

          const newMessageAlert = newMessagesAlert.find(
            (item) => data._id.toString() === item.chatId
          );

          const isOnline = members?.some((member) =>
            onlineUsers.includes(member)
          );

          return (
            <ChatItems
              name={data.name}
              avatar={data.avatar}
              _id={data._id}
              key={ind}
              newMessageAlert={newMessageAlert}
              handleDeleteChat={handleDeleteChat}
              groupChat={data.groupChat}
              isOnline={isOnline}
            />
          );
        })}
      </Stack>
    </>
  );
};

export default ChatList;
