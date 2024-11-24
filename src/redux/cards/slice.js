
import { createSlice } from '@reduxjs/toolkit';

const cardsSlice = createSlice({
  name: 'cards',
  initialState: {
    expandedCardId: null,
  },
  reducers: {
    toggleDescription(state, action) {
      console.log('Payload:', action.payload);
      console.log('Current expandedCardId:', state.expandedCardId);
      state.expandedCardId =
        state.expandedCardId === action.payload ? null : action.payload;
        console.log('Updated expandedCardId:', state.expandedCardId);
    },
  },
});

export const {
  toggleDescription,
} = cardsSlice.actions;

export default cardsSlice.reducer;