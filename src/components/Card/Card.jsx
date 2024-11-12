import s from './Card.module.css';
import sprite from '../../icons/icons.svg';
import Dropdown from '../Dropdown/Dropdown.jsx';
import ModalDeleteCard from '../ModalDeleteCard/ModalDeleteCard.jsx';
import {
  toggleDescription,
  openModal,
  closeModal,
  selectCardIdToDelete,
} from '../../redux/cards/cardsSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectExpandedCardId,
  selectIsModalOpen,
  selectSelectedBoard,
} from '../../redux/cards/selectors.js';
import { useEffect, useState } from 'react';
import { deleteCard, editCard } from '../../redux/cards/operations.js';
import EditCardModal from '../EditCardModal/EditCardModal.jsx';

const Card = ({ card, filteredColumns }) => {
  const selectedBoard = useSelector(selectSelectedBoard);
  const boardId = selectedBoard?._id;

  const cardIdToDelete = useSelector(selectCardIdToDelete);
  const dispatch = useDispatch();
  const expandedCardId = useSelector(selectExpandedCardId);
  const isModalOpen = useSelector(selectIsModalOpen);
  // const isDropdownOpen = useSelector((state) => state.cards.openDropdowns[card._id]);
  // const openDropdowns = useSelector(selectOpenDropdowns);
  const { _id: cardId, priority, title, description, date } = card;
  const [isToday, setIsToday] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // const [selectedCard, setSelectedCard] = useState(null);

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
    dispatch(toggleDescription({ cardId }));
  };

  const openDeleteModal = () => {
    dispatch(openModal({ cardId }));
  };

  const handleConfirmDelete = () => {
    if (cardIdToDelete) {
      dispatch(deleteCard(cardIdToDelete));
    }
    dispatch(closeModal());
  };
  const handleCancelDelete = () => {
    dispatch(closeModal());
  };

  const handleMoveCard = (newColumnId, cardId) => {
    if (cardId && newColumnId && newColumnId !== card.columnId) {
      const updatedCard = { ...card, columnId: newColumnId };
      dispatch(editCard({ boardId, updatedCard, cardId }));
      setIsDropdownOpen(false);
    }
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
        Oksana Verezhak, [12.11.2024 16:20]
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
            className={s.move}
            onClick={openDropdownHandler}
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
          <button onClick={openDeleteModal}>
            <svg className={s.icon} width="16" height="16">
              <use href={`${sprite}#trash-icon`} />
            </svg>
          </button>
        </div>
      </div>

      <Dropdown
        cardId={cardId}
        filteredColumns={filteredColumns}
        handleMoveCard={handleMoveCard}
        onClose={closeDropdownHandler}
        isOpen={isDropdownOpen}
      />

      <ModalDeleteCard
        isOpen={isModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
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
