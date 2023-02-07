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
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../app/hooks';
import { useAppDispatch } from '../../app/hooks';
import { selectUser } from '../auth/userSlice';
import { clearUser } from '../auth/userSlice';

const drawerWidth = 240;
const style = {
  position: 'absolute' as const,
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

  const logOut = () => {
    dispatch(clearUser());
    sessionStorage.removeItem('access-token');
    sessionStorage.removeItem('refresh-token');
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // makeSessionData (세션에서 client 분리를 위한 데이터)
  const [makeSessionData, setMakeSessionData] = useState([]);

  // input으로 입력한 세션 코드를 저장해주기 위한 state
  const [sessionCode, setSessionCode] = useState('');

  // 해당 상담자에 대한 내담자 리스트를 요청을 받기 위한 axios
  async function getClientData() {
    try {
      const response = await axios.get('http://localhost:5000/api/client/1'); // client/{id} 를 통해 호출
      setMakeSessionData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

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
                      handleOpen(); // 모달 열리는 것
                      getClientData(); // 모달 열릴 때 axios로 counselor에 해당하는 client들 호출
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
                        <select>
                          {makeSessionData.map((it, idx) => (
                            <option key={idx} value={it.id}>
                              {it.name} : {it.phone}
                            </option>
                          ))}
                        </select>
                      </Typography>
                      <div>
                        <Typography id="modal-modal-session" sx={{ mt: 2 }}>
                          코드
                        </Typography>
                        <input
                          defaultValue={'정수를 입력하세요'}
                          onChange={(e) => {
                            setSessionCode(e.target.value);
                          }}
                        />
                      </div>

                      <div>
                        <Typography id="modal-modal-button" variant="h6" component="h2">
                          {/* 링크를 타고 들어갈 때 해당 링크로 DATA 전송 */}
                          <Link
                            to={`/video`}
                            state={{
                              makeSessionData: makeSessionData,
                              sessionCode: sessionCode,
                            }}
                          >
                            <Button color="secondary">세션 생성</Button>
                          </Link>

                          <Link to="/calendar ">
                            <button onClick={handleClose}>뒤로가기</button>
                          </Link>
                        </Typography>
                      </div>
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
