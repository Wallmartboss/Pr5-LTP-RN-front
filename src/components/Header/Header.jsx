import React from 'react';
import s from './Header.module.css';

const Header = () => {
  return (
    <header className={s.header}>
      <div className={s.container}>
        <h1>test</h1>
        <svg className={s.burgerMenu} width="24" height="24">
          <use href="../../icons/icons.svg#icon-burger-menu" />
        </svg>
      </div>
    </header>
  );
};

export default Header;
