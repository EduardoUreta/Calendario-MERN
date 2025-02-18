import { Navbar } from "../components/Navbar"

import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { addHours } from "date-fns"
import { getMessagesEs, localizer } from "../../helpers";
import { CalendarEvent } from "../components/CalendarEvent";
import { useState } from "react";
import { CalendarModal } from "../components";

const events = [{
  title: "Cumpleaños del Jefe",
  notes: 'Comprar el paste',
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: '#fafafa',
  user: {
    _id: '123',
    name: 'Fernando'
  }
}];


export const CalendarPage = () => {

  const [ lastView, setLastView ] = useState(localStorage.getItem("lastView") || 'week');

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

  const onDoubleClick = (e) => {
    console.log({doubleClick: e});
    
  };

  const onSelect = (e) => {
    console.log({select: e});
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
    </>
  )
}
