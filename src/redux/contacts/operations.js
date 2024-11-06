import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

axios.defaults.baseURL = 'https://pr5-ltp-rn-back.onrender.com';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/contacts');
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contact, thunkAPI) => {
    try {
      const response = await axios.post('/contacts', contact);
      if (response.status === 200 || response.status === 201) {
        toast.success('Contact was successfully added');
        return response.data;
      }
    } catch (e) {
      toast.error('Failed to add contact');
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`/contacts/${id}`);
      if (response.status === 200 || response.status === 201) {
        toast.success('Contact was successfully deleted');
        return response.data;
      }
    } catch (e) {
      toast.error('Failed to delete contact');
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
