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
import axios, { AxiosError } from 'axios';
import { access } from 'fs';
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

  // user에 대한 고객 데이터 정보를 받는다.
  const [clientData, setClientData] = useState([]);

  // user가 selected한 client의 id를 담는다.
  const [selectedClientId, setSelectedClientId] = useState(0);

  // selected한 client에 대한 useState를 위해서 (e type 설정하기)
  const handleSelect = (e) => {
    setSelectedClientId(e.target.value);
  };

  // console.log(sessionStorage.getItem('access-token')) access-token 가져오는 코드

  // const sessionId = sessionStorage.setItem('userId') // userID를 Modal 창에서 클릭시 받아서 사용

  const accessToken = sessionStorage.getItem('access-token');
  const refreshToken = sessionStorage.getItem('refresh-token');

  // (25) user에 대한 client를 받기 위한 axios 요청, header에 토큰을 보내고 back에서 user에 대한 client를 받는다.
  function getClientData() {
    axios
      .get('http://localhost:8080/api/client', {
        headers: {
          'access-token': accessToken,
          'refresh-token': refreshToken,
        },
      })
      .then((response) => setClientData(response.data));
  }

  console.log(clientData); // client all data 확인
  console.log('selected: ' + selectedClientId); // selected 된 client의 id 확인

  // (26) 세션 생성을 누르고 back에 post 요청. sessionid랑 conf id 2개 받아서 storage에 저장
  function sendToSelected() {
    const body = JSON.stringify({ clientId: selectedClientId });
    axios
      .post('http://localhost:8080/api/conference', body, {
        headers: {
          'Content-Type': 'application/json',
          'access-token': accessToken,
          'refresh-token': refreshToken,
        },
      })
      .then(function (res) {
        sessionStorage.setItem('sessionId', res.data.sessionId), // 함수형으로 2개 전달
          sessionStorage.setItem('conferenceId', res.data.conferenceId);
      });
  }

  // (29) 세션 생성 누를때, post 요청 한개 더 why? 하나는 storage에 id 저장, 하나는 userid 로 설정, 이거 무조건 sessionid.
  function OpenVidu() {
    const body = JSON.stringify({ customSessionId: sessionStorage.getItem('sessionId') });
    axios.post('http://localhost:8080/api/sessions', body, {
      headers: {
        'Content-Type': 'application/json',
        'access-token': accessToken,
        'refresh-token': refreshToken,
      },
    });
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
                      handleOpen(); // 모달 여는 함수
                      getClientData(); // 모달 열릴 때 axios로 counselor에 해당하는 client 호출
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
                        내담자 선택 :{/* id, name, phone type 설정 해줘야함  */}
                        <select onChange={handleSelect}>
                          {clientData.map((it, idx) => (
                            <option key={idx} value={it.id}>
                              {it.name} : {it.phone}
                            </option>
                          ))}
                        </select>
                      </Typography>

                      <div>
                        <Typography id="modal-modal-button" variant="h6" component="h2">
                          {/* 링크 타고 들어 갈때 Video number는 sessionID로 한다.  */}
                          <Link to={`/video/${sessionStorage.getItem('sessionId')}`}>
                            <Button
                              color="secondary"
                              onClick={() => {
                                sendToSelected(); // selected된 데이터 넘기고
                                OpenVidu(); // openvidu할 때 쓸 id 넘긴다.
                              }}
                            >
                              세션 생성
                            </Button>
                          </Link>

                          <Link to="/calendar ">
                            <button>뒤로가기</button>
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
