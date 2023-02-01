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
  const [list, setList] = useState([]);
  //선정된 내담자
  const [client, setClient] = useState<null | HTMLElement>(null);
  //예약 내용
  const [content, setContent] = useState('');
  //시작시간
  const [initialStartTime, setInitialStartTime] = useState('10:00');
  const [startTime, setStartTime] = useState('10:00');
  //종료 시간
  const [InitialEndTime, setInitialEndTime] = useState('13:00');
  const [endTime, setEndTime] = useState('13:00');
  // autocomplete 목록 불러오기
  useEffect(() => {
    console.log('edit');
    useFetchData().then((res) => setList(res));
  }, []);
  //isEdit => true 일때 정보 불러오기
  useEffect(() => {
    if (isEditCard) {
      console.log('edit');
      axios
        .get(`http://localhost:3003/calendarEvents/${eventInfos?.event?._def?.publicId}`)
        .then((res) => {
          setClient(res.data?.title);
          setContent(res.data?.content);
          const timeStr = new Date(res.data?.start).toString();
          const stend = timeStr.lastIndexOf(':');
          setInitialStartTime(
            `${timeStr[stend - 5]}${timeStr[stend - 4]}:${timeStr[stend - 2]}${
              timeStr[stend - 1]
            }`,
          );
          const timeEnd = new Date(res.data?.end).toString();
          const enend = timeEnd.lastIndexOf(':');
          setInitialEndTime(
            `${timeEnd[enend - 5]}${timeEnd[enend - 4]}:${timeEnd[enend - 2]}${
              timeEnd[enend - 1]
            }`,
          );
        })
        .catch((e) => console.log(e));
      // setClient(eventInfos?.event?.title);
      // setContent(event.)
    }
  }, [eventInfos]);

  //evet db에 전달
  const addEvent = () => {
    const calendarApi = eventInfos.view.calendar;
    calendarApi.addEvent({
      title: client,
      start: startTime,
      end: endTime,
    });
    axios.post('http://localhost:3003/calendarEvents', {
      title: client,
      start: startTime,
      end: endTime,
      content,
    });
    setClient(null);

    handleClose();
  };
  const editEvent = () => {
    const calendarApi = eventInfos.view.calendar;
    const currentEvent = calendarApi.getEventById(eventInfos.event.id);
    currentEvent.setProp('title', client);
    axios.put(`http://localhost:3003/calendarEvents/${eventInfos.event._def.publicId}`, {
      title: client,
      start: startTime,
      end: endTime,
      content,
    });
    handleClose();
  };
  const removeEvent = () => {
    eventInfos.event.remove();
    axios.delete(
      `http://localhost:3003/calendarEvents/${eventInfos.event._def.publicId}`,
    );
    handleClose();
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Modal
        </Typography>
        <Autocomplete
          disablePortal
          options={list}
          value={client}
          onChange={(e, value) => setClient(value)}
          // defaultValue={client}
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
          value={initialStartTime}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300, // 5 min
          }}
          sx={{ width: 150 }}
          onChange={(e) => {
            {
              isEditCard
                ? setStartTime(
                    new Date(
                      `${eventInfos.event.startStr.substr(0, 10)} ${e.target.value}`,
                    ).toISOString(),
                  )
                : setStartTime(
                    new Date(`${eventInfos.startStr} ${e.target.value}`).toISOString(),
                  );
            }
            setInitialStartTime(e.target.value);
          }}
          // eventInfos.startStr
        />
        <TextField
          label="상담 종료 시간"
          type="time"
          value={InitialEndTime}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300, // 5 min
          }}
          sx={{ width: 150 }}
          onChange={(e) => {
            {
              isEditCard
                ? setEndTime(
                    new Date(
                      `${eventInfos.event.startStr.substr(0, 10)} ${e.target.value}`,
                    ).toISOString(),
                  )
                : setEndTime(
                    new Date(`${eventInfos.startStr} ${e.target.value}`).toISOString(),
                  );
            }
            setInitialEndTime(e.target.value);
          }}
        />
        <TextField
          label="메모"
          multiline
          defaultValue={content}
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
