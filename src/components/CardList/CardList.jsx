import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import s from './CardList.module.css';
import {
  selectCardsByColumnId,
  selectColumnsByBoardId,
} from '../../redux/columns/selectors.js';
import { selectSelectedBoard } from '../../redux/boards/selectors.js';
import { moveCard } from '../../redux/cards/operations.js';
import Card from '../Card/Card.jsx';
import { toggleDropdown } from '../../redux/cards/cardsSlice.js';
import {
  selectAllPriorityFilter,
  selectSelectAll,
} from '../../redux/filters/selectors';

const CardList = ({ columnId }) => {
  const dispatch = useDispatch();

  // Отримуємо всі картки колонки
  const cards = useSelector(state => selectCardsByColumnId(state, columnId));

  // Отримуємо інформацію про фільтри пріоритету
  const priorityFilter = useSelector(selectAllPriorityFilter);
  const selectAll = useSelector(selectSelectAll);

  // Фільтруємо картки за пріоритетом
  const filteredCards = selectAll
    ? cards
    : cards.filter(card => priorityFilter[card.priority]);

  const selectedBoard = useSelector(selectSelectedBoard);
  const boardId = selectedBoard?._id;
  const columns = useSelector(state => selectColumnsByBoardId(state, boardId));
  const filteredColumns = columns.filter(column => column._id !== columnId);
  const openDropdowns = useSelector(state => state.cards.openDropdowns);

  console.log('All cards for column:', cards);
  console.log('Filtered cards for column:', filteredCards);

  const handleMoveCard = (newColumnId, cardId) => {
    if (cardId && newColumnId && newColumnId !== columnId) {
      dispatch(moveCard({ cardId, columnId: newColumnId, boardId }));
      dispatch(toggleDropdown(cardId));
    }
  };

  const toggleDropdownHandler = cardId => {
    dispatch(toggleDropdown(cardId));
  };

  return (
    <div className={s.cardsContainer}>
      {filteredCards.length === 0 ? (
        <p>No cards available in this column.</p>
      ) : (
        filteredCards.map(card => (
          <Card
            key={card._id}
            card={card}
            columnId={columnId}
            handleMoveCard={handleMoveCard}
            openDropdowns={openDropdowns}
            filteredColumns={filteredColumns}
            toggleDropdown={toggleDropdownHandler}
          />
        ))
      )}
    </div>
  );
};

export default CardList;
