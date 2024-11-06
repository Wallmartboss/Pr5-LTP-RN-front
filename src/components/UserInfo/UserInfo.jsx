import { useState } from 'react';
import s from './UserInfo.module.css';
import clsx from 'clsx';
import sprite from '../../icons/icons.svg';
import UpdateUserForm from '../UpdateUserForm/UpdateUserForm.jsx';
import { useSelector } from 'react-redux';
import {
  selectUserAvatar,
  selectUserName,
} from '../../redux/user/selectors.js';

const UserInfo = () => {
  const username = useSelector(selectUserName);
  const userAvatar = useSelector(selectUserAvatar);
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleDirectCloseModal = () => {
    setIsOpen(false);
  };
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

        {userAvatar ? (
          <img className={s.avatar} src={userAvatar} alt="" />
        ) : (
          <div className={s.avatar_wrapper}>
            <svg
              width="32"
              height="32"
              viewBox="0 0 68 68"
              xmlns="http://www.w3.org/2000/svg"
              className={s.avatar_icon}
            >
              <g clipPath="url(#clip0_4566_2575)">
                <circle cx="34.3334" cy="31.3334" r="11.3334" />
                <path d="M61.7529 69.8119C61.7529 66.1511 61.0319 62.5261 59.6309 59.144C58.23 55.7619 56.1766 52.6888 53.5881 50.1002C50.9995 47.5117 47.9264 45.4583 44.5443 44.0574C41.1622 42.6565 37.5372 41.9354 33.8764 41.9354C30.2157 41.9354 26.5907 42.6565 23.2086 44.0574C19.8265 45.4583 16.7534 47.5117 14.1648 50.1002C11.5763 52.6888 9.52289 55.7619 8.12197 59.144C6.72105 62.5261 6 66.1511 6 69.8119L33.8765 69.8119H61.7529Z" />
              </g>
              <defs>
                <clipPath id="clip0_4566_2575">
                  <rect width="68" height="68" rx="8" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        )}
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
            <svg className={s.arrow_icon} width="18" height="18">
              <use href={`${sprite}#x-close-icon`} />
            </svg>
          </span>
          <UpdateUserForm
            avatar={userAvatar}
            closeModal={handleDirectCloseModal}
          />
        </div>
      </div>
    </>
  );
};
export default UserInfo;
