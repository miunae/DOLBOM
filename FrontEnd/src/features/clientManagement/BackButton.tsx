import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import IconButton from '@mui/material/IconButton';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { openAnotherFolder, popPath, selectDashboard } from './dashboardSlice';
export const BackButton = () => {
  const dispatch = useAppDispatch();
  const currentState = useAppSelector(selectDashboard);
  const currentPath = currentState.path;
  const Back = () => {
    if (currentPath !== null) {
      dispatch(popPath());
    }
  };
  return (
    <IconButton onClick={Back} color="error" sx={{ mx: 1 }}>
      <ArrowBackIosNewIcon />
    </IconButton>
  );
};
