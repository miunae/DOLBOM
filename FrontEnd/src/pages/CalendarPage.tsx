import { Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import * as React from 'react';

import { Calendar } from '../features/calendar/Calendar';
import { SideBar } from '../features/sideBar/SideBar';
<<<<<<< HEAD
export const CalendPage = () => {
=======
import { SideBar2 } from '../features/sideBar/SideBar2';
export const CalendarPage = () => {
>>>>>>> 4ac22943d1c3eb0b67902f3da6c803c1a2789848
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <SideBar2 />
        </Grid>
        <Grid item xs={10}>
<<<<<<< HEAD
          <h1>CalendPage</h1>
          {/* <Calendar /> */}
=======
          <Container fixed maxWidth="xl">
            <h1>CalendPage</h1>
            <Calendar />
          </Container>
>>>>>>> 4ac22943d1c3eb0b67902f3da6c803c1a2789848
        </Grid>
      </Grid>
    </>
  );
};
