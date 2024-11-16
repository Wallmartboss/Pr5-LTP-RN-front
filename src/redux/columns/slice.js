import { createSlice } from '@reduxjs/toolkit';
import {
  addCard as addCardOperation,
  deleteCard as deleteCardOperation,
  editCard as editCardOperation,
  fetchCards,
  moveCard,
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
    removeCardFromList(state, action) {
      state.columns.cards = state.columns.cards.filter(
        card => card._id !== action.payload
      );
    },
    addCard(state, action) {
      const { columnId, card } = action.payload;
      const column = state.columns.find(col => col._id === columnId);
      if (column) {
        console.log('Column, куди додаємо:', column);
        console.log('Card, яку додаэмо:', card);
        column.cards.push(card); // Додаємо картку до відповідної колонки
        state.columns = [...state.columns]; // Это триггерит ререндер в некоторых случаях
      } else {
        console.error('Column not found:', columnId);
      }
    },
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
      .addCase(addCardOperation.fulfilled, (state, action) => {
        state.isLoading = false;
        const column = state.columns.find(
          col => col._id === action.payload.columnId
        );

        if (column) {
          column.cards.push(action.payload);
        }
        // state.allColumns = state.columns;
      })
      .addCase(addCardOperation.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addCardOperation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      /* -- */
      .addCase(editCardOperation.fulfilled, (state, action) => {
        const { _id, columnId, title, description, date, priority } =
          action.payload.data;

        const column = state.columns.find(col => col._id === columnId);

        if (column) {
          const cardIndex = column.cards.findIndex(card => card._id === _id);

          if (cardIndex !== -1) {
            column.cards[cardIndex] = {
              _id,
              title,
              description,
              date,
              priority,
              columnId,
            };
          }
        }
      })
      .addCase(editCardOperation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(editCardOperation.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCardOperation.fulfilled, (state, action) => {
        const cardIdToRemove = action.payload;
        state.columns = state.columns.map(column => ({
          ...column,
          cards: column.cards.filter(card => card._id !== cardIdToRemove),
        }));
      })
      .addCase(deleteCardOperation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCardOperation.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(moveCard.pending, state => {
        state.status = 'loading';
      })
      /*=======*/
      // .addCase(moveCard.fulfilled, (state, action) => {
      //   state.status = 'succeeded';
      //   const { cardId, columnId, newColumnId, boardId } = action.payload;

      //   // Знаходимо колонку, в якій наразі знаходиться картка, та видаляємо її з цієї колонки
      //   // state.columns = state.columns.map(column => {
      //   //   if (column.cards.some(card => card._id === cardId)) {
      //   //     return {
      //   //       ...column,
      //   //       cards: column.cards.filter(card => card._id !== cardId),
      //   //     };
      //   //   }
      //   //   return column;
      //   // });

      //   const sourceColumn = state.columns.find(
      //     column => column._id === columnId
      //   );
      //   if (sourceColumn) {
      //     sourceColumn.cards = sourceColumn.cards.filter(
      //       card => card._id !== cardId
      //     );
      //   }

      //   // Додаємо картку до нової колонки
      //   const targetColumn = state.columns.find(
      //     column => column._id === newColumnId
      //   );
      //   if (targetColumn) {
      //     const movedCard = { ...action.payload };
      //     console.log(movedCard);
      //     targetColumn.cards = [...targetColumn.cards, movedCard];
      //   }
      // })
      /*=========*/
      .addCase(moveCard.fulfilled, (state, action) => {
        const {
          _id: cardId,
          columnId: newColumnId,
          boardId,
          ...movedCard
        } = action.payload;

        // Видалення картки зі старої колонки
        state.columns = state.columns.map(column => ({
          ...column,
          cards: column.cards.filter(card => card._id !== cardId), // Видаляємо картку з попередньої колонки
        }));

        // Додавання картки в нову колонку
        const targetColumn = state.columns.find(
          column => column._id === newColumnId
        );
        if (targetColumn) {
          targetColumn.cards = [...targetColumn.cards, movedCard]; // Додаємо переміщену картку
        }
      })

      /*=========*/
      // .addCase(moveCard.fulfilled, (state, action) => {
      //   state.status = 'succeeded';
      //   const { cardId, columnId } = action.payload;
      //   console.log('payload', action.payload);
      //   const index = state.columns.findIndex(card => card._id === cardId);
      //   if (index !== -1) {
      //     state.items[index].columnId = columnId;
      //   }
      // })
      .addCase(moveCard.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
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
  addCard,
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
  removeCardFromList,
} = columnsSlice.actions;

export const columnsReducer = columnsSlice.reducer;
