import ArticleIcon from '@mui/icons-material/Article';
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
      <Button
        variant="outlined"
        // onClick={toAnotherFolder}
        sx={{ m: 1, width: '10vh', minWidth: '18vh' }}
        // sx={{ width: 'auto', height: 'auto' }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
            p: 1,
            m: 1,
            bgcolor: 'background.paper',
            borderRadius: 1,
            margin: 0,
          }}
        >
          <ArticleIcon sx={{ width: 4 / 5, height: '10vh' }} />
          <Typography variant="h6" component="div" noWrap>
            {fileName}
          </Typography>
        </Box>
      </Button>
    </>
  );
};
