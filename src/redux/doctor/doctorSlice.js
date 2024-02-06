import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const bearerToken = localStorage.getItem('bearerToken');
const headers = { Authorization: bearerToken };

export const createDoctor = createAsyncThunk(
  'doctor/createDoctor',
  async (doctorData) => {
    try {
      const response = await axios.post(
        'https://mdoc-backend.onrender.com/doctors',
        doctorData,
        {
          headers,
        },
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
);

export const fetchDoctors = createAsyncThunk(
  'doctor/fetchDoctors',
  async () => {
    try {
      const response = await axios.get('https://mdoc-backend.onrender.com/doctors/', {
        headers,
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
);

export const fetchDoctorById = createAsyncThunk(
  'doctor/fetchDoctorById',
  async (doctorId) => {
    try {
      const bearerToken = localStorage.getItem('bearerToken');
      const headers = { Authorization: bearerToken };
      const response = await axios.get(
        `https://mdoc-backend.onrender.com/doctors/${doctorId}`,
        { headers },
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
);

export const deleteDoctor = createAsyncThunk(
  'doctor/deleteDoctor',
  async (doctorId) => {
    try {
      await axios.delete(`https://mdoc-backend.onrender.com/doctors/${doctorId}`, {
        headers,
      });
      return doctorId;
    } catch (error) {
      throw error.response.data;
    }
  },
);

const doctorSlice = createSlice({
  name: 'doctor',
  initialState: { doctors: null, status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createDoctor.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.doctors = action.payload;
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.doctors = action.payload;
      })
      .addCase(fetchDoctorById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.doctors = action.payload;
      })
      .addCase(deleteDoctor.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.doctors = state.doctors.filter(
          (doctor) => doctor.id !== action.payload,
        );
      })
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.status = 'loading';
        },
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        },
      );
  },
});

export const selectDoctors = (state) => (state.doctor ? state.doctor.doctors : []);
export const selectStatus = (state) => state.doctor.status;
export const selectError = (state) => state.doctor.error;

export default doctorSlice.reducer;
