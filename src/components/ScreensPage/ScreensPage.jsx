import React, { useEffect } from 'react';
import s from './ScreensPage.module.css';
import FiltersDropDown from '../FiltersDropDown/FiltersDropDown';
import AddColumnModal from '../AddColumnModal/AddColumnModal';
import BoardColumn from '../BoardColumn/BoardColumn';
import sprite from '../../icons/icons.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectColumns,
  selectEditModalOpen,
  selectIsDeleteModalOpen,
  selectIsModalOpen,
  selectSelectedBoard,
} from '../../redux/boards/selectors';
import { fetchBoardById } from '../../redux/boards/operations';
import { addColumn, closeModal, openModal } from '../../redux/boards/slice';
import EditColumnModal from '../EditColumnModal/EditColumnModal';
import DeleteColumnModal from '../DeleteColumnModal/DeleteColumnModal';

const ScreensPage = () => {
  const selectedBoard = useSelector(selectSelectedBoard);
  const columns = useSelector(selectColumns);
  const isModalOpen = useSelector(selectIsModalOpen);
  const isEdidModalOpen = useSelector(selectEditModalOpen);
  const isDeleteModalOpen = useSelector(selectIsDeleteModalOpen);
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(openModal());
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const handleAddColumn = columnTitle => {
    dispatch(addColumn(columnTitle));
    handleCloseModal();
  };
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (selectedBoard) {
      dispatch(fetchBoardById({ boardId: selectedBoard._id, token }));
    }
  }, [dispatch, selectedBoard, token]);
  useEffect(() => {
    console.log('Columns in selected board:', columns);
  }, [columns]);

  return selectedBoard ? (
    <div className={s.mainDashboard}>
      <div className={s.container}>
        <div className={s.boardHeader}>
          <p>{selectedBoard.title}</p>
          <FiltersDropDown />
        </div>
        <div className={s.columnsContainer}>
          {selectedBoard.columns && selectedBoard.columns.length > 0 ? (
            selectedBoard.columns.map(column => (
              <BoardColumn key={column.id} column={column} />
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
      {isEdidModalOpen && <EditColumnModal />}
      {isDeleteModalOpen && <DeleteColumnModal />}
    </div>
  ) : (
    <p>Select a board to view its details</p>
  );
};

export default ScreensPage;
