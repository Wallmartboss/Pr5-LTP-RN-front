import { createSlice } from '@reduxjs/toolkit';
import { updateTheme, updateUser } from './operations';
import { logout } from '../auth/operations.js';

const initialState = {
  _id: '',
  name: '',
  email: '',
  theme: null,
  loading: false,
  error: null,
  avatar: '',
};

const handlePending = state => {
  state.loading = true;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(updateUser.pending, handlePending)
      .addCase(updateUser.fulfilled, (state, action) => {
        console.log(action);
        state.loading = false;
        state.error = null;
        state._id = action.payload.data._id;
        state.name = action.payload.data.name;
        state.email = action.payload.data.email;
        state.avatar = action.payload.data.avatar;
      })
      .addCase(updateUser.rejected, handleRejected)
      .addCase(updateTheme.pending)
      .addCase(updateTheme.fulfilled, (state, action) => {
        state.error = null;

        state.theme = action.payload.data.theme;
      })
      .addCase(updateTheme.rejected, handleRejected)
      .addCase(logout.fulfilled, () => initialState);
  },
});
export const { setUserData } = userSlice.actions;
export const userReducer = userSlice.reducer;
