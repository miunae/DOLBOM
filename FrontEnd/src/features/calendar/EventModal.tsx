import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';

import { useFetchData } from '../../hooks/useFetchData';
const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
interface EventModalProps {
  open: boolean;
  handleClose: () => void;
  eventInfos: any;
  clickInfos: any;
  isEditCard: boolean;
}
export const EventModal = ({
  open,
  handleClose,
  eventInfos,
  clickInfos,
  isEditCard,
}: EventModalProps) => {
  //기존 내담자 리스트
  const [list, setList] = useState([]);
  //선정된 내담자
  const [client, setClient] = useState<null | HTMLElement>(null);
  //예약 내용
  const [content, setContent] = useState('');
  //시작시간
  const [startTime, setStartTime] = useState('');
  //종료 시간
  const [endTime, setEndTime] = useState('');
  useEffect(() => {
    useFetchData().then((res) => setList(res));
  }, []);
  const addEvent = () => {
    const calendarApi = eventInfos.view.calendar;
    calendarApi.addEvent({
      title: client,
      start: eventInfos.startStr,
      end: eventInfos.endStr,
      allDay: eventInfos.allDay,
    });
    handleClose();
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Modal
        </Typography>
        <Autocomplete
          disablePortal
          options={list}
          onChange={(e, value) => setClient(value)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="예약자 찾기"
              sx={{
                width: 350,
                margin: '10px auto',
              }}
            />
          )}
        />
        <TextField
          label="상담 시작 시간"
          type="time"
          defaultValue="07:30"
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300, // 5 min
          }}
          sx={{ width: 150 }}
        />
        <TextField
          label="상담 종료 시간"
          type="time"
          defaultValue="00:00"
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300, // 5 min
          }}
          sx={{ width: 150 }}
        />
        <Button onClick={addEvent}>test</Button>
      </Box>
    </Modal>
  );
};
