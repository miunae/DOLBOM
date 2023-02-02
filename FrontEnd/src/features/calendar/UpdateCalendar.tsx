interface IUpdateEventCalendar {
  eventCalendar: {
    _id: string;
    title: string;
    end: string;
    start: string;
    backgroundColor: string;
    textColor: string;
  };
}
export const updateEventCalendar = async (data: IUpdateEventCalendar) => {
  try {
    const response = await api.put(UPDATE_EVENT_CALENDAR, data);
    return response.data;
  } catch (err) {
    return err;
  }
};
