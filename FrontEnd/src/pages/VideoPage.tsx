import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import VideoRoomComponent from '../components/VideoRoomComponent.jsx';

export function VideoPage() {
  // const location = useLocation();
  // const state = location.state as {
  //   selected: string;
  //   sessionCode: string;
  //   clientJoinData: string;

  // const clientId = state.selected;
  // const makeSessionCode = state.sessionCode;
  // const clientJoinData = state.clientJoinData;

  // console.log(makeSessionData); // 세션 만드는 데이터
  // console.log(makeSessionCode); // 세션 만들때 정해준 세션 코드
  // console.log(clientJoinData); // 보내준 메일 폼으로 들어갈 때 데이터

<<<<<<< HEAD
=======
import { SideBar } from '../features/sideBar/SideBar';

export const VideoPage = () => {
>>>>>>> 4ac22943d1c3eb0b67902f3da6c803c1a2789848
  return (
    <>
      <div>
        <VideoRoomComponent />
        {/* <VideoRoomComponent /> */}
      </div>

      <div></div>
    </>
  );
}
