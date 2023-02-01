import Grid from '@mui/material/Grid';
import * as React from 'react';

import { SideBar } from '../features/sideBar/SideBar';
export const VideoPage = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <SideBar />
        </Grid>
        <Grid item xs={10}>
          <h1>Viedo Conferencing</h1>
        </Grid>
      </Grid>
    </>
  );
};
