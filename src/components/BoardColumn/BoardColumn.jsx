import React from 'react';
import s from './BoardColumn.module.css';
import sprite from '../../icons/icons.svg';

const BoardColumn = ({ title }) => {
  return (
    <div className={s.column}>
      <div className={s.columnHeader}>
        <h3 className={s.columnTitle}>{title}</h3>
        <div className={s.icons}>
          <svg className={s.pencilIcon} width="16" height="16">
            <use href={`${sprite}#pencil-icon`} />
          </svg>
          <svg className={s.trashIcon} width="16" height="16">
            <use href={`${sprite}#trash-icon`} />
          </svg>
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
    </div>
  );
};

export default BoardColumn;
