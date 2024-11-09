
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
} from '../../redux/cards/cardsSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectExpandedCardId, selectIsModalOpen, selectOpenDropdowns } from '../../redux/cards/selectors.js';

const Card = ({ card, handleMoveCard, handleDelete, isDeadlineToday, filteredColumns }) => {
    const dispatch = useDispatch();
    const expandedCardId = useSelector(selectExpandedCardId);
    const isModalOpen = useSelector(selectIsModalOpen);
    const openDropdowns = useSelector(selectOpenDropdowns);
    const { _id, priority, title, description, deadline } = card;



    const toggleDescriptionHandler = () => {
        dispatch(toggleDescription(_id));
    };
    const handleDeleteClick = () => {
        dispatch(openModal());
    };

    const handleConfirmDelete = () => {
        handleDelete(_id);
        dispatch(closeModal());
    };

    const handleCancelDelete = () => {
        dispatch(closeModal());
    };


    const handleMoveCardClick = (columnId) => {
        handleMoveCard(columnId, _id);
        dispatch(closeDropdown(_id));
    };

    const toggleDropdownHandler = () => {
        dispatch(toggleDropdown(_id));
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
                    {isDeadlineToday(deadline) && (
                        <div className={s.deadlineIcon}>
                            <svg width="16" height="16">
                                <use href={`${sprite}#bell-icon`} />
                            </svg>
                        </div>
                    )}
                    <button className={s.move} onClick={toggleDropdownHandler} disabled={filteredColumns.length === 0}>
                        <svg className={s.icon} width="16" height="16">
                            <use href={`${sprite}#arrow-circle-icon`} />
                        </svg>
                    </button>
                    <button >
                        <svg className={s.icon} width="16" height="16">
                            <use href={`${sprite}#pencil-icon`} />
                        </svg>
                    </button>
                    <button onClick={handleDeleteClick}>
                        <svg className={s.icon} width="16" height="16">
                            <use href={`${sprite}#trash-icon`} />
                        </svg>
                    </button>
                </div>
            </div>

            <Dropdown
                cardId={card._id}
                filteredColumns={filteredColumns}
                handleMoveCard={handleMoveCardClick}
                openDropdown={openDropdowns[_id]}
                closeDropdown={() => dispatch(closeDropdown(_id))}
            />
            <ModalDeleteCard
                isOpen={isModalOpen}
                onClose={handleCancelDelete}
                onConfirm={handleConfirmDelete}
            />
        </div>
    );
};

export default Card;