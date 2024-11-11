import { createSlice } from '@reduxjs/toolkit';
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
    none: false,
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
    openModal(state, action) {
      state.isModalOpen = true;
    },
    closeModal(state, action) {
      state.isModalOpen = false;
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
    openDeleteModal(state, action) {
      state.isDeleteModalOpen = true;
      state.columnToDelete = action.payload;
    },
    closeDeleteModal(state, action) {
      state.isDeleteModalOpen = false;
      state.columnToDelete = null;
    },
    deleteColumn(state, action) {
      state.columns = state.columns.filter(
        column => column.id !== state.columnToDelete.id
      );
      state.isDeleteModalOpen = false;
      state.columnToDelete = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchColumns.pending, (state, action) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(fetchColumns.fulfilled, (state, action) => {
        state.columns = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchColumns.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload || 'Error fetching columns';
      })
      .addCase(addColumn.pending, (state, action) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(addColumn.fulfilled, (state, action) => {
        state.columns.push(action.payload);
        state.isLoading = false;
      })
      .addCase(addColumn.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload || 'Error adding column';
      })
      .addCase(editColumnTitle.pending, (state, action) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(editColumnTitle.fulfilled, (state, action) => {
        const updatedColumn = action.payload;
        console.log('Updated column:', updatedColumn);
        if (!updatedColumn) {
          console.error('No updated column data found!');
          return;
        }

        // Обновляем колонку в массиве items внутри columns
        state.columns.items = state.columns.items.map(column =>
          column._id === updatedColumn._id ? updatedColumn : column
        );

        // Если колонка была выбрана, обновляем выбранную колонку
        if (
          state.columns.columnToEdit &&
          state.columns.columnToEdit._id === updatedColumn._id
        ) {
          state.columns.columnToEdit = updatedColumn;
        }

        // Дополнительно, если существует state.selectedColumn, обновляем её
        if (
          state.selectedColumn &&
          state.selectedColumn._id === updatedColumn._id
        ) {
          state.selectedColumn = updatedColumn;
        }
      })
      .addCase(editColumnTitle.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload || 'Error editing column';
      })
      .addCase(deleteColumn.pending, (state, action) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(deleteColumn.fulfilled, (state, action) => {
        state.columns.filter(column => column.id !== action.payload.id);
        state.isLoading = false;
      })
      .addCase(deleteColumn.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload || 'Error deleting column';
      });
  },
});

export const {
  openModal,
  closeModal,
  toggleFilter,
  selectAllFilters,
  toggleFiltersOpen,
  openEditModal,
  closeEditModal,
  openDeleteModal,
  closeDeleteModal,
} = columnsSlice.actions;
export const columnsReducer = columnsSlice.reducer;
