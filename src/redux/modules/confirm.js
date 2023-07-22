import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: 'initial content',
  isOpenAlarm: false,
};

const confirmSlice = createSlice({
  name: 'confirm',
  initialState,
  reducers: {
    openAlarm: (state, action) => {
      return { message: action.payload.message, isOpenAlarm: action.payload.isOpenAlarm, alarmType: action.payload.alarmType };
    },
    openConfirmAlarm: (state, action) => {
      return { message: action.payload.message, isOpenAlarm: action.payload.isOpenAlarm, buttonActions: action.payload.buttonActions, alarmType: action.payload.alarmType };
    },
    closeAlarm: (state, action) => {
      return {
        message: 'initial content',
        isOpenAlarm: false,
      };
    },
  },
});

export const { openAlarm, closeAlarm, openConfirmAlarm } = confirmSlice.actions;
export default confirmSlice.reducer;
