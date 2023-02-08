import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../../app/store';
interface FolderState {
  path: null | string;
  name: string;
}

const initialState: FolderState = {
  path: null,
  name: 'Root',
};

const dashBoardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    openAnotherFolder: (state: any, action) => {
      state.path = action.payload.path;
      state.name = action.payload.name;
    },
  },
});

export const { openAnotherFolder } = dashBoardSlice.actions;
export const selectDashboard = (state: RootState) => state.dashboard;
export default dashBoardSlice.reducer;
