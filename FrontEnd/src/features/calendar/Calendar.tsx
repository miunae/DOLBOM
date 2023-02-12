import { EventApi } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

import { axiosService } from '../../api/instance';
import { useModalControl } from '../../hooks/useModalControl';
import { EventModal } from './EventModal';

export const Calendar = () => {
  const [events, setEvents] = useState([]);
  const modalControl = useModalControl(false);
  const [eventInfos, setEventInfos] = useState();
  const [clickInfos, setClickInfos] = useState();
  const [isEditCard, setIsEditCard] = useState<boolean>(false);
  useEffect(() => {
    axiosService
      .get('/schedule/')
      .then((res) => {
        setEvents(res.data);
      })
      .catch((err) => console.log(`초기랜더링 에러${err}`));
    console.log('랜더링');
  }, []);
  //드롭
  const eventDrop = (info: any) => {
    console.log(info.event);
    const updateId = info.event._def.publicId;
    axios.get(`http://localhost:3003/calendarEvents/${updateId}`).then((res) => {
      axios.put(`http://localhost:3003/calendarEvents/${updateId}`, {
        ...res.data,
        start: info.event.startStr,
        end: info.event.endStr,
      });
    });
  };

  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
  const handleEvents = useCallback((events: EventApi[]) => setCurrentEvents(events), []);
  //날짜 선택시 이벤트 모달 오픈, 이벤트 추가
  const dateSelect = (selectInfo: any) => {
    setIsEditCard(false);
    setEventInfos(selectInfo);
    modalControl.handleOpen();
  };
  //이벤트 클릭 시
  const handleEventClick = (clickInfo: any) => {
    setIsEditCard(true);
    setEventInfos(clickInfo);
    modalControl.handleOpen();
  };
  return (
    <div className="Calendar">
      <EventModal
        open={modalControl.isOpen}
        handleClose={modalControl.handleClose}
        eventInfos={eventInfos}
        clickInfos={clickInfos}
        isEditCard={isEditCard}
      />
      <div className="demo-app-main">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          initialView="dayGridMonth"
          selectable={true}
          editable={true}
          events={events}
          locale="kr"
          eventsSet={handleEvents}
          select={dateSelect}
          eventClick={handleEventClick}
          eventDrop={eventDrop}
        />
      </div>
    </div>
  );
};
