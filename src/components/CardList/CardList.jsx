import { useDispatch, useSelector } from 'react-redux';

import s from './CardList.module.css';
import {
  selectCardsByColumnId,
  selectColumnsByBoardId,
} from '../../redux/cards/selectors.js';
import { selectSelectedBoard } from '../../redux/cards/selectors.js';
import { useEffect } from 'react';
import { deleteCard, moveCard } from '../../redux/cards/operations.js';
import Card from '../Card/Card.jsx';
import { toggleDropdown, updateToday } from '../../redux/cards/cardsSlice.js';
import { useMemo } from 'react';

const CardList = ({ columnId }) => {
  const dispatch = useDispatch();
  const cards = useSelector(state => selectCardsByColumnId(state, columnId));
  const selectedBoard = useSelector(selectSelectedBoard);
  const boardId = selectedBoard?._id;
  const columns = useSelector(state => selectColumnsByBoardId(state, boardId));
  const today = useSelector(state => state.cards.today);

  const openDropdowns = useSelector(state => state.cards.openDropdowns);
  //   const filteredColumns = columns.filter(column => column._id !== columnId);
  const filteredColumns = useMemo(() => {
    return columns.filter(column => column._id !== columnId);
  }, [columns, columnId]);
  const handleDelete = cardId => {
    dispatch(deleteCard({ cardId }));
  };

  const handleMoveCard = (newColumnId, cardId) => {
    if (cardId && newColumnId && newColumnId !== columnId) {
      dispatch(moveCard({ cardId, columnId: newColumnId, boardId }));
      dispatch(toggleDropdown(cardId));
    }
  };

  const isDeadlineToday = deadline => {
    const deadlineDate = new Date(deadline);
    const currentDate = new Date(today);
    currentDate.setHours(0, 0, 0, 0);
    deadlineDate.setHours(0, 0, 0, 0);
    return currentDate.getTime() === deadlineDate.getTime();
  };

  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       dispatch(updateToday());
  //     }, 60000);
  //     return () => clearInterval(interval);
  //   }, [dispatch]);
  useEffect(() => {
    if (cards.length > 0) {
      dispatch(updateToday());
    }
  }, [cards, dispatch]);
  const toggleDropdownHandler = cardId => {
    dispatch(toggleDropdown(cardId));
  };

  return (
    <div className={s.cardsContainer}>
      {cards.length === 0 ? (
        <p>No cards available in this column.</p>
      ) : (
        cards.map(card => (
          <Card
            key={card._id}
            card={card}
            columnId={columnId}
            handleMoveCard={handleMoveCard}
            handleDelete={handleDelete}
            isDeadlineToday={isDeadlineToday}
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
