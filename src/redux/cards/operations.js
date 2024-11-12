import { createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../instance';
import axios from 'axios';
import { addCard as addCardAction } from '../columns/slice';

axios.defaults.baseURL = 'https://pr5-ltp-rn-back.onrender.com';

export const addCard = createAsyncThunk(
  'cards/addCard',
  async (newCard, thunkAPI) => {
    try {
      const response = await axios.post('/cards', newCard);
      console.log('Card created successfully:', response.data);
      if (response.status === 201) {
        // Якщо картка успішно створена, додаємо її в стан
        thunkAPI.dispatch(addCardAction(response.data.data)); // Використовуємо thunkAPI.dispatch
      } else {
        throw new Error('Failed to create card');
      }
    } catch (error) {
      console.error('Error creating card:', error);
      // Можна додати action для обробки помилок, якщо це потрібно
      return thunkAPI.rejectWithValue(error.message); // Повертаємо помилку для обробки в reducer
    }
  }
);

export const editCard = createAsyncThunk(
  'cards/editCard',
  async ({ boardId, updatedCard }, thunkApi) => {
    try {
      const response = await instance.put(`/cards/${boardId}`, updatedCard);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

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
    console.log('Sending DELETE request for cardId:', cardId);
    try {
      // Перевірка cardId
      await axios.delete(`/cards/${cardId}`); // Видаляємо картку за cardId
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
      return { cardId, columnId }; // Повертаємо ID картки і колонку, куди її перемістили
    } catch (error) {
      return rejectWithValue(error.message); // Помилка при переміщенні
    }
  }
);
