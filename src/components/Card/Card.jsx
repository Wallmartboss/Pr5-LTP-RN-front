
import s from './Card.module.css';
import sprite from '../../icons/icons.svg';
import Dropdown from '../Dropdown/Dropdown.jsx';
import ModalDeleteCard from '../ModalDeleteCard/ModalDeleteCard.jsx';
import {
    toggleDescription,
    openModal,
    closeModal,
    toggleDropdown,
    closeDropdown,
    selectCardIdToDelete,
 
} from '../../redux/cards/cardsSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectExpandedCardId, selectIsModalOpen} from '../../redux/cards/selectors.js';
import { useEffect, useState } from 'react';
import { deleteCard } from '../../redux/cards/operations.js';

const Card = ({ card, handleMoveCard, filteredColumns }) => {
    const cardIdToDelete = useSelector(selectCardIdToDelete);
    const dispatch = useDispatch();
    const expandedCardId = useSelector(selectExpandedCardId);
    const isModalOpen = useSelector(selectIsModalOpen);
    const { _id, priority, title, description, deadline } = card;
    const isDropdownOpen = useSelector((state) => state.cards.openDropdowns[card._id]);
    const [isToday, setIsToday] = useState(false);

    const isDeadlineToday = (deadline) => {
        const deadlineDate = new Date(deadline);
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        deadlineDate.setHours(0, 0, 0, 0);
        return currentDate.getTime() === deadlineDate.getTime();
      };
    
      useEffect(() => {
        setIsToday(isDeadlineToday(deadline));
        const interval = setInterval(() => {
          setIsToday(isDeadlineToday(deadline));
        }, 24 * 60 * 60 * 1000); 
        return () => clearInterval(interval);
      }, [deadline]);

    const toggleDescriptionHandler = () => {
        dispatch(toggleDescription(_id));
    };

    const openDeleteModal  = () => {
        dispatch(openModal({ cardId: _id }));     
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


    const handleToggleDropdown = () => {
        dispatch(toggleDropdown(card._id));
      };
    
      const handleMove = (columnId) => {
        handleMoveCard(columnId, card._id);
        dispatch(closeDropdown(card._id)); 
      };
    const getPriorityColor = (priority) => {
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
        <div className={s.card} style={{ '--card-color': getPriorityColor(priority) }}>
            <h5 className={s.title}>{title}</h5>

            <p
                className={`${s.description} ${expandedCardId === _id ? s.expanded : ''}`}
                onClick={toggleDescriptionHandler}
            >{description}</p>

            <span className={s.line}></span>
            <div className={s.bottom}>
                <div className={s.action}>
                    <p className={s.priority}>Priority
                        <span className={s.label} style={{ '--card-color': getPriorityColor(priority) }}>{priority}</span>
                    </p>
                    <p className={s.deadline}>Deadline<span>{deadline}</span></p>
                </div>

                <div className={s.buttons}>
                {isToday && (
            <div className={s.deadlineIcon}>
              <svg width="16" height="16">
                <use href={`${sprite}#bell-icon`} />
              </svg>
            </div>
          )}
                    <button className={s.move}  onClick={handleToggleDropdown} disabled={filteredColumns.length === 0} >
                        <svg className={s.icon} width="16" height="16">
                            <use href={`${sprite}#arrow-circle-icon`} />
                        </svg>
                    </button>
                    <button >
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

            {isDropdownOpen  && (
                <Dropdown
                cardId={card._id}
                filteredColumns={filteredColumns}
                handleMoveCard={handleMove}
                />
            )}
            <ModalDeleteCard
                isOpen={isModalOpen}
                onClose={handleCancelDelete}
                onConfirm={handleConfirmDelete}
            />
        </div>
    );
};

export default Card;