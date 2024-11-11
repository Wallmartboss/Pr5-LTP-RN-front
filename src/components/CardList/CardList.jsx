import { useDispatch, useSelector } from 'react-redux';
import s from './CardList.module.css';
import {
  selectCardsByColumnId,
  selectColumnsByBoardId,
} from '../../redux/cards/selectors.js';
import { selectSelectedBoard } from '../../redux/cards/selectors.js';
import {  moveCard } from '../../redux/cards/operations.js';
import Card from '../Card/Card.jsx';
import { toggleDropdown } from '../../redux/cards/cardsSlice.js';

const CardList = ({ columnId }) => {
  const dispatch = useDispatch();
  const cards = useSelector(state => selectCardsByColumnId(state, columnId));
  const selectedBoard = useSelector(selectSelectedBoard);
  const boardId = selectedBoard?._id;
  const columns = useSelector(state => {
    return selectColumnsByBoardId(state, boardId);
});
    const filteredColumns = columns.filter(column => column._id !== columnId);
    const openDropdowns = useSelector(state => state.cards.openDropdowns);

  const handleMoveCard = (newColumnId, cardId) => {
    if (cardId && newColumnId && newColumnId !== columnId) {
      dispatch(moveCard({ cardId, columnId: newColumnId, boardId }));
      dispatch(toggleDropdown(cardId));
    }
  };

  const toggleDropdownHandler = (cardId) => {
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
