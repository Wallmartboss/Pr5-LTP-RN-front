import { createSelector } from '@reduxjs/toolkit';

// Вибірка всіх колонок
export const selectColumns = state => state.columns.columns;

// Мемоїзовані селектори для колонок за boardId
export const selectColumnsByBoardId = createSelector(
  [selectColumns, (state, boardId) => boardId], // Вхідні параметри: state і boardId
  (columns, boardId) => columns.filter(column => column.boardId === boardId) || []
);

// Мемоїзовані селектори для карток за columnId
export const selectCardsByColumnId = createSelector(
  [selectColumns, (state, columnId) => columnId], // Вхідні параметри: state і columnId
  (columns, columnId) => {
    const column = columns.find(column => column._id === columnId);
    return column ? column.cards : [];
  }
);

// Інші прості селектори
export const selectIsModalOpen = state => state.columns.isModalOpen;
export const selectSelectedFilter = state => state.columns.selectedFilter;
export const selectIsFiltersOpen = state => state.columns.isFiltersOpen;
export const selectEditModalOpen = state => state.columns.isEditModalOpen;
export const selectColumnToEdit = state => state.columns.columnToEdit;
export const selectIsDeleteModalOpen = state => state.columns.isDeleteModalOpen;
export const selectColumnToDelete = state => state.columns.columnToDelete;
export const selectIsLoading = state => state.columns.isLoading;
export const selectIsError = state => state.columns.isError;

// Мемоїзовані селектори для карток за boardId
export const selectCardsByBoardId = createSelector(
  [selectColumns],
  (columns) => columns.flatMap(column => column.cards) // Об'єднуємо всі картки з усіх колонок
);

