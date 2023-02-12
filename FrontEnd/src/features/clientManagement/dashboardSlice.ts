import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../../app/store';
interface FolderState {
  path: null | string;
  memberClientId: number;
  name: string;
}

const initialState: FolderState = {
  name: 'root',
  path: null,
  memberClientId: 0,
};

const dashBoardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    openAnotherFolder: (
      state: any,
      action: PayloadAction<{
        name?: string;
        memberClientId?: number;
        path?: string;
      }>,
    ) => {
      state.path = action.payload.path;
      if (action.payload.memberClientId) {
        state.memberClientId = action.payload.memberClientId;
      }
      state.name = action.payload.name;
    },
  },
});

export const { openAnotherFolder } = dashBoardSlice.actions;
export const selectDashboard = (state: RootState) => state.dashboard;
export default dashBoardSlice.reducer;
