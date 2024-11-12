import { useSelector } from 'react-redux';
import s from './CardList.module.css';
import {
  selectCardsByColumnId,
  selectColumnsByBoardId,

} from '../../redux/columns/selectors.js';
import { selectSelectedBoard } from '../../redux/boards/selectors.js';
import { moveCard } from '../../redux/cards/operations.js';

import Card from '../Card/Card.jsx';



const CardList = ({ columnId }) => {

  const cards = useSelector(state => selectCardsByColumnId(state, columnId));
  const selectedBoard = useSelector(selectSelectedBoard);
  const boardId = selectedBoard?._id;
  const columns = useSelector(state => {
    return selectColumnsByBoardId(state, boardId);

    const filteredColumns = columns.filter(column => column._id !== columnId);

  });
  const filteredColumns = columns.filter(column => column._id !== columnId);
  const openDropdowns = useSelector(state => state.cards.openDropdowns);
  // console.log('Cards for column:', columnId, cards);
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
      {cards.length === 0 ? (
        <p>No cards available in this column.</p>
      ) : (
        cards.map((card, index) => (
          <Card
            key={card._id || `card-${index}`}
            card={card}

            columnId={columnId}
            handleMoveCard={handleMoveCard}
            openDropdowns={openDropdowns}

            filteredColumns={filteredColumns}
  
          />
        ))
      )}
    </div>
  );
};

export default CardList;
