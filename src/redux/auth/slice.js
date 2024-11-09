import { createSlice } from '@reduxjs/toolkit';
import { register, login, logout } from './operations';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {
      _id: null,
      token: null,
      name: null,
      email: null,
      theme: 'light',
      avatar: null,
    },

    isLoggedIn: false,
    isRefreshing: false,
  },
  extraReducers: builder => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = {
          name: action.payload.data.name,
          email: action.payload.data.email,
          theme: action.payload.data.theme,
          avatar: action.payload.data.avatar,
          _id: action.payload.data._id,
        };
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(login.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, state => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
      });
    // .addCase(refreshUser.pending, state => {
    //   state.isRefreshing = true;
    // })
    // .addCase(refreshUser.fulfilled, (state, action) => {
    //   state.user = action.payload;
    //   state.isLoggedIn = true;
    //   state.isRefreshing = false;
    // })
    // .addCase(refreshUser.rejected, state => {
    //   state.isRefreshing = false;
    // });
  },
});

export const authReducer = authSlice.reducer;
