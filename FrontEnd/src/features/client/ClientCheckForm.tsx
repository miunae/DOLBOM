import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';

const theme = createTheme();

export const ClientCheckForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [roomNumber, setRoomNumber] = useState('');

  console.log(name);
  // console.log(email);
  // console.log(code);
  // console.log(roomNumber);

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
              name="code"
              label="코드"
              type="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="number"
              label="방번호"
              type="number"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              세션 입장
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
