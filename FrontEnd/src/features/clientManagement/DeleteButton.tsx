import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';

import { axiosService } from '../../api/instance';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { popPath, selectDashboard } from './dashboardSlice';
export const DeleteButton = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const currentState = useAppSelector(selectDashboard);
  const currentPath = currentState.path;
  const mci = currentState.memberClientId;
  const Delete = () => {
    if (currentPath !== null) {
      dispatch(popPath());
    }
    console.log(currentPath);
    axiosService
      .delete('/folder', { params: { id: mci, path: currentPath } })
      .then((res) => console.log(res));
    handleClose();
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <IconButton onClick={handleClickOpen} color="error" sx={{ mx: 1 }}>
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">현재 폴더를 삭제하시겠습니까?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={Delete}>폴더 삭제</Button>
          <Button onClick={handleClose}>취소</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
