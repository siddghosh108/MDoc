import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import doctorReducer from './doctor/doctorSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    doctor: doctorReducer,
  },
});

export default store;
