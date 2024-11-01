import React from 'react';
import s from './ScreensPage.module.css';
import FiltersDropDown from '../../components/FiltersDropDown/FiltersDropDown';

const ScreensPage = () => {
  return (
    <div className={s.mainDashboard}>
      <div className={s.container}>
        <div className={s.boardHeader}>
          <p>Project board</p>
          <FiltersDropDown />
        </div>
      </div>
    </div>
  );
};

export default ScreensPage;
