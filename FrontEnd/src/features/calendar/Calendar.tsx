import {
  DateSelectArg,
  EventApi,
  EventClickArg,
  EventContentArg,
} from '@fullcalendar/core';
import allLocales from '@fullcalendar/core/locales-all';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

import { createEventId, INITIAL_EVENTS } from './event-utils';

function Calendar() {
  const [events, setEvents] = useState([]);
  //드롭
  const eventDrop = (info: any) => {
    console.log(info.event);
    const updateId = info.event._def.publicId;
    axios.get(`http://localhost:3003/calendarEvents/${updateId}`).then((res) => {
      axios.put(`http://localhost:3003/calendarEvents/${updateId}`, {
        ...res.data,
        start: info.event.start.toISOString(),
        end: info.event.end.toISOString(),
      });
    });
  };
  useEffect(() => {
    axios.get('http://localhost:3003/calendarEvents/').then((res) => {
      setEvents(res.data);
    });
    console.log('랜더링');
  }, []);
  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
  const handleEvents = useCallback((events: EventApi[]) => setCurrentEvents(events), []);
  const handleDateSelect = useCallback((selectInfo: DateSelectArg) => {
    const title = prompt('타이틀 입력')?.trim();
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();
    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  }, []);
  const handleEventClick = useCallback((clickInfo: EventClickArg) => {
    if (window.confirm(`${clickInfo.event.title}를 삭제하시겠습니까?`)) {
      clickInfo.event.remove();
    }
  }, []);
  return (
    <div className="demo-app">
      <div className="demo-app-main">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          selectable={true}
          editable={true}
          events={events}
          locale="kr"
          eventsSet={handleEvents}
          select={handleDateSelect}
          eventClick={handleEventClick}
          eventDrop={eventDrop}
        />
      </div>
    </div>
  );
}

export default Calendar;
