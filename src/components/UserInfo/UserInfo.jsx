import { useState } from 'react';
import s from './UserInfo.module.css';
import clsx from 'clsx';

import UpdateUserForm from '../UpdateUserForm/UpdateUserForm.jsx';
import { useSelector } from 'react-redux';
import { selectUserName } from '../../redux/user/selectors.js';

const UserInfo = () => {
  const username = useSelector(selectUserName);
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const closeModal = e => {
    if (e.target === e.currentTarget || e.target.closest(`.${s.closeModal}`)) {
      setIsOpen(false);
    }
  };

  const openModal = () => {
    setIsVisible(true);
    setIsOpen(true);
  };
  return (
    <>
      <button onClick={openModal} className={s.profile}>
        <p>{username}</p>
        <img className={s.photo} src={'./icons/icon.svg'} alt="" />
      </button>
      <div
        onClick={closeModal}
        className={clsx(s.overlay, isOpen ? s.overlay_show : s.overlay_hidden)}
        onTransitionEnd={() => {
          if (!isOpen) setIsVisible(false);
        }}
        style={{ visibility: isVisible ? 'visible' : 'hidden' }}
      >
        <div className={s.modal}>
          <span className={s.title}>Edit profile</span>
          <span className={s.closeModal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
            >
              <path
                d="M13.5 4.5L4.5 13.5"
                stroke="#161616"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.5 4.5L13.5 13.5"
                stroke="#161616"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <UpdateUserForm />
        </div>
      </div>
    </>
  );
};
export default UserInfo;
