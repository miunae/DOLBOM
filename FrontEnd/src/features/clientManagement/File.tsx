import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Link } from 'react-router-dom';
interface Filedata {
  fileName: string | undefined;
}
export const File = ({ fileName }: Filedata) => {
  return (
    <>
      <Link to="/">
        {fileName}
        <InsertDriveFileIcon />
      </Link>
    </>
  );
};
