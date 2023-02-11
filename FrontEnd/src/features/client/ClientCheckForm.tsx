import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { access } from 'fs';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const theme = createTheme();

export const ClientCheckForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [clientSessionId, setClientSessionId] = useState('');
  const [conferenceId, setConferenceId] = useState('');

  // (27) 선택된 내담자들에 대한 정보를 post 한다.
  function sendToClientinfo() {
    const body = JSON.stringify({
      email: email,
      sessionid: clientSessionId,
      conferenceId: conferenceId,
    });
    axios
      .post('http://localhost:8080/api/conference/client', body, {
        headers: {
          'Content-Type': 'application/json',
          'access-token': sessionStorage.getItem('access-token'),
          'refresh-token': sessionStorage.getItem('refresh-token'),
        },
      })
      .then(function (res) {
        console.log(res + '고객정보 전달 성공!');
      })
      .catch(function (res) {
        console.log(res + '고객정보 전달 실패!');
      }); // 요청 응답값에 따라서, 입장 허가와 불허를 판단한다.
  }
  // sessionStorage.setItem('access-token', 'Bearer ' + accessToken);

  sessionStorage.setItem('sessionId', clientSessionId);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            DOLBOM 서비스 입장
          </Typography>

          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="email"
              label="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="clientSessionId"
              label="코드"
              value={clientSessionId}
              onChange={(e) => setClientSessionId(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="conferenceId"
              label="방번호"
              type="number"
              value={conferenceId}
              onChange={(e) => setConferenceId(e.target.value)}
            />
            <Link to={`/video/${clientSessionId}`}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={sendToClientinfo}
              >
                세션 입장
              </Button>
            </Link>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
