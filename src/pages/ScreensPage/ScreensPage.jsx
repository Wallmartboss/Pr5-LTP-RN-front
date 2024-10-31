import React from 'react';
import s from './ScreensPage.module.css';
import { Link } from 'react-router-dom';

const ScreensPage = () => {
  return (
    <div>
      <div className={s.container}>
        <button className={s.filtersBtn}>
          <svg width="16" height="16">
            <use href="../../icons/icons.svg#con-filter"></use>
          </svg>
          Filters
        </button>
        <div className={s.startTitle}>
          <p>
            Before starting your project, it is essential to
            <Link className={s.link}> create a board</Link> to visualize and
            track all the necessary tasks and milestones. This board serves as a
            powerful tool to organize the workflow and ensure effective
            collaboration among team members.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScreensPage;
