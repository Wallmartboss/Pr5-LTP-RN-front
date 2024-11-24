
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const addCard = createAsyncThunk(
  'cards/add_Card',
  async ({ newCard }, thunkAPI) => {
    try {
      const response = await axios.post('/cards', newCard);
      console.log('Card created successfully:', response.data.data);
      return response.data.data;
    } catch (error) {
      console.error('Error creating card:', error);
      return thunkAPI.rejectWithValue(error.message); 
    }
  }
);

export const editCard = createAsyncThunk(
  'cards/edit_Card',

  async ({ boardId, updatedCard, cardId }, thunkApi) => {
    try {
      const response = await axios.patch(`/cards/${cardId}`, {
        ...updatedCard,
        boardId,
      });
      console.log('Request payload:', {
        ...updatedCard,
        boardId,
      });
      console.log('Card updated successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating card:', error);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const deleteCard = createAsyncThunk(
  'cards/delete_Card',
  async (cardId, thunkAPI) => {
    console.log('Sending AsyncThunk DELETE request for cardId:', cardId);
    try {
      await axios.delete(`/cards/${cardId}`); 
      return cardId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// export const fetchCards = createAsyncThunk(
//   'cards/fetchCards',
//   async ({ boardId }, thunkAPI) => {
//     try {
//       const response = await axios.get(`/cards/${boardId}`);
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || error.message
//       );
//     }
//   }
// );