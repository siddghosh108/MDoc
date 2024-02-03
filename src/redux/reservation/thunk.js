import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const bearerToken = localStorage.getItem('bearerToken');
const headers = { Authorization: bearerToken };

const url = 'http://127.0.0.1:3000/';

export const fetchReservations = createAsyncThunk('reservations/fetchReservations', async (userId, thunkAPI) => {
  try {
    const response = await axios.get(`${url}/users/${userId}/reservations`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const createReservation = createAsyncThunk(
  'reservations/createReservation',
  async ({ data }, thunkAPI) => {
    window.location.reload();
    try {
      const response = await axios.post(
        'http://127.0.0.1:3000/appointment',
        data,
        {
          headers,
        },
      );
      window.location.reload();
      thunkAPI.dispatch(fetchReservations());
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
);

export const cancelReservation = createAsyncThunk('reservations/cancelReservation', async (reservationId, thunkAPI) => {
  try {
    await axios.delete(`${url}/reservations/${reservationId}`);
    return reservationId;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
