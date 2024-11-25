import toast from 'react-hot-toast';
import s from './Dropdown.module.css';
import sprite from '../../icons/icons.svg';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { moveCard } from '../../redux/cards/operations.js';
import useOutsideAndEscapeClose from '../../hooks/useOutsideAndEscapeClose.js';

const Dropdown = ({
  boardId, card, onClose,
  isOpen,
  filteredColumns,
}) => {
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  useOutsideAndEscapeClose(dropdownRef, onClose);

 
  if (!isOpen) return null;

  const handleColumnClick = async newColumnId => {
    try {
      await dispatch(
        moveCard({
          cardId: card._id,
          newColumnId,
          boardId,
        })
      ).unwrap();
      onClose();
      toast.success('Card moved successfully!');
    } catch (error) {
      toast.error('Failed to move card. Try again.');
    }
  };

  // const handleColumnClick =async newColumnId => {
  //   const updateData = {
  //     columnId: newColumnId,
  //     title: card.title,
  //     description: card.description,
  //     priority: card. priority,
  //     date: card.date,
  //   };
  //   try {
  //     await  dispatch(editCard({ boardId, cardId: card._id, updatedCard: updateData }));
  //     onClose();
  //     toast.success('Card moved successfully!');
  //   } catch (error) {
  //     toast.error('Failed to move card. Try again.');
  //   }
   
  // }

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