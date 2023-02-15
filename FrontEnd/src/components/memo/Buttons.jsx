import { Button } from '@material-ui/core';
import axios from 'axios';
import React from 'react';
import { renderMatches } from 'react-router-dom';

// 전역적으로 담자 많이 쓰니깐.
const accessToken = sessionStorage.getItem('access-token');
const refreshToken = sessionStorage.getItem('refresh-token');

// (28) memo에 대한 post conferid, memo 2개 post한다.

function Buttons() {
  // (31) openvidu 녹음 시작 버튼
  function sendText() {
    const body = JSON.stringify({
      // memo: text,
      conferenceId: sessionStorage.getItem('conferenceId'),
    });

    axios
      .post('http://localhost:8080/api/conference/memo', body, {
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
      .get(`http://localhost:8080/openvidu/api/recordings/stop/${conferenceId}`, {
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
  );
}

export default Buttons();
