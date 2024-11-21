
import s from './Card.module.css';
import sprite from '../../icons/icons.svg';
import Dropdown from '../Dropdown/Dropdown.jsx';
// import ModalDeleteCard from '../ModalDeleteCard/ModalDeleteCard.jsx';
import {
  toggleDescription,
} from '../../redux/cards/slice.js';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectExpandedCardId,
  selectSelectedBoard,
} from '../../redux/cards/selectors.js';
import { useEffect, useState } from 'react';
import { deleteCard} from '../../redux/cards/operations.js';
import EditCardModal from '../EditCardModal/EditCardModal.jsx';
import { allColumnsByBoard} from '../../redux/columns/selectors.js';

const Card = ({ card }) => {
  const selectedBoard = useSelector(selectSelectedBoard);
  const boardId = selectedBoard?._id;
  const dispatch = useDispatch();
  const expandedCardId = useSelector(selectExpandedCardId);
  const { _id: cardId, priority, title, description, date } = card;
  const [isToday, setIsToday] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const columns = useSelector(allColumnsByBoard);
  console.log('columns:', columns);
  const filteredColumns = columns.filter(
    column => column._id !== card.columnId
  );
  console.log('filteredColumns:', filteredColumns);
  const isDeadlineToday = date => {
    const deadlineDate = new Date(date);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    deadlineDate.setHours(0, 0, 0, 0);
    return currentDate.getTime() === deadlineDate.getTime();
  };

  useEffect(() => {
    setIsToday(isDeadlineToday(date));
    const interval = setInterval(() => {
      setIsToday(isDeadlineToday(date));
    }, 24 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, [date]);

  const openEditModalHandler = () => {
    setIsEditModalOpen(true);
  };
  const closeEditModalHandler = () => {
    setIsEditModalOpen(false);
  };

  const toggleDescriptionHandler = () => {
    console.log('Toggling description for cardId:', cardId);
    dispatch(toggleDescription(cardId));
  };
  console.log('Card ID:', cardId, 'Expanded Card ID:', expandedCardId);

  console.log(
    `Card ID: ${cardId}, Expanded Card ID: ${expandedCardId}, Class: ${
      expandedCardId === cardId ? 'expanded' : 'collapsed'
    }`
  );
  const openDeleteModal = cardId => {
   dispatch(deleteCard(cardId));
  };

  const openDropdownHandler = () => {
    setIsDropdownOpen(true);
  };
  const closeDropdownHandler = () => {
    setIsDropdownOpen(false);
  };

  const getPriorityColor = priority => {
    switch (priority) {
      case 'low':
        return '#8FA1D0';
      case 'medium':
        return '#E09CB5';
      case 'high':
        return '#BEDBB0';
      case 'without':
        return 'rgba(22, 22, 22, 0.30)';
      default:
        return 'rgba(22, 22, 22, 0.30)';
    }
  };

  return (
    <div
      className={s.card}
      style={{ '--card-color': getPriorityColor(priority) }}
    >
      <h5 className={s.title}>{title}</h5>

      <div className={s.desWrap}>
        <p
         className={`${s.description} ${
          expandedCardId === cardId ? s.expanded : ''
        }`}
          onClick={toggleDescriptionHandler}
        >
          {description}
        </p>
      </div>
      <span className={s.line}></span>
      <div className={s.bottom}>
        <div className={s.action}>
          <p className={s.priority}>
            Priority
            <span
              className={s.label}
              style={{ '--card-color': getPriorityColor(priority) }}
            >
              {priority}
            </span>
          </p>
          <p className={s.deadline}>
            Deadline{' '}
            <span>
              {date ? new Date(date).toLocaleDateString() : 'No date set'}
            </span>
          </p>
        </div>

        <div className={s.buttons}>
          {isToday && (
            <div className={s.deadlineIcon}>
              <svg width="16" height="16">
                <use href={`${sprite}#bell-icon`} />
              </svg>
            </div>
          )}
          <button
            onClick={openDropdownHandler}
            className={s.move}
            disabled={filteredColumns.length === 0}
          >
            <svg className={s.icon} width="16" height="16">
              <use href={`${sprite}#arrow-circle-icon`} />
            </svg>
          </button>
          <button onClick={openEditModalHandler}>
            <svg className={s.icon} width="16" height="16">
              <use href={`${sprite}#pencil-icon`} />
            </svg>
          </button>
          <button onClick={() => openDeleteModal(cardId)}>
            <svg className={s.icon} width="16" height="16">
              <use href={`${sprite}#trash-icon`} />
            </svg>
          </button>
        </div>
      </div>

      {isDropdownOpen && (
        <Dropdown
          boardId={boardId}
          card={card}
          filteredColumns={filteredColumns}
          onClose={closeDropdownHandler}
          isOpen={isDropdownOpen}
        />
      )}
      {/* <ModalDeleteCard
        isOpen={isModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        cardId={cardId}
      /> */}
      {isEditModalOpen && (
        <EditCardModal
          columnId={card.columnId}
          boardId={boardId}
          card={card}
          onClose={closeEditModalHandler}
        />
      )}
    </div>
  );
};

export default Card;