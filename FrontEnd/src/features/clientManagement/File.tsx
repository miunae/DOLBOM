import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Link } from 'react-router-dom';
export const File = ({ fileName }: string) => {
  return (
    <>
      <Link href="/">
        {fileName}
        <InsertDriveFileIcon />
      </Link>
    </>
  );
};
