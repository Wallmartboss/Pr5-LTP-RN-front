import s from './BoardColumn.module.css';
import sprite from '../../icons/icons.svg';

import { useDispatch, useSelector } from 'react-redux';
import { openDeleteModal, openEditModal } from '../../redux/columns/slice';
import { openEditModalBoard } from '../../redux/boards/slice';
import CardList from '../CardList/CardList.jsx';
import { selectSelectedBoard } from '../../redux/cards/selectors.js';

import { addCard, fetchCards } from '../../redux/cards/operations.js';
import AddCardModal from '../AddCardModal/AddCardModal.jsx';

import { useState } from 'react';
// import AddCardModal from '../AddCardModal/AddCardModal.jsx';

// import { selectToken } from '../../redux/auth/selectors.js';

const BoardColumn = ({ column }) => {
  const dispatch = useDispatch();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const selectedBoard = useSelector(selectSelectedBoard);
  const boardId = selectedBoard?._id;
  const columnId = column._id;

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };
  // const handleCloseAddModal = () => {
  //    dispatch(closeAddModal());
  //  };
  // const token = localStorage.getItem('token');
  //  console.log('token:', token);

  // const handleAddCard = taskData => {
  // console.log('Creating new card:', taskData);
  //  dispatch(
  //     addCard({
  //       newCard: {
  //         ...taskData,
  //         columnId,
  //          boardId,
  //       token,
  //     })
  //   );
  // ---------------------------------------
  // await dispatch(
  //   addCard({
  //     newCard: {
  //       ...taskData,
  //       columnId,
  //       boardId,
  //     },
  //     token,
  //   })
  // ).then(() => {
  //   console.log(
  //     'newcard:',
  //     taskData,
  //     'columnId:',
  //     columnId,
  //     'boardId:',
  //     boardId,
  //     'token:',
  //     token
  //   );
  //   dispatch(fetchCards({ boardId }));
  // });

  const handleAddCard = taskData => {
    dispatch(
      addCard({
        ...taskData,
        columnId,
        boardId,
      })
    ).then(() => {
      dispatch(fetchCards({ boardId }));
    });

    handleCloseAddModal();
  };

  const handleEditClick = () => {
    dispatch(openEditModal(column));
    dispatch(openEditModalBoard(column));
  };

  const handleDeleteClick = () => {
    dispatch(openDeleteModal(column));
  };

  return (
    <div className={s.column}>
      <div className={s.columnHeader}>
        <h3 className={s.columnTitle}>{column.title}</h3>
        <div className={s.icons}>
          <button className={s.columnHeaderBtn} onClick={handleEditClick}>
            <svg className={s.pencilIcon} width="16" height="16">
              <use href={`${sprite}#pencil-icon`} />
            </svg>
          </button>
          <button className={s.columnHeaderBtn} onClick={handleDeleteClick}>
            <svg className={s.trashIcon} width="16" height="16">
              <use href={`${sprite}#trash-icon`} />
            </svg>
          </button>
        </div>
      </div>

      <CardList columnId={columnId} />
      {isAddModalOpen && (
        <AddCardModal
          onAdd={handleAddCard}
          onClose={handleCloseAddModal}
          boardId={boardId}
          columnId={columnId}
        />
      )}
      <button className={s.addBtn} onClick={handleOpenAddModal}>
        <svg className={s.plusIcon} width="14" height="14">
          <use href={`${sprite}#plus-icon`} />
        </svg>
        Add another card
      </button>
    </div>
  );
};

export default BoardColumn;
