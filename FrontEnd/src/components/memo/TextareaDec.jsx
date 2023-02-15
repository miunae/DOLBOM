import './TextareaDec.css';

import { Button, ButtonBase } from '@material-ui/core';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Textarea from '@mui/joy/Textarea';
import Typography from '@mui/joy/Typography';
import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';

import TextAreaButtons from './TextAreaButtons';

export default function TextareaDec() {
  const [text, setText] = React.useState(''); // textarea의 값은 text로 담는다.
  const addEmoji = (emoji) => () => setText(`${text}${emoji}`);

  // 전역적으로 담자 많이 쓰니깐.
  const accessToken = sessionStorage.getItem('access-token');
  const refreshToken = sessionStorage.getItem('refresh-token');

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
        confirmDelete();
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

  // (32) openvidu 녹음 시작 버튼
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

  // refreshToken 여부에 따라서 button 보이고 안보이고 여부 설정
  const MemoOrUser = () => {
    if (refreshToken) return <TextAreaButtons />;
    return null;
  };

  // window.alert
  const useConfirm = (message = null, onConfirm, onCancel) => {
    if (!onConfirm || typeof onConfirm !== 'function') {
      return;
    }
    if (onCancel && typeof onCancel !== 'function') {
      return;
    }

    const confirmAction = () => {
      if (window.confirm(message)) {
        onConfirm();
      } else {
        onCancel();
      }
    };

    return confirmAction;
  };

  const deleteConfirm = () => console.log('삭제했습니다.');
  const cancelConfirm = () => console.log('취소했습니다.');
  const confirmDelete = useConfirm('상담실로 이동하시겠습니까?', cancelConfirm);

  return (
    <div id="memoContainer">
      <Textarea
        placeholder="메모장"
        value={text}
        onChange={(event) => setText(event.target.value)}
        minRows={6}
        maxRows={8}
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
      <MemoOrUser />
    </div>
  );
}
