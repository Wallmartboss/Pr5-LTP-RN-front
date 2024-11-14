import { createSelector } from '@reduxjs/toolkit';
import { selectSelectedBoard } from '../boards/selectors.js';

export const selectColumns = state => state.columns.columns;

// export const selectColumnsByBoardId = createSelector(
//   [selectColumns, (state, boardId) => boardId],
//   (columns, boardId) => columns.filter(column => column.boardId === boardId) || [];
//   console.log('Columns for board: from selector', columns);
// );

export const selectColumnsByBoardId = createSelector(
  [selectColumns, (state, boardId) => boardId],
  (columns, boardId) => columns.filter(column => column.boardId === boardId)
);
export const selectCardsByColumnId = createSelector(
  [selectColumns, (state, columnId) => columnId], // Вхідні параметри: state і columnId
  (columns, columnId) => {
    const column = columns.find(column => column._id === columnId);
    return column ? column.cards : [];
  }
);

export const selectIsModalOpen = state => state.columns.isModalOpen;
export const selectSelectedFilter = state => state.columns.selectedFilter;
export const selectIsFiltersOpen = state => state.columns.isFiltersOpen;
export const selectEditModalOpen = state => state.columns.isEditModalOpen;
export const selectColumnToEdit = state => state.columns.columnToEdit;
export const selectIsDeleteModalOpen = state => state.columns.isDeleteModalOpen;
export const selectColumnToDelete = state => state.columns.columnToDelete;
export const selectIsLoading = state => state.columns.isLoading;
export const selectIsError = state => state.columns.isError;

export const selectCardsByBoardId = createSelector([selectColumns], columns =>
  columns.flatMap(column => column.cards)
);



export const allColumnsByBoard = (state) => state.columns.columns;


export const selectColumnsForSelectedBoard = (state) => {
  const selectedBoard = selectSelectedBoard(state);
  return selectedBoard ? selectedBoard.columns : [];  
};