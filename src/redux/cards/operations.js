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

export const editCard = createAsyncThunk(
  'cards/editCard',
  async ({ id, updatedCard }, thunkApi) => {
    try {
      const response = await instance.put(`/cards/${id}`, updatedCard);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);