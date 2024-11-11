import React, { useEffect, useState } from 'react';
import s from './ScreensPage.module.css';
import FiltersDropDown from '../FiltersDropDown/FiltersDropDown';
import AddColumnModal from '../AddColumnModal/AddColumnModal';
import CardList from '../CardList/CardList.jsx';
import sprite from '../../icons/icons.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectColumns,
  selectEditModalOpen,
  selectIsDeleteModalOpen,
  selectIsModalOpen,
  selectIsLoading,
} from '../../redux/columns/selectors';
import { selectSelectedBoard } from '../../redux/boards/selectors';
import { fetchBoardById } from '../../redux/boards/operations';
import { fetchColumns, addColumn } from '../../redux/columns/operations';
import { openModal, closeModal, openEditModal, openDeleteModal } from '../../redux/columns/slice';
import EditColumnModal from '../EditColumnModal/EditColumnModal';
import DeleteColumnModal from '../DeleteColumnModal/DeleteColumnModal';
import AddCardModal from '../AddCardModal/AddCardModal'; // Import AddCardModal

const ScreensPage = () => {
  const selectedBoard = useSelector(selectSelectedBoard);
  const dispatch = useDispatch();
  const columns = useSelector(selectColumns);
  const isModalOpen = useSelector(selectIsModalOpen);
  const isEditModalOpen = useSelector(selectEditModalOpen);
  const isDeleteModalOpen = useSelector(selectIsDeleteModalOpen);
  const isLoading = useSelector(selectIsLoading);
  const token = localStorage.getItem('token');

  const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false);
  const [currentColumnId, setCurrentColumnId] = useState(null);

  useEffect(() => {
    if (selectedBoard?._id) {
      dispatch(fetchColumns(selectedBoard._id));
      dispatch(fetchBoardById({ boardId: selectedBoard._id, token }));
    }
  }, [dispatch, selectedBoard?._id, token]);

  const handleOpenModal = () => {
    dispatch(openModal());
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const handleAddColumn = async columnTitle => {
    await dispatch(addColumn({ boardId: selectedBoard._id, title: columnTitle, token }));
    handleCloseModal();
  };

<<<<<<< Updated upstream
=======
<<<<<<< HEAD
  const openAddCardModal = columnId => {
    setCurrentColumnId(columnId);
    setIsAddCardModalOpen(true);
  };

  const closeAddCardModal = () => {
    setIsAddCardModalOpen(false);
    setCurrentColumnId(null);
  };
=======
>>>>>>> Stashed changes
  useEffect(() => {
    if (selectedBoard?._id) {
      dispatch(fetchBoardById({ boardId: selectedBoard._id, token }));
    }
  }, [dispatch, selectedBoard?._id, token]);
<<<<<<< Updated upstream
=======
>>>>>>> 9ccce22de781316e0d24f00bfe1e14c795a057c8
>>>>>>> Stashed changes

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return selectedBoard ? (
    <div className={s.mainDashboard}>
      <div className={s.container}>
        <div className={s.boardHeader}>
          <p className={s.boardTitle}>{selectedBoard.title}</p>
          <FiltersDropDown />
        </div>
        <div className={s.columnsContainer}>
          {columns.length > 0 ? (
            columns.map(column => (
              <div className={s.column} key={column._id}>
                <div className={s.columnHeader}>
                  <h3 className={s.columnTitle}>{column.title}</h3>
                  <div className={s.icons}>
                    <button
                      className={s.columnHeaderBtn}
                      onClick={() => dispatch(openEditModal(column))}
                    >
                      <svg className={s.pencilIcon} width="16" height="16">
                        <use href={`${sprite}#pencil-icon`} />
                      </svg>
                    </button>
                    <button
                      className={s.columnHeaderBtn}
                      onClick={() => dispatch(openDeleteModal(column))}
                    >
                      <svg className={s.trashIcon} width="16" height="16">
                        <use href={`${sprite}#trash-icon`} />
                      </svg>
                    </button>
                  </div>
                </div>
                <CardList columnId={column._id} />
                <button
                  className={s.addBtn}
                  onClick={() => openAddCardModal(column._id)}
                >
                  <svg className={s.plusIcon} width="14" height="14">
                    <use href={`${sprite}#plus-icon`} />
                  </svg>
                  Add another card
                </button>
              </div>
            ))
          ) : (
            <p>No columns available for this board</p>
          )}
          <button className={s.addColumnBtn} onClick={handleOpenModal}>
            <svg className={s.plusIcon} width="24" height="24">
              <use href={`${sprite}#plus-icon`} />
            </svg>
            Add another column
          </button>
        </div>
      </div>
      {isModalOpen && (
        <AddColumnModal
          onClose={handleCloseModal}
          onAddColumn={handleAddColumn}
        />
      )}
      {isEditModalOpen && <EditColumnModal />}
      {isDeleteModalOpen && <DeleteColumnModal />}
      {isAddCardModalOpen && (
        <AddCardModal
          onClose={closeAddCardModal}
          columnId={currentColumnId}
          boardId={selectedBoard._id}
        />
      )}
    </div>
  ) : (
    <p>Select a board to view its details</p>
  );
};

export default ScreensPage;
