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
import { File } from './File';
import { Folder } from './Folder';
export const Dashboard = () => {
  const [currentFolderName, setCurrentFolderName] = useState('root');
  // const { folderId } = useParams() as { folderId: string };
  // const slash: number = useLocation().pathname.lastIndexOf('null');
  // const folderName = useLocation().pathname.substring(slash);
  // const location = useLocation();
  // const userParam = location.state.userParam;
  // const parentPath = location.state.parantPath;
  // const currentFolder = parentPath + '/' + folderName;
  const currentState = useAppSelector(selectDashboard);
  const currentPath = currentState.path;
  const pathStack = currentState.pathStack;
  const currentMemberClientId = currentState.memberClientId;
  console.log(currentPath);
  const [isUpdate, setIsUpdate] = useState(false);
  const update = () => {
    setIsUpdate(!isUpdate);
  };

  useEffect(() => {
    setCurrentFolderName(currentState.name);
    const path =
      pathStack[pathStack.length - 1] === 'root' ? '' : pathStack[pathStack.length - 1];
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
        console.log(res.data);
      });
  }, [isUpdate, currentPath, pathStack]);
  const [folderData, setFolderData] = useState([]);
  const [fileData, setFileData] = useState([]);
  return (
    <>
      <Box sx={{ flexGrow: 1, width: 'auto' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row-reverse',
            bgcolor: 'background.paper',
            borderRadius: 1,
            width: 'auto',
          }}
        >
          {pathStack.length >= 1 ? <BackButton /> : null}
          <AddFolderButton folderPath={currentPath} update={update} />
          <AddFileButton />
        </Box>
        <Typography>folders</Typography>
        <Divider sx={{ my: 1 }} />
        <Box sx={{ minHeight: '40vh' }}>
          {folderData.length ? (
            <Box>
              {folderData.map((prop: any, index) => (
                <Folder key={index} folderName={prop.slice(1, -1)} />
              ))}
            </Box>
          ) : (
            <Typography> 빈폴더입니다.</Typography>
          )}
        </Box>
        <Typography>files</Typography>
        <Divider sx={{ my: 1 }} />
        <Box sx={{ minHeight: '20vh' }}>
          {fileData.length ? (
            <Box>
              {fileData.map((prop: any, index) => (
                <File key={index} fileName={prop.slice(1, -1)} />
              ))}
            </Box>
          ) : (
            <Typography> 파일이 없습니다.</Typography>
          )}
        </Box>
      </Box>
    </>
  );
};
// addFolder 에 path 넣어줘야함
// dashboard 업데이트 매서드 추가
