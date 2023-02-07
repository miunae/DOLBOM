import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
interface Folderdata {
  folderName: string | undefined;
}
export const Folder = ({ folderName }: Folderdata) => {
  return (
    <>
      <Button variant="outlined">
        <FolderOpenIcon />
        <Link to="/" color="white">
          {folderName}
        </Link>
      </Button>
    </>
  );
};
