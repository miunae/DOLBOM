import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LogoutIcon from '@mui/icons-material/Logout';
import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Modal from '@mui/material/Modal';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useAppSelector } from '../../app/hooks';
import { useAppDispatch } from '../../app/hooks';
import { selectUser } from '../auth/userSlice';
import { clearUser } from '../auth/userSlice';

const drawerWidth = 240;
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const SideBar = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  // const [modal, setModal] = useState(false);
  // console.log(modal);

  const logOut = () => {
    dispatch(clearUser());
    sessionStorage.removeItem('access-token');
    sessionStorage.removeItem('refresh-token');
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getClient = async () => {
    const client = await axios.get('https://localhost:3000/api/client/{id}');
    console.log(client.data);
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
          <div style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItem key="video" disablePadding>
              <ListItemButton>
                <VideoCameraFrontIcon />
                <div>
                  <Button
                    onClick={() => {
                      getClient();
                      handleOpen();
                    }}
                  >
                    Video
                  </Button>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <Typography id="modal-modal-title" variant="h6" component="h2">
                        내담자 정보 입력 및 세션 생성
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        내담자 선택 :
                        <select name="client">
                          <option value="park">김다미</option>
                          <option value="cool">김태리</option>
                          <option value="cool">금태록</option>
                        </select>
                      </Typography>
                      <div>
                        <Typography id="modal-modal-session" sx={{ mt: 2 }}>
                          세션 번호
                        </Typography>
                        <input defaultValue={'정수 값'} />
                      </div>

                      <Typography id="modal-modal-button" variant="h6" component="h2">
                        <Link to="/video">
                          <button>세션 생성</button>
                        </Link>
                      </Typography>
                      <Typography id="modal-modal-button" variant="h6" component="h2">
                        <Link to="/calendar ">
                          <button onClick={handleClose}>뒤로가기</button>
                        </Link>
                      </Typography>
                    </Box>
                  </Modal>
                </div>
              </ListItemButton>
            </ListItem>
          </div>
        </List>

        <List>
          <Link to="/userprofile" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItem key="userprofile" disablePadding>
              <ListItemButton>
                <PersonSearchIcon />
                <ListItemText primary="UserProfile" />
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
