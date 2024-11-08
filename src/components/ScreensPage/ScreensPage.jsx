import React from 'react';
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
} from '../../redux/boards/selectors';
import { addColumn, closeModal, openModal } from '../../redux/boards/slice';
import EditColumnModal from '../EditColumnModal/EditColumnModal';
import DeleteColumnModal from '../DeleteColumnModal/DeleteColumnModal';

const ScreensPage = () => {
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

  return (
    <div className={s.mainDashboard}>
      <div className={s.container}>
        <div className={s.boardHeader}>
          <p>Project board</p>
          <FiltersDropDown />
        </div>
        <div className={s.columnsContainer}>
          {columns.map(column => (
            <BoardColumn key={column.id} column={column} />
          ))}
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
  );
};

export default ScreensPage;
