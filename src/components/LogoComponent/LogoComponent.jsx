// import React from 'react';
import styles from './LogoComponent.module.css';
import sprite from '../../icons/icons.svg';

const LogoComponent = () => {
  return (
    <div className={styles.container}>
      <svg className={styles.icon} width="32" height="32">
        <use href={`${sprite}#icon-light`} />
      </svg>
      <h1 className={styles.text}>Task Pro</h1>
    </div>
  );
};

export default LogoComponent;
