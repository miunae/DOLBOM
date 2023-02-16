import { Box, Grid, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { axiosService } from '../../api/instance';
import { useAppSelector } from '../../app/hooks';
import { AddFileButton } from './AddFileButton';
import { AddFolderButton } from './AddFolderButton';
import { BackButton } from './BackButton';
import { selectDashboard } from './dashboardSlice';
import { DeleteButton } from './DeleteButton';
import { File } from './File';
import { Folder } from './Folder';
import { Loading } from './Loading';
export const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const currentState = useAppSelector(selectDashboard);
  const currentPath = currentState.path;
  const pathStack = currentState.pathStack;
  const currentMemberClientId = currentState.memberClientId;
  const toggle = currentState.toggle;
  const [isUpdate, setIsUpdate] = useState(false);
  const update = () => {
    setIsUpdate(!isUpdate);
  };
  const dataFetch = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    const path = pathStack[pathStack.length - 1] === 'root' ? '' : currentPath;
    axiosService
      .get('/folder/', { params: { id: currentMemberClientId, path: path } })
      .then((res) => {
        setFolderData(res.data);
        console.log(res.data);
      });
    axiosService
      .get('/file/', { params: { id: currentMemberClientId, path: path } })
      .then((res) => {
        setFileData(res.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    dataFetch();
  }, [isUpdate, currentPath, pathStack, toggle]);
  const [folderData, setFolderData] = useState([]);
  const [fileData, setFileData] = useState([]);
  return (
    <>
      <Box sx={{ flexGrow: 1, width: 1 }}>
        {loading ? (
          <Loading />
        ) : (
          <>
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'row-reverse',
                bgcolor: 'background.paper',
                borderRadius: 1,
                width: 1,
              }}
            >
              {pathStack.length > 1 ? <BackButton /> : null}
              {pathStack.length > 1 ? <DeleteButton update={update} /> : null}
              <AddFolderButton update={update} />
              <AddFileButton update={update} />
            </Box>
            <Typography sx={{ width: '100px', my: 0 }}>folders</Typography>
            <Divider sx={{ my: 1 }} />
            <Box sx={{ minHeight: '40vh' }}>
              {folderData.length ? (
                <Box>
                  {folderData.map((prop: any, index) => (
                    <Folder key={index} folderName={prop.slice(1, -1)} />
                  ))}
                </Box>
              ) : (
                <Typography> 하위 폴더가 없습니다.</Typography>
              )}
            </Box>
            <Typography>files</Typography>
            <Divider sx={{ my: 1 }} />
            <Box sx={{ display: 'flex', flexDirection: 'row', minHeight: '20vh' }}>
              {fileData.length ? (
                <Box>
                  {fileData.map((prop: any, index) => (
                    <File key={index} fileName={prop.fileName} fileId={prop.fileId} />
                  ))}
                </Box>
              ) : (
                <Typography> 하위 파일이 없습니다.</Typography>
              )}
            </Box>
          </>
        )}
      </Box>
    </>
  );
};
// addFolder 에 path 넣어줘야함
// dashboard 업데이트 매서드 추가
