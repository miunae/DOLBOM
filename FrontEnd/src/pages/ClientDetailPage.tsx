import { green } from '@mui/material/colors';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import axios from 'axios';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { Dashboard } from '../features/clientManagement/Dashboard';
import { SideBar } from '../features/sideBar/SideBar';
// 내담자 정보
interface ClientCardProps {
  userName: string;
  userEmail: string;
  userNumber: string;
  id: number | string;
}
export const ClientDetailPage = () => {
  const { userName } = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3003/defaultFolder/').then((res) => {
      setData(res.data);
    });
  }, []);
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
            <Dashboard />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
