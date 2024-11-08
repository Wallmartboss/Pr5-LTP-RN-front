import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://pr5-ltp-rn-back.onrender.com';
//'http://localhost:3000';

// Utility to add JWT
export const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Utility to remove JWT
const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

/*
 * POST @ /users/signup
 * body: { name, email, password }
 */
export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      console.log('Sending registration data:', credentials);
      const res = await axios.post('/auth/register', credentials);
      // console.log('Registration response:', res.data);
      // console.log('Received token:', res.data.data.accessToken);
      // console.log('Received token v2:', res.data.accessToken);
      setAuthHeader(res.data.token);
      console.log('You have successfully registered!');
      return res.data;
    } catch (error) {
      console.error('Registration error:', error);
      const status = error.response?.status || 409;
      const message = error.response?.data?.message || 'Registration failed';
      return thunkAPI.rejectWithValue({ status, message });
    }
  }
);

/*
 * POST @ /users/login
 * body: { email, password }
 */
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post('/auth/login', credentials);

      const token = res.data.data.accessToken;
      console.log('Received token:', token);
      if (!token) {
        console.error('Token is missing in the response:', res.data);
        return thunkAPI.rejectWithValue('Token is missing in the response');
      }

      setAuthHeader(token);
      localStorage.setItem('token', token);
      return res.data;
    } catch (error) {
      console.error('Authorization error:', error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
/*
 * POST @ /users/logout
 * headers: Authorization: Bearer token
 */
export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.post('/auth/logout');
    // After a successful logout, remove the token from the HTTP header
    localStorage.removeItem('token');
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

/*
 * GET @ /users/current
 * headers: Authorization: Bearer token
 */
export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    // Reading the token from the state via getState()
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      // If there is no token, exit without performing any request
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      setAuthHeader(persistedToken);
      const res = await axios.get('/users/current');
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
