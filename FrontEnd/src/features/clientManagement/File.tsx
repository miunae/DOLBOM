import ArticleIcon from '@mui/icons-material/Article';
import DeleteIcon from '@mui/icons-material/Delete';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Button } from '@mui/material';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

import { axiosService } from '../../api/instance';
import { useAppSelector } from '../../app/hooks';
import { selectDashboard } from './dashboardSlice';

interface Filedata {
  fileName: string | undefined;
  fileId: number;
}

export const File = ({ fileName, fileId }: Filedata) => {
  const currentState = useAppSelector(selectDashboard);
  const mcid = currentState.memberClientId;
  const Download = () => {
    axiosService.get<Blob>(`file/${fileId}`, { responseType: 'blob' }).then((res) => {
      console.log(res);
      const url = URL.createObjectURL(res.data);
      if (url != null) {
        window.open(url);
      }
    });
  };

  const Delete = (e: any) => {
    e.stopPropagation();
    axiosService.delete(`file/`, { params: { id: mcid, file_id: fileId } }).then(() => {
      console.log(`Deleted file with id ${fileId}`);
    });
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Button
        variant="outlined"
        sx={{ m: 1, width: '10vh', minWidth: '18vh' }}
        onClick={Download}
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
        <Box sx={{ position: 'absolute', top: 0, right: 0 }}>
          <Button
            variant="outlined"
            sx={{ width: '2rem', height: '2rem', minWidth: 0, minHeight: 0, p: 0 }}
            onClick={(e) => Delete(e)}
          >
            <DeleteIcon />
          </Button>
        </Box>
      </Button>
    </Box>
  );
};
