import { Divider } from '@mui/material';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import * as React from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { useAppSelector } from '../app/hooks';
import { Dashboard } from '../features/clientManagement/Dashboard';
import { selectDashboard } from '../features/clientManagement/dashboardSlice';
import { SideBar } from '../features/sideBar/SideBar';
// 내담자 정보
export const ClientDetailPage = () => {
  const currentState = useAppSelector(selectDashboard);
  const currentPath = currentState.path;
  const currentName = currentState.name;
  console.log(currentName);
  console.log(currentPath);
  const { userName } = useParams();
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <SideBar />
        </Grid>
        <Grid item xs={10}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              flexDirection: 'column',
              p: 1,
              m: 1,
              bgcolor: 'background.paper',
              borderRadius: 1,
            }}
          >
            <Box sx={{ display: 'flex' }}>
              <Typography variant="h2" component="div">
                {userName}
              </Typography>
            </Box>
            <Divider variant="middle" />
            <Dashboard />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
