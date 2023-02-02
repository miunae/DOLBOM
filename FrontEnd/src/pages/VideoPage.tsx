import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import * as React from 'react';

import VideoRoomComponent from '.././components/VideoRoomComponent';
import { SideBar } from '../features/sideBar/SideBar';

export const VideoPage = () => {
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
