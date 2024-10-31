import React from 'react';
import s from './ScreensPage.module.css';

const ScreensPage = () => {
  return (
    <div>
      <div className={s.container}>
        <div className={s.startTitle}>
          <p>
            Before starting your project, it is essential to
            <a>create a board</a> to visualize and track all the necessary tasks
            and milestones. This board serves as a powerful tool to organize the
            workflow and ensure effective collaboration among team members.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScreensPage;
