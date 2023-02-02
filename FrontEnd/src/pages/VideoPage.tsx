import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import * as React from 'react';

import VideoRoomComponent from '.././components/VideoRoomComponent';
import { SideBar } from '../features/sideBar/SideBar';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const VideoPage = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          {/* <SideBar /> */}
        </Grid>
        <Grid item xs={10}>
          <h1>Video Conferencing</h1>
          <VideoRoomComponent />
        </Grid>
      </Grid>
    </>
  );
};
