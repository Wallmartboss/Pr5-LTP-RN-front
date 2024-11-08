import { createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../instance';

export const addCard = createAsyncThunk(
  'cards/addCard',
  async (newCard, thunkApi) => {
    try {
      const response = await instance.post('/cards', newCard);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);