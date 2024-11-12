import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
axios.defaults.baseURL = 'https://pr5-ltp-rn-back.onrender.com';

export const fetchColumns = createAsyncThunk(
  'columns/fetchColumns',
  async (boardId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/columns/${boardId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addColumn = createAsyncThunk(
  'columns/addColumn',
  async ({ boardId, title, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `/columns/${boardId}`,
        { title },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editColumnTitle = createAsyncThunk(
  'columns/editColumnTitle',
  async ({ columnId, newTitle, token }, { rejectWithValue }) => { // Use newTitle here
    try {
      const response = await axios.patch(
        `/columns/${columnId}`,
        { title: newTitle }, // Send newTitle as title in the payload
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const deleteColumn = createAsyncThunk(
  'columns/deleteColumn',
  async ({ columnId, token }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/columns/${columnId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
