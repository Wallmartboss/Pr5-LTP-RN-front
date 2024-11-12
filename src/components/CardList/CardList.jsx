import { useSelector } from 'react-redux';
import s from './CardList.module.css';
import {
  selectCardsByColumnId,
  selectColumnsByBoardId,
} from '../../redux/cards/selectors.js';
import { selectSelectedBoard } from '../../redux/cards/selectors.js';

import Card from '../Card/Card.jsx';



const CardList = ({ columnId }) => {

  const cards = useSelector(state => selectCardsByColumnId(state, columnId));
  const selectedBoard = useSelector(selectSelectedBoard);
  const boardId = selectedBoard?._id;
  const columns = useSelector(state => {
    return selectColumnsByBoardId(state, boardId);
});
    const filteredColumns = columns.filter(column => column._id !== columnId);
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
            filteredColumns={filteredColumns}
  
          />
        ))
      )}
    </div>
  );
};

export default CardList;
