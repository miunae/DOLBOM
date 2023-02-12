import AddIcon from '@mui/icons-material/Add';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { green } from '@mui/material/colors';
import Fab from '@mui/material/Fab';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { axiosService } from '../../api/instance';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { openAnotherFolder, selectDashboard } from './dashboardSlice';
interface ClientCardProps {
  clientId: number;
  userName: string;
  userEmail: string;
  userNumber: string;
}
export const ClientCard = ({
  clientId,
  userName,
  userEmail,
  userNumber,
}: ClientCardProps) => {
  const dispatch = useAppDispatch();
  const currentState = useAppSelector(selectDashboard);
  const navigate = useNavigate();
  const accessToken = sessionStorage.getItem('access-token');
  const refreshToken = sessionStorage.getItem('refresh-token');
  const header = {
    'access-token': accessToken ? accessToken : '',
    'refresh-token': refreshToken ? refreshToken : '',
  };
  const [memberClientId, setMemberClientId] = useState(0);
  const goToDetail = () => {
    axiosService
      .get(`/client/${clientId}`, { headers: header })
      .then((res) => setMemberClientId(parseInt(res.toString())));
    dispatch(openAnotherFolder({ name: 'root', memberClientId, path: '//null' }));
    navigate(`/clientdetail/${userName}/null`, {
      state: {
        userParam: userName,
        parantPath: 'null',
        memberClientId,
      },
    });
  };
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {userName}
        </Typography>
        <Avatar sx={{ bgcolor: green[500] }} alt={userName} src="/broken-image.jpg" />
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {userEmail}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {userNumber}
        </Typography>
      </CardContent>
      <CardActions>
        <Fab
          variant="extended"
          size="small"
          color="info"
          aria-label="add"
          onClick={goToDetail}
        >
          <AddIcon sx={{ mr: 1 }} />더 보기
        </Fab>
      </CardActions>
    </Card>
  );
};
