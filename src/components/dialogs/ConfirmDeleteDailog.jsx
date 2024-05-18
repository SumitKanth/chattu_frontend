import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack } from '@mui/material'
import React from 'react'

const ConfirmDeleteDailog = ({open, handleClose, deleteHanlder, isLoadingDeleteGroup}) => {
  return <Dialog open={open} onClose={handleClose}>
    <DialogTitle>Comfirm Delete</DialogTitle>

    <DialogContent>
        <DialogContentText>Are you suru you want to delete this Group</DialogContentText>
    </DialogContent>


    <DialogActions
    >
        <Button color="error" onClick={deleteHanlder} disabled={isLoadingDeleteGroup}>Yes</Button>
        <Button onClick={handleClose}>No</Button>
    </DialogActions>
  </Dialog>
}

export default ConfirmDeleteDailog