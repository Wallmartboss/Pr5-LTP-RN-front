import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    selectAll: true,
    priority: {
      without: false,
      low: false,
      medium: false,
      high: false,
    },
  },
  reducers: {
    togglePriorityFilter(state, action) {
      const { priorityLevel } = action.payload;
      state.priority[priorityLevel] = !state.priority[priorityLevel];
      state.selectAll = !Object.values(state.priority).some(value => value);
    },
    selectAllPriorities(state, action) {
      state.selectAll = true;
      state.priority = {
        without: true,
        low: true,
        medium: true,
        high: true,
      };
    },
  },
});

export const { togglePriorityFilter, selectAllPriorities } =
  filtersSlice.actions;

export default filtersSlice.reducer;
