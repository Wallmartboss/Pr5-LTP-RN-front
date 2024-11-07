import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://pr5-ltp-rn-back.onrender.com';

export const getUser = createAsyncThunk('user/update', async (_, thunkAPI) => {
  try {
    const response = await axios.get('/users/current/');
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

export const updateUser = createAsyncThunk(
  'user/update',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.patch('/users/info/', userData);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const updateTheme = createAsyncThunk(
  'user/updateTheme',
  async (userTheme, thunkAPI) => {
    try {
      const response = await axios.patch('/users/theme/', userTheme);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
