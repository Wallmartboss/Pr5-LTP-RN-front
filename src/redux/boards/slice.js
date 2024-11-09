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
  columns: [],
  isModalOpen: false,
  isFiltersOpen: false,
  selectedFilter: {
    none: true,
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
    openModal(state, action) {
      state.isModalOpen = true;
    },
    closeModal(state, action) {
      state.isModalOpen = false;
    },
    addColumn(state, action) {
      state.columns.push({ id: Date.now(), title: action.payload });
    },
    toggleFilter(state, action) {
      const { value, checked } = action.payload;
      state.selectedFilter[value] = checked;
    },
    selectAllFilters(state, action) {
      state.selectedFilter = {
        none: true,
        low: true,
        medium: true,
        high: true,
      };
    },
    toggleFiltersOpen(state, action) {
      state.isFiltersOpen = !state.isFiltersOpen;
    },
    openEditModal(state, action) {
      state.isEditModalOpen = true;
      state.columnToEdit = action.payload;
    },
    closeEditModal(state, action) {
      state.isEditModalOpen = false;
      state.columnToEdit = null;
    },
    editColumnTitle(state, action) {
      const { id, newTitle } = action.payload;
      const column = state.columns.find(column => column.id === id);
      if (column) column.title = newTitle;
    },
    openDeleteModal(state, action) {
      state.isDeleteModalOpen = true;
      state.columnToDelete = action.payload;
    },
    openDeleteBoardModal(state, action) {
      state.isDeleteModalOpen = true;
      state.boardToDelete = action.payload;
    },
    closeDeleteModal(state, action) {
      state.isDeleteModalOpen = false;
      state.columnToDelete = null;
    },
    closeDeleteBoardModal(state, action) {
      state.isDeleteModalOpen = false;
      state.boardToDelete = null;
    },
    // deleteColumn(state, action) {
    //   state.columns = state.columns.filter(
    //     column => column.id !== state.columnToDelete.id
    //   );
    //   state.isDeleteModalOpen = false;
    //   state.columnToDelete = null;
    // },
    deleteColumn(state, action) {
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
    // fetchBoards(state, action) {
    //   state.items = action.payload;
    //   state.loading = false;
    // },
    // addBoard(state, action) {
    //   state.items.push(action.payload);
    // },
    // updateBoard(state, action) {
    //   const index = state.items.findIndex(
    //     board => board.id === action.payload.id
    //   );
    //   if (index !== -1) {
    //     state.items[index] = action.payload;
    //   }
    // },
    // deleteBoard(state, action) {
    //   state.items = state.items.filter(board => board.id !== action.payload);
    // },
    selectBoard(state, action) {
      state.selectedBoard = action.payload;
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
        if (
          state.selectedBoard &&
          state.selectedBoard._id === updatedBoard._id
        ) {
          state.selectedBoard = updatedBoard;
        }
      })
      .addCase(updateBoard.rejected, (state, action) => {
        console.error('Update board failed:', action.payload);
      })
      .addCase(addBoard.fulfilled, (state, action) => {
        state.items.push(action.payload); // добавляем новую доску в массив
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
    // .addCase(deleteColumn.fulfilled, (state, action) => {
    //   const { boardId, columnId } = action.payload;
    //   const board = state.items.find(board => board._id === boardId);
    //   if (board) {
    //     board.columns = board.columns.filter(col => col._id !== columnId);
    //   }
    // });
  },
});

export const {
  openModal,
  closeModal,
  addColumn,
  toggleFilter,
  selectAllFilters,
  toggleFiltersOpen,
  openEditModal,
  closeEditModal,
  editColumnTitle,
  openDeleteModal,
  openDeleteBoardModal,
  closeDeleteBoardModal,
  closeDeleteModal,
  deleteColumn,
  // fetchBoards,
  // addBoard,
  // updateBoard,
  // deleteBoard,
  selectBoard,
} = boardsSlice.actions;
export const boardsReducer = boardsSlice.reducer;
