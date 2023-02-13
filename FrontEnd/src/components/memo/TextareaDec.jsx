import './TextareaDec.css';

import { Button } from '@material-ui/core';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Textarea from '@mui/joy/Textarea';
import Typography from '@mui/joy/Typography';
import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';

import Buttons from './Buttons';

// import buttons from

export default function TextareaDec() {
  const [text, setText] = React.useState(''); // textarea의 값은 text로 담는다.
  const addEmoji = (emoji) => () => setText(`${text}${emoji}`);

  // const LoginOrMemo = ({ userId }: { userId?: string }) => {
  //   if (userId) return <></>;
  // };

  // 전역적으로 담자 많이 쓰니깐.
  const accessToken = sessionStorage.getItem('access-token');
  const refreshToken = sessionStorage.getItem('refresh-token');
  const conferenceId = sessionStorage.getItem('conferenceId');

  // (28) memo에 대한 post conferid, memo 2개 post한다.
  function sendText() {
    const body = JSON.stringify({
      memo: text,
      conferenceId: sessionStorage.getItem('conferenceId'),
    });

    axios
      .post('http://localhost:8080/api/conference/client', body, {
        headers: {
          'Content-Type': 'application/json',
          'access-token': accessToken,
          'refresh-token': refreshToken,
        },
      })
      .then(function (res) {
        console.log(res + '메모 저장 성공!');
      })
      .catch(function (res) {
        console.log(res + '메모 저장 실패!');
      }); // 넘어오는 값으로 성공/실패 여부 판별.
  }

  // (31) openvidu 녹음 시작 버튼
  function recordstart() {
    axios
      .get('http://localhost:8080/openvidu/api/recordings/start', {
        headers: {
          'Content-Type': 'application/json',
          'access-token': accessToken,
          'refresh-token': refreshToken,
        },
      })
      .then(function (res) {
        console.log(res + '녹음 시작 성공!');
      })
      .catch(function (res) {
        console.log(res + '녹음 시작 실패!');
      });
  }

  // (32) openvidu 녹음 중지 버튼
  function recordstop() {
    axios
      .get('http://localhost:8080/openvidu/api/recordings/stop/{conferenceId}', {
        headers: {
          'Content-Type': 'application/json',
          'access-token': accessToken,
          'refresh-token': refreshToken,
        },
      })
      .then(function (res) {
        console.log(res + '녹음 중지 성공!');
      })
      .catch(function (res) {
        console.log(res + '녹음 중지 실패!');
      });
  }

  return (
    <div id="memoContainer">
      <Textarea
        placeholder="메모장"
        value={text}
        onChange={(event) => setText(event.target.value)}
        minRows={6} // 처음 보이는 메모장 크기
        maxRows={8} // 15줄을 넘어가면 스크롤로 표시될거야.
        startDecorator={
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <IconButton variant="outlined" color="neutral" onClick={addEmoji('👍')}>
              👍
            </IconButton>
            <IconButton variant="outlined" color="neutral" onClick={addEmoji('👌')}>
              👌
            </IconButton>
            <IconButton variant="outlined" color="neutral" onClick={addEmoji('😍')}>
              😍
            </IconButton>
          </Box>
        }
        endDecorator={
          <Typography level="body3" sx={{ ml: 'auto' }}>
            글자수 : {text.length}
          </Typography>
        }
        sx={{ minWidth: 200 }}
      />
      <Link>
        <div className="buttons">
          <Button
            className="record-start"
            variant="contained"
            color="primary"
            onClick={recordstart}
          >
            녹음 시작
          </Button>
          <Button
            className="record-stop"
            variant="outlined"
            color="secondary"
            onClick={recordstop}
          >
            녹음 중지
          </Button>
          <Button className="text-save" variant="contained" onClick={sendText}>
            메모 저장
          </Button>
        </div>
        {/* <Buttons /> */}
      </Link>
    </div>
  );
}

// 하림님 코드를 이용해서 user.id에 여부에 따라 메모창을 보여주고 안 보여주고를 결정할예정!
