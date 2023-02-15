import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../app/hooks';
import { useAppDispatch } from '../../app/hooks';
import { selectUser } from '../auth/userSlice';
import { clearUser } from '../auth/userSlice';

const drawerWidth = 240;

export const SideBar = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  const logOut = () => {
    dispatch(clearUser());
    sessionStorage.removeItem('access-token');
    sessionStorage.removeItem('refresh-token');
    navigate('/login');
  };
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      ></AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            HOME
          </Typography>
        </Link>
        <Divider />
        <List>
          <Link to="/calendar" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItem key="calendar" disablePadding>
              <ListItemButton>
                <CalendarMonthIcon />
                <ListItemText primary="Calendar" />
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
        <List>
          <Link to="/video" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItem key="video" disablePadding>
              <ListItemButton>
                <VideoCameraFrontIcon />
                <ListItemText primary="Video" />
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
        <List>
          <Link
            to="/clientmanagement"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <ListItem key="ClientManagementPage" disablePadding>
              <ListItemButton>
                <PersonSearchIcon />
                <ListItemText primary="ClientManagementPage" />
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
        <Divider />
        {/* 로그아웃 버튼 & 기능 */}
        <List>
          <ListItem key="Logout" disablePadding>
            <ListItemButton onClick={logOut}>
              <LogoutIcon />
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};
