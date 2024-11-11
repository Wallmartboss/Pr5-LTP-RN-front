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
        none: true,
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
  },
  extraReducers: builder => {
    builder
      .addCase(fetchColumns.pending, (state) => {
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
      .addCase(addColumn.pending, (state) => {
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
      .addCase(editColumnTitle.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(editColumnTitle.fulfilled, (state, action) => {
        const updatedColumn = action.payload;
        state.columns = state.columns.map((column) =>
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
        // Видаляємо колонку зі списку в Redux після успішного видалення з бази даних
        state.columns = state.columns.filter(column => column._id !== action.payload._id);
      })
      .addCase(deleteColumn.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        // Обробка помилки
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
  removeColumnFromList, // Експорт нового екшену
} = columnsSlice.actions;

export const columnsReducer = columnsSlice.reducer;
