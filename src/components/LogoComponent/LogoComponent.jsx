// import React from 'react';
import styles from './LogoComponent.module.css';
import sprite from '../../icons/icons.svg';

const LogoComponent = () => {
  return (
    <div className={styles.container}>
      <div className={styles.iconFrame}>
        <svg className={styles.icon} width="14" height="16">
          <use href={`${sprite}#taskPro-icon`} />
        </svg>
      </div>
      <h1 className={styles.text}>Task Pro</h1>
    </div>
  );
};

export default LogoComponent;
