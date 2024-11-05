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
      state.columns.push({ title: action.payload });
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
  },
});

export const {
  openModal,
  closeModal,
  addColumn,
  toggleFilter,
  selectAllFilters,
  toggleFiltersOpen,
} = boardsSlice.actions;
export const boardsReducer = boardsSlice.reducer;
