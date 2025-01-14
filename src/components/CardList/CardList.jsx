
import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import s from './CardList.module.css';
import {
  selectCardsByColumnId,

} from '../../redux/columns/selectors.js';
import { selectSelectedBoard } from '../../redux/boards/selectors.js';
import { fetchBoardById } from '../../redux/boards/operations.js';
import Card from '../Card/Card.jsx';
import {
  selectAllPriorityFilter,
  selectSelectAll,
} from '../../redux/filters/selectors.js';

const CardList = ({ columnId }) => {
  const dispatch = useDispatch();
  const cards = useSelector(state => selectCardsByColumnId(state, columnId));
  const priorityFilter = useSelector(selectAllPriorityFilter);
  const selectAll = useSelector(selectSelectAll);
  const filteredCards = selectAll
    ? cards
    : cards.filter(card => priorityFilter[card.priority]);
  const token = localStorage.getItem('token');
  const selectedBoard = useSelector(selectSelectedBoard);
  const boardId = selectedBoard?._id;
  console.log('boardId:', boardId);
  useEffect(() => {
    if (selectedBoard?._id) {
      dispatch(fetchBoardById({ boardId: selectedBoard._id, token }));
    }
  }, [dispatch, selectedBoard?._id, token]);



  return (
    <div className={s.cardsContainer}>
      {filteredCards.length === 0 ? (
        <p className={s.text}>No cards available in this column.</p>
      ) : (
        filteredCards.map(card => (
          <Card
            key={card._id}
            card={card}
            columnId={columnId}
          />
        ))
      )}
    </div>
  );
};

export default CardList;