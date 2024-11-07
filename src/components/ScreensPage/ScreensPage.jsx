import React from 'react';
import s from './ScreensPage.module.css';
import FiltersDropDown from '../../components/FiltersDropDown/FiltersDropDown';
import AddColumnModal from '../../components/AddColumnModal/AddColumnModal';
import BoardColumn from '../../components/BoardColumn/BoardColumn';
import sprite from '../../icons/icons.svg';
import { useDispatch, useSelector } from 'react-redux';
import { selectColumns, selectIsModalOpen } from '../../redux/boards/selectors';
import { addColumn, closeModal, openModal } from '../../redux/boards/slice';
const ScreensPage = () => {
  const columns = useSelector(selectColumns);
  const isModalOpen = useSelector(selectIsModalOpen);
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
          {columns.map((column, index) => (
            <BoardColumn key={index} title={column.title} />
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
    </div>
  );
};

export default ScreensPage;
