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
        `/boards?owner=${userId}`,
        { title: boardName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const updateBoard = createAsyncThunk(
  'boards/updateBoard',
  async ({ boardId, updatedTitle, token }, thunkAPI) => {
    try {
      const { data } = await axios.patch(
        `/boards/${boardId}`,
        { title: updatedTitle },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error) {
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
      return boardId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
