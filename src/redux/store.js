import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import doctorReducer from './doctor/doctorSlice';
import reservationReducer from './reservation/reservationSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    doctor: doctorReducer,
    reservation: reservationReducer,
  },
});

export default store;
