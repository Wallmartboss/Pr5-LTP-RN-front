
import { createSelector } from '@reduxjs/toolkit';
export const selectAllCards = state => {
  const selectedBoard = state.boards.selectedBoard;
  if (selectedBoard) {
    return selectedBoard.columns.flatMap(column => column.cards);
  }
  return [];
};

export const selectCardById = (state, columnId, cardId) => {
  const column = state.columns.columns.find(column => column._id === columnId);
  if (column) {
    return column.cards.find(card => card._id === cardId);
  }
  return null;
};

export const selectCardsLoading = state => state.cards.loading;
export const selectCardsError = state => state.cards.error;

const selectBoardCards = state => state.cards;
export const selectCards = createSelector([selectBoardCards], cards => {
  return cards.filter(card => card.isVisible);
});

export const selectCardsByBoardId = (state, boardId) => {
  return state.cards.items.filter(card => card.boardId === boardId);
};

export const selectSelectedBoard = state => state.boards.selectedBoard;

export const selectColumnsByBoardId = (state, boardId) => {
  return (
    state.columns?.columns?.filter(column => column.boardId === boardId) || []
  );
};

export const selectIsAddModalOpen = state => state.cards.isAddModalOpen;
export const selectIsModalOpen = state => state.cards.isModalOpen;
export const selectExpandedCardId = state => state.cards.expandedCardId;
export const selectOpenDropdowns = state => state.cards.openDropdowns;
export const selectCardToDelete = state => state.cardId;


