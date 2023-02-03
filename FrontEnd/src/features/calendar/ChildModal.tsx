import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import axios from 'axios';
const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height: 430,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
interface ChildModalProps {
  childOpen: boolean;
  handleChildClose: () => void;
}
export const ChildModal = ({ childOpen, handleChildClose }: ChildModalProps) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const clientdata = {
      clientName: data.get('name')?.toString() ?? '',
      clientEmail: data.get('email')?.toString() ?? '',
    };
    axios.post('http://localhost:3003/calendarEvents', clientdata);
    handleChildClose();
  };
  return (
    <>
      <Modal hideBackdrop open={childOpen} onClose={handleChildClose}>
        <Box sx={style}>
          <h2 id="child-modal-title">신규 내담자 등록</h2>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField margin="normal" label="이름" fullWidth id="name" name="name" />
            <TextField margin="normal" label="이메일" fullWidth id="email" name="email" />
            <Button type="submit">신규 등록</Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
