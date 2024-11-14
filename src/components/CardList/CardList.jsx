
import { useDispatch, useSelector } from 'react-redux';
import s from './CardList.module.css';
import {selectCardsByColumnId} from '../../redux/columns/selectors.js';


import Card from '../Card/Card.jsx';
import { toggleDropdown } from '../../redux/cards/cardsSlice.js';
import {
  selectAllPriorityFilter,
  selectSelectAll,
} from '../../redux/filters/selectors.js';

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

 




  const toggleDropdownHandler = cardId => {
    dispatch(toggleDropdown(cardId));
  };

  return (
    <div className={s.cardsContainer}>
      {filteredCards.length === 0 ? (
        <p>No cards available in this column.</p>
      ) : (
        filteredCards.map(card => (
          // cards.map((card, index) => (

          <Card
            key={card._id}
            card={card}
            columnId={columnId}
      toggleDropdown={toggleDropdownHandler}
          />
        ))
      )}
    </div>
  );
};

export default CardList;
