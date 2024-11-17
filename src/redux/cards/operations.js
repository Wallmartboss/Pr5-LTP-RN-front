import { createAsyncThunk } from '@reduxjs/toolkit';
// import instance from '../../instance';
import axios from 'axios';
import { addCard as addCardAction } from '../columns/slice';

// axios.defaults.baseURL = 'https://pr5-ltp-rn-back.onrender.com';

export const addCard = createAsyncThunk(
  'cards/add_Card',
  async ({ newCard }, thunkAPI) => {
    try {
      const response = await axios.post('/cards', newCard);
      console.log('Card created successfully:', response.data.data);
      return response.data.data;
    } catch (error) {
      console.error('Error creating card:', error);
      // Можна додати action для обробки помилок, якщо це потрібно
      return thunkAPI.rejectWithValue(error.message); // Повертаємо помилку для обробки в reducer
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
      console.log('Card updated successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating card:', error);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
// export const editCard = createAsyncThunk(
//   'cards/editCard',
//   async ({ id, updatedCard }, thunkApi) => {
//     try {
//       const response = await instance.put(`/cards/${id}`, updatedCard);
//       return response.data;
//     } catch (error) {
//       return thunkApi.rejectWithValue(error.message);
//     }
//   }
// );

// ======================

export const fetchCards = createAsyncThunk(
  'cards/fetchCards',
  async ({ boardId }, thunkAPI) => {
    try {
      const response = await axios.get(`/cards/${boardId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const deleteCard = createAsyncThunk(
  'cards/delete_Card',
  async (cardId, thunkAPI) => {
    console.log('Sending AsyncThunk DELETE request for cardId:', cardId);
    try {
      // Перевірка cardId
      await axios.delete(`/cards/${cardId}`); // Видаляємо картку за cardId
      return cardId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// export const moveCard = createAsyncThunk(
//   'cards/moveCard',
//   async ({ cardId, newColumnId, boardId }, { rejectWithValue }) => {
//     try {
//       const response = await axios.patch(`/cards/move/${cardId}`, { newColumnId, boardId });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

export const moveCard = createAsyncThunk(
  'cards/move_Card',
  async ({ cardId, columnId, newColumnId, boardId }, thunkApi) => {
    try {
      console.log('Attempting to move card:', { cardId, columnId, boardId }); // Debugging line
      const response = await axios.patch(`/cards/move/${cardId}`, {
        columnId,
        newColumnId,
        boardId,
      });
      console.log('Card moved successfully:', response.data);
      console.log('Card.data moved successfully:', response.data.data);
      return response.data.card;
    } catch (error) {
      console.error('Error moving card:', error);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
