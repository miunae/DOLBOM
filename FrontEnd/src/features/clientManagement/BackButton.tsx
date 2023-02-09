import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { Button } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { openAnotherFolder, selectDashboard } from './dashboardSlice';
export const BackButton = () => {
  const dispatch = useAppDispatch();
  const currentState = useAppSelector(selectDashboard);
  const currentPath = currentState.path;

  const Back = () => {
    if (currentPath !== null) {
      const slashidx = currentPath.lastIndexOf('/');
      const exPath = currentPath.substring(0, slashidx);
      const nameStart = exPath.lastIndexOf('/');
      const exFolderName = exPath.substring(nameStart + 1);
      dispatch(openAnotherFolder({ name: exFolderName, path: exPath }));
    }
  };
  return (
    <Button onClick={Back}>
      <KeyboardReturnIcon />;
    </Button>
  );
};
