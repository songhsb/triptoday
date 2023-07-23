import { configureStore } from '@reduxjs/toolkit';
import confirm from '../modules/confirm';

const store = configureStore({
  reducer: {
    confirm,
  },
});

export default store;
