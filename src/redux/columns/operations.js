import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://pr5-ltp-rn-back.onrender.com/';

export const fetchColumns = createAsyncThunk(
  'boards/fetchColumns',
  async (boardId, thunkAPI) => {
    try {
      const response = await axios.get(`/columns/${boardId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data.message || 'Failed to fetch columns'
      );
    }
  }
);

export const addColumn = createAsyncThunk(
  'boards/addColumn',
  async ({ boardId, title }, thunkAPI) => {
    try {
      const response = await axios.post(`/columns/${boardId}`, { title });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data.message || 'Failed to add a new column'
      );
    }
  }
);

export const editColumnTitle = createAsyncThunk(
  'boards/editColumnTitle',
  async ({ columnId, newTitle }, thunkAPI) => {
    try {
      const response = await axios.patch(`/columns/${columnId}`, {
        title: newTitle,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data.message || 'Failed to edit the column'
      );
    }
  }
);

export const deleteColumn = createAsyncThunk(
  'boards/deleteColumn',
  async (columnId, thunkAPI) => {
    try {
      const response = await axios.delete(`/columns/${columnId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data.message || 'Failed to delete the column'
      );
    }
  }
);
