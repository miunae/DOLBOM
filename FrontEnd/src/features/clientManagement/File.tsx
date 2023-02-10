import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Button } from '@mui/material';
import { Typography } from '@mui/material';
interface Filedata {
  fileName: string | undefined;
}
export const File = ({ fileName }: Filedata) => {
  return (
    <>
      <Button variant="outlined" sx={{ width: 1, height: '10vh' }}>
        <InsertDriveFileIcon sx={{ width: 1 / 2, height: '10vh' }} />
        <Typography variant="h6" component="div" noWrap>
          {fileName}
        </Typography>
      </Button>
    </>
  );
};
