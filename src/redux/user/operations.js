import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://pr5-ltp-rn-back.onrender.com';

export const updateUser = createAsyncThunk(
  'user/update',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.patch('/users/info/', userData, {
        headers: {
          Authorization: `Bearer gyZfzVWGxxGDW5TOHoVFNYlpyIjUzUTtentA+Cid`,
        },
      });
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
      const response = await axios.patch('/users/theme/', userTheme, {
        headers: {
          Authorization: `Bearer gyZfzVWGxxGDW5TOHoVFNYlpyIjUzUTtentA+Cid`,
        },
      });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
