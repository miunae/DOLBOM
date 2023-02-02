import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
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
  isEditCard,
}: EventModalProps) => {
  //기존 내담자 리스트
  console.log(eventInfos);
  const [list, setList] = useState([]);
  //선정된 내담자
  const [client, setClient] = useState('');
  //예약 내용
  const [content, setContent] = useState('');
  //시작시간
  const [startTime, setStartTime] = useState('10:00');
  //종료 시간
  const [endTime, setEndTime] = useState('13:00');
  // autocomplete 목록 불러오기
  useEffect(() => {
    console.log('edit');
    useFetchData().then((res) => setList(res));
  }, []);
  //isEdit => true 일때 정보 불러오기
  useEffect(() => {
    if (isEditCard) {
      console.log(eventInfos?.event);
      axios
        .get(`http://localhost:3003/calendarEvents/${eventInfos?.event?._def?.publicId}`)
        .then((res) => {
          setClient(res.data?.title);
          setContent(res.data?.content);
        })
        .catch((e) => console.log(e));
      // setClient(eventInfos?.event?.title);
    }
  }, [eventInfos]);

  //evet 추가 함수
  const addEvent = () => {
    const calendarApi = eventInfos.view.calendar;

    const data = {
      title: client == null ? '제목없음' : client,
      start: new Date(`${eventInfos.startStr.substr(0, 10)} ${startTime}`).toISOString(),
      end: new Date(`${eventInfos.startStr.substr(0, 10)} ${endTime}`).toISOString(),
      content,
    };
    calendarApi.addEvent(data);
    axios.post('http://localhost:3003/calendarEvents', data);

    setClient('');
    setContent('');
    handleClose();
  };
  const editEvent = () => {
    const calendarApi = eventInfos.view.calendar;
    const currentEvent = calendarApi.getEventById(eventInfos.event.id);

    console.log(eventInfos);
    console.log(currentEvent);
    const data = {
      title: client == null ? '제목없음' : client,
      start: new Date(`${eventInfos.event.startStr.substr(0, 10)} ${startTime}`),
      end: new Date(`${eventInfos.event.startStr.substr(0, 10)} ${endTime}`),
      content,
    };
    axios.put(`http://localhost:3003/calendarEvents/${currentEvent._def.publicId}`, data);
    if (currentEvent) {
      currentEvent.setProp('title', client !== null ? client : '무제');
      currentEvent.setDates(data.start, data.end);
    }
    setClient('');
    setContent('');
    handleClose();
  };
  const removeEvent = () => {
    eventInfos.event.remove();
    axios.delete(
      `http://localhost:3003/calendarEvents/${eventInfos.event._def.publicId}`,
    );
    setClient('');
    setContent('');
    handleClose();
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Modal
        </Typography>
        <Autocomplete
          options={list}
          // freeSolo={true}
          value={client ? client : ''}
          onInputChange={(e, value: string) => setClient(value)}
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
          value={startTime}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300, // 5 min
          }}
          sx={{ width: 150 }}
          onChange={(e) => {
            setStartTime(e.target.value);
            console.log(e.target.value);
          }}
          // eventInfos.startStr
        />
        <TextField
          label="상담 종료 시간"
          type="time"
          value={endTime}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300, // 5 min
          }}
          sx={{ width: 150 }}
          onChange={(e) => {
            setEndTime(e.target.value);
          }}
        />
        <TextField
          label="메모"
          multiline
          value={content}
          rows={4}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button onClick={isEditCard ? editEvent : addEvent}>
          {isEditCard ? '수정하기' : '등록하기'}
        </Button>
        {isEditCard && <Button onClick={removeEvent}>이벤트 삭제</Button>}
      </Box>
    </Modal>
  );
};
