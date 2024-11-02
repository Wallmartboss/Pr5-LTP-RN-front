import React from 'react';
import s from './BoardColumn.module.css';

const BoardColumn = ({ title }) => {
  return (
    <div className={s.column}>
      <div className={s.columnHeader}>
        <h3>{title}</h3>
        <div className={s.columnContent}> card</div>
      </div>
    </div>
  );
};

export default BoardColumn;
