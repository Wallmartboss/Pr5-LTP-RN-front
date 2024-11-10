import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://pr5-ltp-rn-back.onrender.com';

export const fetchBoards = createAsyncThunk(
  'boards/fetchAll',
  async ({ userId, token }, thunkAPI) => {
    try {
      const { data } = await axios.get(`/boards?owner=${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log('Fetched data:', data);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addBoard = createAsyncThunk(
  'boards/addBoard',
  async ({ userId, boardName, token }, thunkAPI) => {
    try {
      const { data } = await axios.post(
        '/boards',
        { title: boardName, owner: userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Adding board :', data);
      return data;
    } catch (error) {
      console.error('Error adding board:', error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const updateBoard = createAsyncThunk(
  'boards/updateBoard',
  async ({ boardId, updatedTitle, token }, thunkAPI) => {
    try {
      console.log('boardId:', boardId, 'updatedTitle:', updatedTitle);
      const { data } = await axios.patch(
        `/boards/${boardId}`,
        { title: updatedTitle },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Server response after update:', data);
      return data;
    } catch (error) {
      console.error('Error while updating board:', error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const deleteBoard = createAsyncThunk(
  'boards/deleteBoard',
  async ({ boardId, token }, thunkAPI) => {
    try {
      await axios.delete(`/boards/${boardId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return { boardId };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const fetchBoardById = createAsyncThunk(
  'boards/fetchBoardById',
  async ({ boardId, token }, thunkAPI) => {
    try {
      if (!token) {
        throw new Error('Token is missing');
      }
      console.log('Fetching board with token:', token);

      const response = await axios.get(`/boards/${boardId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Fetched board:', response.data);
      return response.data;
    } catch (error) {
      console.error('Fetch board error:', error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
