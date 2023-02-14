import { Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/system';
import axios from 'axios';
import * as React from 'react';
import { useEffect, useState } from 'react';

import { axiosService } from '../api/instance';
import { ClientTable } from '../features/clientManagement/ClientTable';
import { SideBar } from '../features/sideBar/SideBar';
import { SideBar2 } from '../features/sideBar/SideBar2';
interface ClientCardProps {
  id: number | string;
  clientId: number;
  name: string;
  phone: string;
  email: string;
}
export const ClientManagementPage = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axiosService.get('/client/').then((res) => {
      console.log(res);
      setData(res.data);
    });
  }, []);
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <SideBar2 />
        <h1>ClientManagement</h1>
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <ClientTable />
          {/* <Container maxWidth="xl">
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
          </Container> */}
        </Box>
      </Box>
    </>
  );
};
