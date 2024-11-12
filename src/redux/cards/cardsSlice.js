import { createSlice } from '@reduxjs/toolkit';

const cardsSlice = createSlice({
  name: 'cards',
  initialState: {
    isLoading: false,
    error: null,
    openDropdowns: {},
    expandedCardId: null,
    isModalOpen: false,
    cardIdToDelete: null,
  },
  reducers: {
    toggleDropdown: (state, action) => {
      const cardId = action.payload;
      state.openDropdowns = Object.keys(state.openDropdowns).reduce(
        (acc, key) => {
          acc[key] = false;
          return acc;
        },
        {}
      );
      state.openDropdowns[cardId] = !state.openDropdowns[cardId];
    },
    closeDropdown(state, action) {
      const cardId = action.payload;
      state.openDropdowns[cardId] = false;
    },

    toggleDescription(state, action) {
      state.expandedCardId =
        state.expandedCardId === action.payload ? null : action.payload;
    },
    openModal(state, action) {
      state.isModalOpen = true;
      state.cardIdToDelete = action.payload;
    },
    closeModal(state) {
      state.isModalOpen = false;
      state.cardIdToDelete = null;
    },
    // addCard(state, action) {
    //   state.items.push(action.payload); // Додаємо картку до масиву карток
    // },
  },
  // extraReducers: builder => {
  //   builder;

  // .addCase(addCard.fulfilled, (state, action) => {
  //   state.isLoading = false;
  //   state.items = state.items.push(action.payload);
  //   console.log('Updated Cards:', state.items); // Логування оновленого масиву карток
  // })
  // Додавання картки
  // },
});

export const {
  // addCard,
  toggleDropdown,
  toggleDescription,
  openModal,
  closeModal,
  closeDropdown,
} = cardsSlice.actions;

export const selectCardIdToDelete = state => state.cards.cardIdToDelete;

export default cardsSlice.reducer;
