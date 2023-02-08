import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useState } from 'react';
type folderInfo = {
  folderPath: string;
  update: () => void;
};
export const AddFolderButton = ({ folderPath, update }: folderInfo) => {
  const [open, setOpen] = useState(false);
  const [folderName, setFolderName] = useState('새폴더');
  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post('http://localhost:3003/defaultFolder', {
        folderName,
        path: folderPath,
      })
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
    update();
    setOpen(false);
    //폴더 생성 매서드
  };
  return (
    <>
      <Button onClick={openModal} variant="contained">
        <CreateNewFolderIcon />
      </Button>
      <Dialog open={open} onClose={closeModal}>
        <DialogTitle>폴더 추가</DialogTitle>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ m: 3, width: '50vh' }}
        >
          <TextField
            margin="dense"
            id="folderName"
            label="folderName"
            inputProps={{ maxLength: 12 }}
            type="text"
            // value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            fullWidth
            required
          />
          <Box sx={{ display: 'flex', flexDirection: 'row-reverse', mt: 2 }}>
            <Button onClick={closeModal} sx={{ ml: 2 }}>
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Subscribe
            </Button>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};