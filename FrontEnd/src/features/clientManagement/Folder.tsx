import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { Button } from '@mui/material';
import { Typography } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { openAnotherFolder, selectDashboard } from './dashboardSlice';
interface Folderdata {
  folderName: string | undefined;
}
export const Folder = ({ folderName }: Folderdata) => {
  const currentState = useAppSelector(selectDashboard);
  const currentPath = currentState.path;
  const currentName = currentState.name;
  const dispatch = useAppDispatch();

  const toAnotherFolder = () => {
    dispatch(
      openAnotherFolder({ name: folderName, path: currentPath + '/' + folderName }),
    );
    console.log(currentName);
    console.log(currentPath);
  };
  return (
    <>
      <Button
        variant="outlined"
        onClick={toAnotherFolder}
        sx={{ width: 1, height: '10vh' }}
      >
        <FolderOpenIcon sx={{ width: 1 / 2, height: '10vh' }} />
        <Typography variant="h6" component="div" noWrap>
          {folderName}
        </Typography>
      </Button>
    </>
  );
};
