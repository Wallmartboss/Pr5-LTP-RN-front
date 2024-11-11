// import { createSelector } from 'reselect';
export const selectColumns = state => state.columns.columns;
// const selectColumnsData = state => state.boards.columns;
// export const selectColumns = createSelector(
//   [selectColumnsData],
//   columns => columns
// );
export const selectIsModalOpen = state => state.boards.isModalOpen;
export const selectSelectedFilter = state => state.boards.selectedFilter;
export const selectIsFiltersOpen = state => state.boards.isFiltersOpen;
export const selectEditModalOpen = state => state.boards.isEditModalOpen;
export const selectColumnToEdit = state => state.boards.columnToEdit;
export const selectIsDeleteModalOpen = state => state.boards.isDeleteModalOpen;
export const selectColumnToDelete = state => state.boards.columnToDelete;
export const selectBoards = state => state.boards?.items || [];
export const selectSelectedBoard = state => state.boards?.selectedBoard || null;
