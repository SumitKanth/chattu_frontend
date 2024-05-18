import {
  Button,
  Dialog,
  DialogTitle,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { sampleUsers } from "../../constants/sample";
import { useAsyncMutation, useErrors } from "../../hooks/hook";
import {
  useAddGroupMembersMutation,
  useAvailableFriendsQuery,
} from "../../redux/api/api";
import { setIsAddMember } from "../../redux/reducer/misc";
import UserItem from "../shared/UserItem";
import toast from "react-hot-toast";

const AddMembersDialog = ({ addMember, chatId }) => {
  const dispatch = useDispatch();

  const [addMembers, isLoadingAddMembers] = useAsyncMutation(
    useAddGroupMembersMutation
  );
  const { data, isLoading, isError, error } = useAvailableFriendsQuery(chatId);


  const errors = [{ isError, error }];

  useErrors(errors);

  const [members, setMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);

  const closeHandler = () => {
    dispatch(setIsAddMember(false));
  };

  useEffect(() => {
    if(!isLoading){
        setMembers(data?.friends)
    }
  }, [isLoading, data?.friends])

  const addMemberSubmitHandler = () => {
    if(selectedMembers.length < 1) return toast.error("Please Provide Members")
    
    addMembers("Adding Members...", { members: selectedMembers, chatId });
    closeHandler();
  };

  const selectMemberHandler = (_id) => {
    setSelectedMembers((prev) =>
      prev.includes(_id) ? prev.filter((id) => id !== _id) : [...prev, _id]
    );
  };

  return (
    <Dialog open={addMember} onClose={closeHandler}>
      <Stack>
        <DialogTitle textAlign={"center"}>Add Members</DialogTitle>
      </Stack>

      <Stack padding={"2rem"} spacing={"1rem"} width={"20rem"}>
        {isLoading ? (
          <Skeleton />
        ) : members.length > 0 ? (
          members.map((i) => (
            <UserItem
              key={i._id}
              user={i}
              handler={selectMemberHandler}
              isAdded={selectedMembers.includes(i._id) ? true : false}
            />
          ))
        ) : (
          <Typography textAlign={"center"}>No Friends 😢</Typography>
        )}
      </Stack>

      <Stack
        direction={"row"}
        spacing={"1rem"}
        alignItems={"center"}
        justifyContent={"space-evenly"}
        padding={"1rem"}
      >
        <Button color="error" onClick={closeHandler}>
          Cancel
        </Button>
        <Button
          variant="contained"
          disabled={isLoadingAddMembers}
          onClick={addMemberSubmitHandler}
        >
          Submit Changes
        </Button>
      </Stack>
    </Dialog>
  );
};

export default AddMembersDialog;
