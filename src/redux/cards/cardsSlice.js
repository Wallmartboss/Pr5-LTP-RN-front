import { createSlice } from '@reduxjs/toolkit';

const cardsSlice = createSlice({
  name: 'cards',
  initialState: {
    // items: [],
    isLoading: false,
    error: null,
    openDropdowns: {},
    expandedCardId: null,
    isModalOpen: false,
    cardIdToDelete: null,
  },
  reducers: {
    openDropdown: (state, action) => {
      const {cardId} = action.payload;
      state.openDropdowns[cardId] = true; 
  },
  closeDropdown: (state, action) => {
      const cardId = action.payload;

      state.openDropdowns[cardId] = false; 
  },

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


        state.items = [
          ...state.items,
          ...newCards.filter(
            newCard =>
              !state.items.some(
                existingCard => existingCard._id === newCard._id
              )
          ),
        ];
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addCard.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addCard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload);
        console.log('Updated Cards:', action.payload); // Логування оновленого масиву карток
      })
      .addCase(editCard.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editCard.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.items.findIndex(
          card => card._id === action.payload._id
        );
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(editCard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteCard.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCard.fulfilled, (state, action) => {
        const cardId = action.meta.arg.cardId;
        state.items = state.items.filter(card => card._id !== cardId);
        state.loading = false;
      })
      .addCase(deleteCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(moveCard.pending, state => {
        state.status = 'loading';
      })
      .addCase(moveCard.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { cardId, columnId } = action.payload;
        const index = state.items.findIndex(card => card._id === cardId);
        if (index !== -1) {
          state.items[index].columnId = columnId;
        }
      })
      .addCase(moveCard.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// export const {

  // .addCase(addCard.fulfilled, (state, action) => {
  //   state.isLoading = false;
  //   state.items = state.items.push(action.payload);
  //   console.log('Updated Cards:', state.items); // Логування оновленого масиву карток
  // })
  // Додавання картки
  // },
//});

export const {
  // addCard,
  toggleDropdown,

  toggleDescription,
  openModal,
  closeModal,
  openDropdown,
  closeDropdown,
} = cardsSlice.actions;


export const selectCardIdToDelete = (state) => state.cards.cardIdToDelete;


export default cardsSlice.reducer;
