import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { createAction } from '@reduxjs/toolkit';

// axios.defaults.baseURL = 'https://pr5-ltp-rn-back.onrender.com';

export const sendHelpRequest = createAsyncThunk(
  'help/sendHelpRequest',
  async (data, thunkAPI) => {
    try {
      const response = await axios.post('/help', data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to send help request'
      );
    }
  }
);
