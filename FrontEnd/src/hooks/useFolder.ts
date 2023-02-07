import axios, { AxiosRequestConfig } from 'axios';
import { useEffect } from 'preact/hooks';
import { useReducer } from 'react';

const ACTIONS = {
  SELECT_FOLDER: 'selectFolder',
  UPDATE_FOLDER: 'update-folder',
};
const initailState = {
  folderId: '',
  folderList: [],
  fileList: [],
};
const reducer = (state: any, { type, payload }: any) => {
  switch (type) {
    case ACTIONS.SELECT_FOLDER:
      return {
        folderId: payload.folderId,
      };
    case ACTIONS.UPDATE_FOLDER:
      return {
        ...state,
        folderlist: payload.folder,
      };
  }
};
export const ROOT_FOLDER = { name: 'Root', id: null };

export const useFolder = (path: AxiosRequestConfig<any> | undefined) => {
  const [state, dispatch] = useReducer(reducer, initailState);

  useEffect(() => {
    dispatch({
      type: ACTIONS.SELECT_FOLDER,
      payload: { path },
    });
  }, [path]);
  useEffect(() => {
    if (path == null) {
      return dispatch({
        type: ACTIONS.UPDATE_FOLDER,
        payload: { folderlist: ROOT_FOLDER },
      });
    }
    axios.get(`http://localhost:3003/defaultFolder/${path}`);
  }, [path]);
  return state;
};
