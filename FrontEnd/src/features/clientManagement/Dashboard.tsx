import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { Grid } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { useAppSelector } from '../../app/hooks';
import { AddFileButton } from './AddFileButton';
import { AddFolderButton } from './AddFolderButton';
import { BackButton } from './BackButton';
import { selectDashboard } from './dashboardSlice';
import { Folder } from './Folder';
export const Dashboard = () => {
  // const { folderId } = useParams() as { folderId: string };
  // const slash: number = useLocation().pathname.lastIndexOf('null');
  // const folderName = useLocation().pathname.substring(slash);
  // const location = useLocation();
  // const userParam = location.state.userParam;
  // const parentPath = location.state.parantPath;
  // const currentFolder = parentPath + '/' + folderName;
  const currentState = useAppSelector(selectDashboard);
  const currentPath = currentState.path;
  const currentName = currentState.name;
  console.log(currentPath);
  const [isUpdate, setIsUpdate] = useState(false);
  const update = () => {
    setIsUpdate(!isUpdate);
  };

  useEffect(() => {
    axios.get(`http://localhost:3003/${currentPath}/`).then((res) => {
      setData(res.data);
    });
  }, [isUpdate, currentName]);
  const [data, setData] = useState([]);
  return (
    <>
      <h1>{currentName}</h1>
      <AddFolderButton folderPath={currentPath} update={update} />
      <AddFileButton />
      <BackButton />
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {data.map((prop: any, index) => (
          <Grid item xs={2} key={index}>
            <Folder key={index} folderName={prop.folderName} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
// addFolder 에 path 넣어줘야함
// dashboard 업데이트 매서드 추가
