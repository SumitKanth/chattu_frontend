import React from 'react'
import { Avatar, Stack, Typography } from '@mui/material'
import {
    Face as FaceIcon,
    AlternateEmail as UserNameIcon,
    CalendarMonth as CalenderIcon    
} from '@mui/icons-material'
import moment from 'moment';
import { useSelector } from 'react-redux';
import { transformImage } from "../../lib/features.js";

const Profile = () => {
    const {user} = useSelector(state => state.auth)

  return (
    <>
        <Stack direction={"column"} alignItems={"center"}
        >
            <Avatar
                sx={{
                   width: 200,
                   height: 200,
                   objectFit: "contain",
                   marginBottom: "1rem",
                   border: "2px solid white", 
                }}
                src={transformImage(user?.avatar?.url, 1000)}
            />
            
        <ProfileCard heading={"Bio"} text={user.bio}/>
        <ProfileCard heading={"Username"} text={user.username} Icon={<UserNameIcon />}/>
        <ProfileCard heading={"Name"} text={user.name} Icon={<FaceIcon />}/>
        <ProfileCard heading={"Joined"} text={moment(user.createdAt).fromNow()} Icon={<CalenderIcon />}/>
        </Stack>
    </>
  )
}

const ProfileCard = ({text, Icon, heading}) => <>
    <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        color={"white"}
        textAlign={"center"}
        marginBottom={"1rem"}
    >
    {Icon && Icon}

    <Stack>
        <Typography variant='body1'>{text}</Typography>
        <Typography variant='caption' color={"grey"}>{heading}</Typography>

    </Stack>
    </Stack>
</>

export default Profile