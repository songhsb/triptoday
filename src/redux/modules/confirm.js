import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  content: 'initial content',
  isOpenAlarm: false,
};

const confirmSlice = createSlice({
  name: 'confirm',
  initialState,
  reducers: {
    openAlarm: (state, action) => {
      return { content: action.payload.content, isOpenAlarm: action.payload.isOpenAlarm, next: action.payload.next, alarmType: action.payload.alarmType };
    },
    closeAlarm: (state, action) => {
      return {
        content: 'initial content',
        isOpenAlarm: false,
      };
    },
  },
});

export const { ask } = confirmSlice.actions;
export default confirmSlice.reducer;
