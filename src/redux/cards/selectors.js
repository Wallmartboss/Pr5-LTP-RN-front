import { createSelector } from '@reduxjs/toolkit';
export const selectAllCards = state => state.items.cards;
export const selectCardById = (state, cardId) =>
  state.cards.items.find(card => card._id === cardId);
export const selectCardsLoading = state => state.cards.loading;
export const selectCardsError = state => state.cards.error;
const selectBoardCards = state => state.cards;

export const selectCards = createSelector([selectBoardCards], cards => {
  return cards.filter(card => card.isVisible);
});

// export const selectCards = (state) => state.cards.items;

export const selectCardsByBoardId = (state, boardId) => {
  return state.cards.items.filter(card => card.boardId === boardId);
};

export const selectCardsByColumnId = (state, columnId) =>
  state.cards.items.filter(card => card.columnId === columnId);

// ============

// +

export const selectSelectedBoard = state => state.boards.selectedBoard;

export const selectColumnsByBoardId = (state, boardId) => {
  return (
    state.columns?.items?.filter(column => column.boardId === boardId) || []
  );
};

export const selectIsAddModalOpen = state => state.cards.isAddModalOpen;

export const selectExpandedCardId = state => state.cards.expandedCardId;
export const selectIsModalOpen = state => state.cards.isModalOpen;
export const selectOpenDropdowns = state => state.cards.openDropdowns;
