import {
  Button,
  Dialog,
  DialogTitle,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { useInputValidation } from "6pp";

import { useDispatch, useSelector } from "react-redux";
import {
  useAvailableFriendsQuery,
  useCreateGroupMutation,
} from "../../redux/api/api";
import UserItem from "../shared/UserItem";
import { setIsNewGroup } from "../../redux/reducer/misc";
import toast from "react-hot-toast";
import { useAsyncMutation, useErrors } from "../../hooks/hook";

const NewGroup = () => {
  const dispatch = useDispatch();

  const { isNewGroup } = useSelector((state) => state.misc);

  const [createGroup, isLoadingCreateGroup] = useAsyncMutation(
    useCreateGroupMutation
  );

  const { isError, isLoading, error, data } = useAvailableFriendsQuery();

  const [members, setMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);

  const errors = [{ isError, error }];

  useErrors(errors);

  const selectMemberHandler = (_id) => {
    setSelectedMembers((prev) =>
      prev.includes(_id)
        ? prev.filter((currElem) => currElem !== _id)
        : [...prev, _id]
    );
  };


  const submitHandler = async (e) => {
    e.preventDefault();

    if (!groupName.value) return toast.error(`Plz provide group name`);

    if (selectedMembers.length < 2)
      return toast.error(`Group must have atleast 3 people`);

    createGroup("Creating Group......", {
      name: groupName.value,
      members: selectedMembers,
    });

    closeHandler();
  };

  const closeHandler = () => {
    dispatch(setIsNewGroup(false));
  };

  const groupName = useInputValidation("");

  return (
    <>
      <Dialog open={isNewGroup} onClose={closeHandler}>
        <Stack p={{ xs: "1rem", sm: "3rem" }} width={"25rem"} spacing={"2rem"}>
          <DialogTitle textAlign={"center"} variant="h5">
            Create New Group
          </DialogTitle>
          <TextField
            label="Group Name"
            value={groupName.value}
            onChange={groupName.changeHandler}
          />
          {/* Group Name */}
          <Typography variant="body1">Members</Typography>
          <Stack>
            {isLoading ? (
              <Skeleton />
            ) : (
              data?.friends.map((user) => (
                <UserItem
                  user={user}
                  key={user._id}
                  handler={selectMemberHandler}
                  isAdded={selectedMembers.includes(user._id) ? true : false}
                />
              ))
            )}
          </Stack>
          <Stack direction={"row"} justifyContent={"space-evenly"}>
            <Button variant="outlined" color="error" onClick={closeHandler}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={submitHandler}
              disabled={isLoadingCreateGroup}
            >
              Create
            </Button>
          </Stack>
        </Stack>
      </Dialog>
    </>
  );
};

export default NewGroup;
