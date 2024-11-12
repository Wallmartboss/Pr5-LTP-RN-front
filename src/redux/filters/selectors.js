import { createSelector } from 'reselect';

const selectRawCards = (state, columnId) => state.cards[columnId] || [];
export const selectAllPriorityFilter = state => state.filters.priority;
export const selectSelectAll = state => state.filters.selectAll;

export const selectFilteredCardsForColumn = createSelector(
  [selectRawCards, selectAllPriorityFilter, selectSelectAll],
  (cards, priorityFilter, selectAll) => {
    if (selectAll) {
      return cards;
    }

    const activeFilters = Object.keys(priorityFilter).filter(
      level => priorityFilter[level]
    );

    const filteredCards = cards.filter(card =>
      activeFilters.includes(card.priority)
    );

    return filteredCards;
  }
);
