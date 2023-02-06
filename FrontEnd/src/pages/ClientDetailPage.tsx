import Grid from '@mui/material/Grid';
import axios from 'axios';
import * as React from 'react';
import { useEffect, useState } from 'react';

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
          <Dashboard />
        </Grid>
      </Grid>
    </>
  );
};
