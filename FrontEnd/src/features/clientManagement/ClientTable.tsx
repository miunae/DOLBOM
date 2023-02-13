import {
  Box,
  Link,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { axiosService } from '../../api/instance';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { openAnotherFolder, selectDashboard, setMemberClientId } from './dashboardSlice';

// function createData(clientName: string, email: string, phone: string, detail: string) {
//   return { clientName, email, phone, detail };
// }
interface ClientCardProps {
  id: number | string;
  clientId: number;
  name: string;
  phone: string;
  email: string;
}
const headCells = [
  {
    id: 'clientName',
    align: 'left',
    disablePadding: false,
    label: 'Client Name',
  },
  {
    id: 'email',
    align: 'left',
    disablePadding: true,
    label: 'E-mail',
  },
  {
    id: 'phone',
    align: 'right',
    disablePadding: false,
    label: 'PhoneNumber',
  },
  {
    id: 'detail',
    align: 'right',
    disablePadding: false,
    label: 'More Info',
  },
];
function OrderTableHead() {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
export const ClientTable = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const goDetail = (clientName: string, clientId: number | string) => {
    axiosService
      .get(`/client/${clientId}`)
      .then((res) => dispatch(setMemberClientId({ memberClientId: res.data })));
    dispatch(openAnotherFolder({ name: 'root', path: '//null' }));
    navigate(`/clientdetail/${clientName}/null`);
  };
  const [data, setData] = useState([]);
  useEffect(() => {
    axiosService.get('/client/').then((res) => {
      console.log(res);
      setData(res.data);
      console.log(data);
      // data.map((item: any) => createData(item.name, item.email, item.phone, '더보기'));
    });
  }, []);
  return (
    <Box>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' },
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          sx={{
            pl: 2,
            pe: 2,
          }}
        >
          <OrderTableHead />
          <TableBody>
            {data.map((row: ClientCardProps, index) => {
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  role="checkbox"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  tabIndex={-1}
                  key={row.email}
                  selected={true}
                >
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="left">{row.email}</TableCell>
                  <TableCell align="right">{row.phone}</TableCell>
                  <TableCell align="right">
                    <Button
                      onClick={() => {
                        goDetail(row.name, row.id);
                      }}
                      variant="contained"
                    >
                      더보기
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
