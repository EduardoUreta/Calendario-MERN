import { Navbar } from "../components/Navbar"

import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { getMessagesEs, localizer } from "../../helpers";
import { useState } from "react";
import { CalendarEvent, AddNewEvent, CalendarModal, DeleteEvent } from "../components";
import { useCalendarStore, useUiStore } from "../../hooks";

export const CalendarPage = () => {

  const [ lastView, setLastView ] = useState(localStorage.getItem("lastView") || 'week');
  const { openDateModal } = useUiStore();
  const { events, setActiveEvent } = useCalendarStore();

  const eventStyleGetter = () => {
    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    };
    return {
      style
    }
  };

  const onDoubleClick = () => {
    openDateModal();
  };

  const onSelect = (e) => {
    setActiveEvent(e);
  };

  const onViewchange = (e) => {
    localStorage.setItem('lastView', e);
  };

  return (
    <>
      <Navbar/>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
        culture="es"
        messages={getMessagesEs()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewchange}
        defaultView={lastView}
      />

      <CalendarModal/>
      <AddNewEvent/>
      <DeleteEvent/>
    </>
  )
}
