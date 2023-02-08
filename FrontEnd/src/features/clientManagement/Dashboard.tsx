import { Grid } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { AddFileButton } from './AddFileButton';
import { AddFolderButton } from './AddFolderButton';
import { Folder } from './Folder';

export const Dashboard = () => {
  // const { folderId } = useParams() as { folderId: string };
  const slash: number = useLocation().pathname.lastIndexOf('null');
  const folderName = useLocation().pathname.substring(slash);
  const location = useLocation();
  const userParam = location.state.userParam;
  const parentPath = location.state.parantPath;
  const currentFolder = parentPath + '/' + folderName;
  const [isUpdate, setIsUpdate] = useState(false);
  const update = () => {
    setIsUpdate(!isUpdate);
  };

  useEffect(() => {
    axios.get('http://localhost:3003/defaultFolder/').then((res) => {
      setData(res.data);
    });
  }, [isUpdate]);
  const [data, setData] = useState([]);
  return (
    <>
      <h1>{folderName}</h1>
      <AddFolderButton folderPath={currentFolder} update={update} />
      <AddFileButton />
      {data.map((prop: any, index) => (
        <Grid item xs={6} key={index}>
          <Folder key={index} folderName={prop.folderName} />
        </Grid>
      ))}
    </>
  );
};
// addFolder 에 path 넣어줘야함
// dashboard 업데이트 매서드 추가
