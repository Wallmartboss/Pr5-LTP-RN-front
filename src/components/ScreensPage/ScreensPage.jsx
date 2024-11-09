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
  selectIsError,
  selectIsLoading,
  selectIsModalOpen,
} from '../../redux/columns/selectors';
import EditColumnModal from '../EditColumnModal/EditColumnModal';
import DeleteColumnModal from '../DeleteColumnModal/DeleteColumnModal';
import { fetchColumns, addColumn } from '../../redux/columns/operations';
import { openModal, closeModal } from '../../redux/columns/slice';

const ScreensPage = () => {
  const dispatch = useDispatch();
  const columns = useSelector(selectColumns);
  const isModalOpen = useSelector(selectIsModalOpen);
  const isEdidModalOpen = useSelector(selectEditModalOpen);
  const isDeleteModalOpen = useSelector(selectIsDeleteModalOpen);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);

  useEffect(() => {
    dispatch(fetchColumns());
  }, [dispatch]);

  const handleOpenModal = () => {
    dispatch(openModal());
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const handleAddColumn = async columnTitle => {
    await dispatch(addColumn(columnTitle));
    handleCloseModal();
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>{toString(isError)}</p>;
  }

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
