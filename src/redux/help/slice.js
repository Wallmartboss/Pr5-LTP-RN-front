// import { createReducer } from '@reduxjs/toolkit';
// import {
//   sendHelpRequestStart,
//   sendHelpRequestSuccess,
//   sendHelpRequestFailure,
// } from './operations';

// const initialState = {
//   loading: false,
//   error: null,
// };

// const helpReducer = createReducer(initialState, builder => {
//   builder
//     .addCase(sendHelpRequestStart, state => {
//       state.loading = true;
//       state.error = null;
//     })
//     .addCase(sendHelpRequestSuccess, state => {
//       state.loading = false;
//     })
//     .addCase(sendHelpRequestFailure, (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     });
// });

// export default helpReducer;

import { createSlice } from '@reduxjs/toolkit';
import { sendHelpRequest } from './operations';

const helpSlice = createSlice({
  name: 'help',
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(sendHelpRequest.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendHelpRequest.fulfilled, state => {
        state.loading = false;
        state.error = null;
      })
      .addCase(sendHelpRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default helpSlice.reducer;
