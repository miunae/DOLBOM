import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Button } from '@mui/material';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
interface Filedata {
  fileName: string | undefined;
}
export const File = ({ fileName }: Filedata) => {
  return (
    <>
      <Button variant="outlined" sx={{ width: 1, height: '10vh' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-end',
            flexDirection: 'column-reverse',
            p: 1,
            m: 1,
            borderRadius: 1,
          }}
        >
          <InsertDriveFileIcon sx={{ width: 1 / 2, height: '10vh' }} />
          <InsertDriveFileIcon sx={{ width: 1 / 2, height: '10vh' }} />
          <Typography variant="h6" component="div" noWrap>
            {fileName}
          </Typography>
        </Box>
      </Button>
    </>
  );
};
