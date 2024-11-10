import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://pr5-ltp-rn-back.onrender.com/';

// export const fetchColumns = createAsyncThunk(
//   'boards/fetchColumns',
//   async (boardId, thunkAPI) => {
//     try {
//       const response = await axios.get(`/columns/${boardId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data.message || 'Failed to fetch columns'
//       );
//     }
//   }
// );

// export const fetchColumns = createAsyncThunk(
//   'boards/fetchColumns',
//   async (boardId, thunkAPI) => {
//     try {
//       const response = await axios.get(`/columns/${boardId}`);
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data.message || 'Failed to fetch columns'
//       );
//     }
//   }
// );
export const fetchColumns = createAsyncThunk(
  'boards/fetchColumns',
  async (boardId, thunkAPI) => {
    if (!boardId) {
      return thunkAPI.rejectWithValue('Board ID is required');
    }
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
  async ({ boardId, title, token }, thunkAPI) => {
    try {
      const response = await axios.post(
        `/columns/${boardId}`,
        { title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Adding column :', response.data);
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
  async ({ columnId, newTitle, token }, thunkAPI) => {
    try {
      console.log('columnId:', columnId);
      console.log('Token:', token);
      const response = await axios.patch(
        `/columns/${columnId}`,
        { title: newTitle },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Server response after editing column:', response.data);
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
