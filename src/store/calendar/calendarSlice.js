import { createSlice } from '@reduxjs/toolkit'
import { addHours } from 'date-fns';

const initialState = {
  events: [
        {
            _id: new Date().getTime(),
            title: "Cumpleaños del Jefe",
            notes: 'Comprar el paste',
            start: new Date(),
            end: addHours(new Date(), 2),
            bgColor: '#fafafa',
            user: {
            _id: '123',
            name: 'Fernando'
            }
        }
    ],
  activeEvent: null
};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: { 
    onSetActiveEvent: (state, { payload }) => {
        state.activeEvent = payload;
    },
  },
})

export const { onSetActiveEvent } = calendarSlice.actions;