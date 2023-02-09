import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';

import { useFetchData } from '../../hooks/useFetchData';
import { ChildModal } from './ChildModal';

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
          const startString: any = new Date(res.data?.start).toString();
          const startmid = startString.indexOf(':');
          const endString: any = new Date(res.data?.end).toString();
          const endtmid: number = startString.indexOf(':');
          console.log(typeof startString);
          console.log(startmid);
          setStartTime(startString.substring(startmid - 2, startmid + 3));
          setEndTime(endString.substring(endtmid - 2, endtmid + 3));
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
  const onCloseandReset = () => {
    setClient('');
    setContent('');
    handleClose();
  };
  // Child Modal 관련 메서드
  // Child Modal 관련 메서드
  // Child Modal 관련 메서드
  const [childOpen, setChildOpen] = React.useState(false);
  const handleChildOpen = () => {
    setChildOpen(true);
  };
  const handleChildClose = () => {
    setChildOpen(false);
  };

  return (
    <>
      <ChildModal childOpen={childOpen} handleChildClose={handleChildClose} />
      <Modal open={open} onClose={onCloseandReset}>
        <Box sx={style}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'row-reverse',
            }}
          >
            <PersonAddIcon className="cursor-pointer" onClick={handleChildOpen} />
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Modal
            </Typography>
          </Box>
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
                  width: 'transparent',
                  margin: '15px auto',
                }}
              />
            )}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
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
              sx={{ width: 200 }}
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
              sx={{ width: 200 }}
              onChange={(e) => {
                setEndTime(e.target.value);
              }}
            />
          </Box>
          <TextField
            label="메모"
            multiline
            value={content}
            rows={4}
            fullWidth
            sx={{
              margin: '15px auto',
            }}
            onChange={(e) => setContent(e.target.value)}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'row-reverse',
            }}
          >
            <Button onClick={isEditCard ? editEvent : addEvent} variant="contained">
              {isEditCard ? '수정하기' : '등록하기'}
            </Button>
            {isEditCard && (
              <Button onClick={removeEvent} variant="contained" color="error">
                이벤트 삭제
              </Button>
            )}
          </Box>
        </Box>
      </Modal>
    </>
  );
};
