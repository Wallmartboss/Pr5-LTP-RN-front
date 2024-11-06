import { createSlice } from '@reduxjs/toolkit';

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
  columnToEdit: null,
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
    toggleFiltersOpen: state => {
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
} = boardsSlice.actions;
export const boardsReducer = boardsSlice.reducer;
