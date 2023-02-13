import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../../app/store';
interface FolderState {
  path: null | string;
  memberClientId: any;
  name: string;
  pathStack: string[];
}

const initialState: FolderState = {
  name: 'root',
  path: null,
  memberClientId: 0,
  pathStack: ['root'],
};

const dashBoardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setMemberClientId: (state: any, action: PayloadAction<{ memberClientId: any }>) => {
      state.memberClientId = action.payload.memberClientId;
    },
    openAnotherFolder: (
      state: any,
      action: PayloadAction<{
        name?: string;
        memberClientId?: string;
        path?: string;
      }>,
    ) => {
      state.path = action.payload.path;
      if (action.payload.memberClientId) {
        state.memberClientId = action.payload.memberClientId;
      }
      state.name = action.payload.name;
    },
    appendPath: (state: any, action: PayloadAction<{ path: string }>) => {
      state.pathStack.append(action.payload.path);
    },
  },
});

export const { openAnotherFolder, setMemberClientId } = dashBoardSlice.actions;
export const selectDashboard = (state: RootState) => state.dashboard;
export default dashBoardSlice.reducer;
