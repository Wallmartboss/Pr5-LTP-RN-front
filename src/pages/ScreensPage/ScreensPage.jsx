import React, { useState } from 'react';
import s from './ScreensPage.module.css';
import FiltersDropDown from '../../components/FiltersDropDown/FiltersDropDown';
import AddColumnModal from '../../components/AddColumnModal/AddColumnModal';
import BoardColumn from '../../components/BoardColumn/BoardColumn';

const ScreensPage = () => {
  const [columns, setColumns] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddColumn = columnTitle => {
    setColumns([...columns, { title: columnTitle }]);
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
            <span className={s.plus}>+</span>Add another column
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
