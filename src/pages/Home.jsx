import React from 'react'
import AppLayout from '../components/layout/AppLayout'
import { Container, Stack, Typography } from '@mui/material'
import { grayColor } from '../constants/color'

const Home = () => {

  return (
    <>
        <Container
        sx={{
            borderLeft: "2px solid #808080",
            borderRight: "2px solid #808080",
            height: "calc(100vh - 4rem)",
            flex: "display",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: grayColor
        }}
        >

        <Typography
        padding={"2rem"}
        textAlign={"center"}
        variant='h5'
        >Select a friend to Chat 😍</Typography>
            
        </Container>
    </>
  )
}

export default AppLayout()(Home)