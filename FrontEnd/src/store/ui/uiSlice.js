import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isDateModalOpen: false,
};

// Redux Toolkit permite escribir código mutante del State, 
// pero se encarga de generar un nuevo State, que es lo que se hace con React
 
export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: { 
    onOpenDateModal: (state) => {
        state.isDateModalOpen = true;
    },
    onCloseDateModal: (state) => {
        state.isDateModalOpen = false;
    },
  },
})

export const { onOpenDateModal, onCloseDateModal } = uiSlice.actions;