import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const bearerToken = localStorage.getItem('bearerToken');
const headers = { Authorization: bearerToken };

const url = 'https://mdoc-backend.onrender.com/';

export const fetchReservations = createAsyncThunk(
  'reservations/fetchReservations',
  async () => {
    try {
      const response = await axios.get(
        `${url}/appointments`,
        { headers },
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
);

export const createReservation = createAsyncThunk(
  'reservations/createReservation',
  async ({ data }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${url}/appointments`,
        data,
        {
          headers,
        },
      );
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
