import ArticleIcon from '@mui/icons-material/Article';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Button } from '@mui/material';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

import { axiosService } from '../../api/instance';
interface Filedata {
  fileName: string | undefined;
  fileId: number;
}
export const File = ({ fileName, fileId }: Filedata) => {
  const Download = () => {
    axiosService.get<Blob>(`file/${fileId}`, { responseType: 'blob' }).then((res) => {
      console.log(res);
      const url = URL.createObjectURL(res.data);
      if (url != null) {
        window.open(url);
      }
    });
  };
  return (
    <>
      <Button
        variant="outlined"
        // onClick={toAnotherFolder}
        sx={{ m: 1, width: '10vh', minWidth: '18vh' }}
        onClick={Download}
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
          <ArticleIcon sx={{ width: 1 / 2, height: '10vh' }} />
          <Typography component="div" noWrap>
            {fileName}
          </Typography>
        </Box>
      </Button>
    </>
  );
};
