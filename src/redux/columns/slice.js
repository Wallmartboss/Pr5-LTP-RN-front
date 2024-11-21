import { createSlice } from '@reduxjs/toolkit';
import {
  addCard,
  deleteCard,
  editCard,
  fetchCards,
} from '../cards/operations';
import {
  fetchColumns,
  addColumn,
  editColumnTitle,
  deleteColumn,
} from './operations';

const initialState = {
  columns: [],
  isModalOpen: false,
  isFiltersOpen: false,
  selectedFilter: {
    without: false,
    low: false,
    medium: false,
    high: false,
  },
  isEditModalOpen: false,
  isDeleteModalOpen: false,
  columnToEdit: null,
  columnToDelete: null,
  isLoading: false,
  isError: null,
};

const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    openModal(state) {
      state.isModalOpen = true;
    },
    closeModal(state) {
      state.isModalOpen = false;
    },
    toggleFilter(state, action) {
      const { value, checked } = action.payload;
      state.selectedFilter[value] = checked;
    },
    selectAllFilters(state) {
      state.selectedFilter = {
        without: true,
        low: true,
        medium: true,
        high: true,
      };
    },
    toggleFiltersOpen(state) {
      state.isFiltersOpen = !state.isFiltersOpen;
    },
    openEditModal(state, action) {
      state.isEditModalOpen = true;
      state.columnToEdit = action.payload;
    },
    closeEditModal(state) {
      state.isEditModalOpen = false;
      state.columnToEdit = null;
    },
    openDeleteModal(state, action) {
      state.isDeleteModalOpen = true;
      state.columnToDelete = action.payload;
    },
    closeDeleteModal(state) {
      state.isDeleteModalOpen = false;
      state.columnToDelete = null;
    },
    // Новий екшен для видалення колонки зі списку у Redux
    removeColumnFromList(state, action) {
      state.columns = state.columns.filter(
        column => column._id !== action.payload
      );
    },
    // removeCardFromList(state, action) {
    //   state.columns.cards = state.columns.cards.filter(
    //     card => card._id !== action.payload
    //   );
    // },
    // addCard(state, action) {
    //   const { columnId, card } = action.payload;
    //   const column = state.columns.find(col => col._id === columnId);
    //   if (column) {
    //     console.log('Column, куди додаємо:', column);
    //     console.log('Card, яку додаэмо:', card);
    //     column.cards.push(card); // Додаємо картку до відповідної колонки
    //     state.columns = [...state.columns]; // Это триггерит ререндер в некоторых случаях
    //   } else {
    //     console.error('Column not found:', columnId);
    //   }
    // },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchColumns.pending, state => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(fetchColumns.fulfilled, (state, action) => {
        console.log('Fetched columns:', action.payload);
        state.columns = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchColumns.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload || 'Error fetching columns';
      })
      .addCase(addColumn.pending, state => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(addColumn.fulfilled, (state, action) => {
        const newColumn = action.payload;
        state.columns.push(newColumn);
        if (state.selectedBoard && state.selectedBoard.columns) {
          state.selectedBoard.columns.push(newColumn); // Додаємо нову колонку в `selectedBoard`
        }
        state.isLoading = false;
      })
      .addCase(addColumn.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload || 'Error adding column';
      })
      .addCase(editColumnTitle.pending, state => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(editColumnTitle.fulfilled, (state, action) => {
        const updatedColumn = action.payload;
        state.columns = state.columns.map(column =>
          column._id === updatedColumn._id ? updatedColumn : column
        );
        state.isLoading = false;
      })

      .addCase(editColumnTitle.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload || 'Error editing column';
      })
      .addCase(deleteColumn.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteColumn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.columns = state.columns.filter(
          column => column._id !== action.payload._id
        );
      })
      .addCase(deleteColumn.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(addCard.fulfilled, (state, action) => {
        state.isLoading = false;
        const column = state.columns.find(
          col => col._id === action.payload.columnId
        );

        if (column) {
          column.cards.push(action.payload);
        }
        // state.allColumns = state.columns;
      })
      .addCase(addCard.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addCard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      /* -- */
      .addCase(editCard.fulfilled, (state, action) => {
        const { _id, columnId, title, description, date, priority } = action.payload.data;
      
        const oldColumn = state.columns.find(col => 
          col.cards.some(card => card._id === _id)
        );
      
        if (oldColumn) {
          const cardIndex = oldColumn.cards.findIndex(card => card._id === _id);
      
          if (cardIndex !== -1) {
            const card = oldColumn.cards[cardIndex];
      
            if (card.columnId === columnId) {
              oldColumn.cards[cardIndex] = {
                ...card,
                title,
                description,
                date,
                priority,
              };
              return;
            }
      
            oldColumn.cards.splice(cardIndex, 1);
          }
        }
      
        const newColumn = state.columns.find(col => col._id === columnId);
      
        if (newColumn) {
          newColumn.cards.push({
            _id,
            title,
            description,
            date,
            priority,
            columnId,
          });
        }
      })
      .addCase(editCard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(editCard.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCard.fulfilled, (state, action) => {
        const cardIdToRemove = action.payload;
        state.columns = state.columns.map(column => ({
          ...column,
          cards: column.cards.filter(card => card._id !== cardIdToRemove),
        }));
      })
      .addCase(deleteCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.loading = false;
        const newCards = action.payload.data;

        state.columns.items = [
          ...state.columns.items,
          ...newCards.filter(
            newCard =>
              !state.cards.some(
                existingCard => existingCard._id === newCard._id
              )
          ),
        ];
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  // addCard,
  openModal,
  closeModal,
  toggleFilter,
  selectAllFilters,
  toggleFiltersOpen,
  openEditModal,
  closeEditModal,
  openDeleteModal,
  closeDeleteModal,
  removeColumnFromList,
  // removeCardFromList,
} = columnsSlice.actions;

export const columnsReducer = columnsSlice.reducer;
