import Grid from '@mui/material/Grid';
import axios from 'axios';
import * as React from 'react';
import { useEffect, useState } from 'react';

import { SideBar } from '../features/sideBar/SideBar';
interface ClientCardProps {
  userName: string;
  userEmail: string;
  userNumber: string;
  id: number | string;
}
export const ClientDetailPage = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3003/folders/').then((res) => {
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
          <h1>ClientManagement</h1>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {data.map((prop: ClientCardProps, index) => (
              <Grid item xs={6} key={index}>
                <h2>ClientDetailPage</h2>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
