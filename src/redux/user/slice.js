import { createSlice } from '@reduxjs/toolkit';
import { updateTheme, updateUser } from './operations';

const initialState = {
  name: null,
  email: null,
  theme: null,
  loading: false,
  error: null,
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
        state.loading = false;
        state.error = null;

        state.name = action.payload.data.name;
        state.email = action.payload.data.email;
        state.theme = action.payload.data.theme;
      })
      .addCase(updateUser.rejected, handleRejected)
      .addCase(updateTheme.pending, handlePending)
      .addCase(updateTheme.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        state.theme = action.payload.data.theme;
      })
      .addCase(updateTheme.rejected, handleRejected);
  },
});
export const userReducer = userSlice.reducer;
