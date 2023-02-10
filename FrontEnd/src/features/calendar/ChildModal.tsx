import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { AxiosHeaders } from 'axios';

// import { toast, ToastContainer } from 'react-toastify';
import { axiosService } from '../../api/instance';
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
// type CustomHeaders = {
//   'access-token': string;
//   'refresh-token': string;
// } & AxiosHeaders;
export const ChildModal = ({ childOpen, handleChildClose }: ChildModalProps) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const clientdata = {
      name: data.get('name')?.toString() ?? '',
      email: data.get('email')?.toString() ?? '',
      phone: data.get('phone')?.toString() ?? '',
    };
    const accessToken = sessionStorage.getItem('access-token');
    const refreshToken = sessionStorage.getItem('refresh-token');
    const header = {
      'access-token': accessToken ? accessToken : '',
      'refresh-token': refreshToken ? refreshToken : '',
    };
    axiosService.post('/client/', clientdata, {
      headers: header,
    });
    // toast.success('내담자 등록 완료!', {
    //   position: 'top-center',
    //   autoClose: 200,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   theme: 'light',
    // });
    handleChildClose();
  };
  return (
    <>
      {/* <ToastContainer /> */}
      <Modal hideBackdrop open={childOpen} onClose={handleChildClose}>
        <Box sx={style}>
          <h2 id="child-modal-title">신규 내담자 등록</h2>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField margin="normal" label="이름" fullWidth id="name" name="name" />
            <TextField margin="normal" label="이메일" fullWidth id="email" name="email" />
            <TextField
              margin="normal"
              label="전화번호"
              fullWidth
              id="phone"
              name="phone"
            />
            <Button type="submit">신규 등록</Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
