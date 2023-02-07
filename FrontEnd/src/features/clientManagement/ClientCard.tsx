import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { green } from '@mui/material/colors';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
interface ClientCardProps {
  userName: string;
  userEmail: string;
  userNumber: string;
}
export const ClientCard = ({ userName, userEmail, userNumber }: ClientCardProps) => {
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
        <Link href={`/clientdetail/${userName}/null`} underline="hover">
          Learn More
        </Link>
      </CardActions>
    </Card>
  );
};
