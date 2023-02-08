import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
interface Folderdata {
  folderName: string | undefined;
}
export const Folder = ({ folderName }: Folderdata) => {
  const location = useLocation();
  const userParam = location.state.userParam;
  console.log(userParam);
  const parentPath = location.state.parantPath;
  const currentFolder = parentPath + '_' + folderName;
  const navigate = useNavigate();
  const toAnotherFolder = () => {
    navigate(`/clientdetail/${userParam}/${currentFolder}`),
      {
        state: {
          userParam: userParam,
          parantPath: currentFolder,
        },
      };
  };
  return (
    <>
      <Button variant="outlined" onClick={toAnotherFolder}>
        <FolderOpenIcon />
        {folderName}
      </Button>
    </>
  );
};
