import { useEffect } from 'preact/hooks'
import { useReducer } from 'react'
const ACTIONS = {
  SELECT_FOLDER: 'selectFolder'
}
interface CurrentFolder {
  folderId: null | string | number,
  folderName: string,
  childFolders: string| null[],
  childFiles: []


}
const reducer =(state, {type, payload}) =>{
  switch (type){
    case ACTIONS.SELECT_FOLDER:
      return{
        folderId: payload.folderId,

      }
  }
}

export const useFolder(folderId = null, folder = null) {
  const [state, dispatch] = useReducer(reducer, {
    folderId,
    folder,
    childFolders: [],
    childFiles: []
  }: CurrentFolder )

  useEffect(() => {
    dispatch({type: ACTIONS.SELECT_FOLDER, payload: {folderId, folder}})
  }, [folderId, folder])
}