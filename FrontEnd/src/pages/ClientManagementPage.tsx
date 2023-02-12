import { Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import * as React from 'react';
import { useEffect, useState } from 'react';

import { axiosService } from '../api/instance';
import { ClientCard } from '../features/clientManagement/ClientCard';
import { SideBar } from '../features/sideBar/SideBar';
interface ClientCardProps {
  id: number | string;
  clientId: number;
  name: string;
  phone: string;
  email: string;
}
type CustomHeaders = {
  'access-token': string;
  'refresh-token': string;
};
export const ClientManagementPage = () => {
  const [data, setData] = useState([]);
  const accessToken = sessionStorage.getItem('access-token');
  const refreshToken = sessionStorage.getItem('refresh-token');
  const header: CustomHeaders = {
    'access-token': accessToken ? accessToken : '',
    'refresh-token': refreshToken ? refreshToken : '',
  };
  useEffect(() => {
    axiosService.get('/client/').then((res) => {
      console.log(res);
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
          <Container maxWidth="xl">
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              {data.map((prop: ClientCardProps, index) => (
                <Grid item xs={6} key={index}>
                  <ClientCard
                    key={prop.id}
                    clientId={prop.clientId}
                    userName={prop.name}
                    userEmail={prop.email}
                    userNumber={prop.phone}
                  />
                </Grid>
              ))}
            </Grid>
          </Container>
        </Grid>
      </Grid>
    </>
  );
};
