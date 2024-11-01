import React from 'react';
import s from './ScreensPage.module.css';
import FiltersDropDown from '../../components/FiltersDropDown/FiltersDropDown';

const ScreensPage = () => {
  return (
    <div>
      <div className={s.boardHeader}>
        <p>Project board</p>
        <FiltersDropDown />
      </div>
    </div>
  );
};

export default ScreensPage;
