import { createSlice } from '@reduxjs/toolkit'
import { addHours } from 'date-fns';

const initialState = {
  events: [
        // {
        //     _id: new Date().getTime(),
        //     title: "Cumpleaños del Jefe",
        //     notes: 'Comprar el paste',
        //     start: new Date(),
        //     end: addHours(new Date(), 2),
        //     bgColor: '#fafafa',
        //     user: {
        //     _id: '123',
        //     name: 'Fernando'
        //     }
        // }
    ],
  activeEvent: null,
  isLoadingEvent: true,
};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: { 
    onSetActiveEvent: (state, { payload }) => {
        state.activeEvent = payload;
    },
    onAddNewEvent: (state, { payload }) => {
        state.events.push(payload);
        state.activeEvent = null;
    },
    onUpdateEvent: (state, { payload }) => {
        state.events = state.events.map(event => {
            if(event._id === payload._id) {
                return payload;
            }
            return event
        });
    },
    onDeleteEvent: (state) => {
        if(state.activeEvent) {
            state.events = state.events.filter( event => event._id !== state.activeEvent._id );
            state.activeEvent = null;
        }
    },
    onLoadEvents: (state, { payload }) => {
        state.isLoadingEvent = false;
        payload.forEach(event => {
            const exists = state.events.some( dbEvent => dbEvent._id === event._id);
            if(!exists) {
                state.events.push(event)
            }
        });
    },
    onLogoutCalendar: (state) => {
        state.isLoadingEvent = true,
        state.events = [],
        state.activeEvent = null;
    }
  },
})

export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar } = calendarSlice.actions;