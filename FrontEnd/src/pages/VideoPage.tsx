import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import VideoRoomComponent from '../components/VideoRoomComponent';

export function VideoPage() {
  return (
    <>
      <div>
        <VideoRoomComponent />
      </div>
    </>
  );
}
