import s from './Dropdown.module.css';
import sprite from '../../icons/icons.svg';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { editCard } from '../../redux/cards/operations.js';

const Dropdown = ({
  boardId, card, onClose,
  isOpen,
  filteredColumns,
  // handleMoveCard,
  // onClose,
  // cardId,
  // columnId,
  // boardId,
}) => {
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  if (!isOpen) return null;

  const handleColumnClick = newColumnId => {
    const updateData = {
      columnId: newColumnId,
      title: card.title,
      description: card.description,
      priority: card. priority,
      date: card.date,
    };
    console.log('cardId:', card._id); // Дебаг
    console.log('updateData:', updateData); // Дебаг
    dispatch(editCard({ boardId, cardId: card._id, updatedCard: updateData }));
    onClose();
  }

  // const handleColumnClick = newColumnId => {
  //   handleMoveCard(cardId, columnId, newColumnId, boardId); // Передаємо newColumnId, cardId, boardId
  //   onClose();
  // };
  return (
    <div className={s.dropdown} ref={dropdownRef}>
      {filteredColumns.map(column => (
        <button
          className={s.btn}
          key={column._id}
          onClick={() => handleColumnClick(column._id)}
        >
          <span>{column.title}</span>
          <svg className={s.icon} width="16" height="16">
            <use href={`${sprite}#arrow-circle-icon`} />
          </svg>
        </button>
      ))}
    </div>
  );
};

export default Dropdown;
