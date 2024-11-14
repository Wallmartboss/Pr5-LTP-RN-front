import { createSlice } from '@reduxjs/toolkit';
import {
  fetchBoards,
  fetchBoardById,
  updateBoard,
  addBoard,
  deleteBoard,
} from './operations';

const initialState = {
  items: [],
  selectedBoard: null,
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
  boardToDelete: null,
  loading: false,
  error: null,
};

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    openModal(state) {
      state.isModalOpen = true;
    },
    closeModal(state) {
      state.isModalOpen = false;
    },
    addColumn(state, action) {
      const selectedBoard = state.items.find(
        board => board._id === state.selectedBoard
      );
      if (selectedBoard) {
        selectedBoard.columns.push({
          _id: Date.now(),
          title: action.payload,
          cards: [],
        });
      }
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
    addCardToColumn(state, action) {
      console.log('Payload:', action.payload);
      console.log('Current State:', state);
      const { boardId, columnId, card } = action.payload;
      const board = state.items.find(board => board._id === boardId);
      if (board) {
        const column = board.columns.find(col => col._id === columnId);
        if (column) {
          column.cards.push(card);
        }
      }
    },

    toggleFiltersOpen(state) {
      state.isFiltersOpen = !state.isFiltersOpen;
    },
    openEditModalBoard(state, action) {
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
    openDeleteBoardModal(state, action) {
      state.isDeleteModalOpen = true;
      state.boardToDelete = action.payload;
    },
    closeDeleteModal(state) {
      state.isDeleteModalOpen = false;
      state.columnToDelete = null;
    },
    closeDeleteBoardModal(state) {
      state.isDeleteModalOpen = false;
      state.boardToDelete = null;
    },
    deleteColumn(state) {
      const board = state.items.find(
        board => board._id === state.selectedBoard
      );
      if (board) {
        board.columns = board.columns.filter(
          column => column._id !== state.columnToDelete._id
        );
      }
      state.isDeleteModalOpen = false;
      state.columnToDelete = null;
    },
    selectBoard(state, action) {
      state.selectedBoard = action.payload;
    },

    removeCardFromColumn(state, action) {
      const { boardId, columnId, cardId } = action.payload;
      const board = state.items.find(board => board._id === boardId);
      if (board) {
        const column = board.columns.find(col => col._id === columnId);
        if (column) {
          column.cards = column.cards.filter(card => card._id !== cardId); // Видаляємо картку
        }
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchBoards.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBoards.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchBoards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchBoardById.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBoardById.fulfilled, (state, action) => {
        state.loading = false;
        if (state.selectedBoard?._id !== action.payload._id) {
          state.selectedBoard = action.payload;
        }
      })
      .addCase(fetchBoardById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateBoard.fulfilled, (state, action) => {
        const updatedBoard = action.payload.data;
        state.items = state.items.map(board =>
          board._id === updatedBoard._id ? updatedBoard : board
        );
        if (state.selectedBoard?._id === updatedBoard._id) {
          state.selectedBoard = updatedBoard;
        }
      })
      .addCase(updateBoard.rejected, (state, action) => {
        console.error('Update board failed:', action.payload);
      })
      .addCase(addBoard.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(addBoard.rejected, (state, action) => {
        console.error('Add board failed:', action.payload);
      })
      .addCase(deleteBoard.fulfilled, (state, action) => {
        state.items = state.items.filter(
          board => board._id !== action.payload.boardId
        );
      })
      .addCase(deleteBoard.rejected, (state, action) => {
        console.error('Delete board failed:', action.payload);
      });
  },
});

export const {
  openModal,
  closeModal,
  addColumn,
  toggleFilter,
  selectAllFilters,
  toggleFiltersOpen,
  openEditModalBoard,
  closeEditModal,
  openDeleteModal,
  openDeleteBoardModal,
  closeDeleteBoardModal,
  closeDeleteModal,
  deleteColumn,
  selectBoard,
  addCardToColumn,
  removeCardFromColumn,
} = boardsSlice.actions;

export const boardsReducer = boardsSlice.reducer;
