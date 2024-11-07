import React from 'react';
import s from './BoardColumn.module.css';
import sprite from '../../icons/icons.svg';
import { useDispatch } from 'react-redux';
import { openDeleteModal, openEditModal } from '../../redux/boards/slice';

const BoardColumn = ({ column }) => {
  const dispatch = useDispatch();

  const handleEditClick = () => {
    dispatch(openEditModal(column));
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
      <div className={s.columnContent}>
        <div className={s.testCard}></div>
        <div className={s.testCard}></div>
        <div className={s.testCard}></div>
        <div className={s.testCard}></div>
        <div className={s.testCard}></div>
        <div className={s.testCard}></div>
        <div className={s.testCard}></div>
      </div>
      <button className={s.addBtn}>
        <svg className={s.plusIcon} width="14" height="14">
          <use href={`${sprite}#plus-icon`} />
        </svg>
        Add another card
      </button>
    </div>
  );
};

export default BoardColumn;
