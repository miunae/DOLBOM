import { useLocation, useParams } from 'react-router-dom';

import { AddFolderButton } from './AddFolderButton';
export const Dashboard = () => {
  const { folderId } = useParams();
  // const {folder, childFolders, childFiles} = useFolder(folderId, state.folder)
  return (
    <>
      <h1>{folderId}</h1>
      <AddFolderButton />
    </>
  );
};
