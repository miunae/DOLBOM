import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Button } from '@mui/material';
import { useRef, useState } from 'react';

import { axiosService } from '../../api/instance';
import { useAppSelector } from '../../app/hooks';
import { selectDashboard } from './dashboardSlice';
export const AddFileButton = () => {
  const currentState = useAppSelector(selectDashboard);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const accessToken = sessionStorage.getItem('access-token');
  const refreshToken = sessionStorage.getItem('refresh-token');
  const mcid = currentState.memberClientId;
  const handleFileChange = async (e: any) => {
    // Update chosen files
    e.preventDefault();
    const files = e.target.files[0];
    // setFilesToUpload(files);
    const formData = new FormData();
    const data = {
      member_client_id: mcid,
      path: '', // 수정 필요
    };
    formData.append(
      'dto',
      new Blob([JSON.stringify(data)], { type: 'application/json' }),
    );
    formData.append('file', files);

    console.log(formData);
    await axiosService.post('/file/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'access-token': accessToken,
        'refresh-token': refreshToken,
      },
    });
  };
  return (
    <>
      <Button variant="contained" component="label">
        <UploadFileIcon />
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => handleFileChange(e)}
          hidden
        />
      </Button>
    </>
  );
};
