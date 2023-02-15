import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import VideoRoomComponent from '../components/VideoRoomComponent.jsx';
import TextareaDec from '../components/memo/TextareaDec'
export function VideoPage() {
  const refreshToken = sessionStorage.getItem('refresh-token');

  // const TextOrUser = () => {
  //   if (refreshToken) return <TextareaDec />;
  //   return null;
  // };
  return (
    <>
      <div>
        <VideoRoomComponent />
        {/* <TextOrUser/>   */}   
        </div>

      <div></div>
    </>
  );
}
