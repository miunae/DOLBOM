import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import { Button } from '@mui/material';
import { useState } from 'react';
export const AddFolderButton = () => {
  const [open, setOpen] = useState(false);
  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };
  return (
    <>
      <Button onClick={openModal} variant="contained">
        <CreateNewFolderIcon />
      </Button>
    </>
  );
};
