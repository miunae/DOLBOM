import AddIcon from '@mui/icons-material/Add';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { green } from '@mui/material/colors';
import Fab from '@mui/material/Fab';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
interface ClientCardProps {
  userName: string;
  userEmail: string;
  userNumber: string;
}
export const ClientCard = ({ userName, userEmail, userNumber }: ClientCardProps) => {
  const navigate = useNavigate();
  const goToDetail = () => {
    navigate(`/clientdetail/${userName}/null`, {
      state: {
        userParam: userName,
        parantPath: 'null',
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
