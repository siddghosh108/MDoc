import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

export const signUpUser = createAsyncThunk('user/signUp', async (userData) => {
  // console.log(userData)
  try {
    const response = await axios.post('http://localhost:3000/auth/signup', userData);
    toast.success('User created successfully');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});
export const signInUser = createAsyncThunk('user/signIn', async (userData) => {
  try {
    const response = await axios.post('http://localhost:3000/auth/login', userData);
    return response.data.status.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      throw new Error('Invalid email or password. Please try again.');
    } else {
      throw new Error('An unexpected error occurred. Please try again later.');
    }
  }
});

export const selectCurrentUser = (state) => !!state.user.user;

const userSlice = createSlice({
  name: 'user',
  initialState: { user: null, status: 'idle', error: null },
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;

        const username = `${action.payload.data.first_name} ${action.payload.data.last_name}`;
        localStorage.setItem('username', username);
        localStorage.setItem('jwt_token', action.payload.data.jti);
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;

        const username = `${action.payload.firstName} ${action.payload.lastName}`;
        localStorage.setItem('username', username);
        localStorage.setItem('jwt_token', action.payload.jwt_token);
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

export const selectUser = (state) => state.user.user;
export const selectStatus = (state) => state.user.status;
export const selectError = (state) => state.user.error;

export default userSlice.reducer;
export const { logout } = userSlice.actions;
