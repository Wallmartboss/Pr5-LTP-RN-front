import { createAsyncThunk } from '@reduxjs/toolkit';
// import instance from '../../instance';
import axios from 'axios';


axios.defaults.baseURL = 'https://pr5-ltp-rn-back.onrender.com';

export const addCard = createAsyncThunk(
  'cards/addCard',
  async ({ newCard }, thunkApi) => {
    try {
      const response = await axios.post('/cards', newCard);
      console.log(response.data);

      return response.data;
    } catch (error) {
      console.error('API call failed:', error);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
export const editCard = createAsyncThunk(
  'cards/editCard',
  async ({ boardId, updatedCard, cardId }, thunkApi) => {
    try {
      const response = await axios.patch(`/cards/${cardId}`, { ...updatedCard, boardId });
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

// export const addCard = createAsyncThunk(
//   'cards/addCard',
//   async ({ title, description, priority, boardId, columnId, }, thunkAPI) => {
//       try {
//           console.log("Request payload:", { boardId, columnId, title, description, priority });

//           const response = await axios.post(
//               '/cards',
//               { title, description, priority, boardId, columnId }
//           );
//           return response.data;
//       } catch (error) {
//           console.error("Error response:", error.response);
//           return thunkAPI.rejectWithValue(error.response.data.message);
//       }
//   }
// );

export const deleteCard = createAsyncThunk(
  'cards/deleteCard',
  async ({ cardId }, { rejectWithValue }) => {
    try {
      await axios.delete(`/cards/${cardId}`);
      return cardId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const moveCard = createAsyncThunk(
  'cards/moveCard',
  async ({ cardId, columnId }, { rejectWithValue }) => {
    try {
      await axios.patch(`/cards/move/${cardId}`, { columnId });
      return { cardId, columnId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
