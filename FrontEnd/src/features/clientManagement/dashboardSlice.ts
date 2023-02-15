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
  path: '',
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
      state.path = state.path + '/' + action.payload.path;
      if (action.payload.memberClientId) {
        state.memberClientId = action.payload.memberClientId;
      }
      state.name = action.payload.name;
    },
    appendPath: (state: any, action: PayloadAction<{ path: string }>) => {
      if (state.pathStack.length - 1) {
        state.path = state.path + '/' + action.payload.path;
      } else {
        state.path = state.path + action.payload.path;
      }
      state.pathStack = [...state.pathStack, action.payload.path];
    },
    popPath: (state) => {
      state.pathStack.pop();
      const exPath = state.path?.lastIndexOf('/');
      if (state.path) {
        state.path = state.path.substring(0, exPath);
      }
    },
    clearPath: (state) => {
      state.pathStack = [state.pathStack[0]];
      state.path = '';
    },
  },
});

export const { openAnotherFolder, setMemberClientId, appendPath, popPath, clearPath } =
  dashBoardSlice.actions;
export const selectDashboard = (state: RootState) => state.dashboard;
export default dashBoardSlice.reducer;
