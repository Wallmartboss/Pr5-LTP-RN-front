import { useEffect, useCallback } from 'react';
import sprite from '../../../../icons/icons.svg';
import { createPortal } from 'react-dom';

import s from './../Modal/Modal.module.css';

const Modal = ({ isOpen, onClose, children, title }) => {
  const closeModal = useCallback(
    ({ target, currentTarget, code }) => {
      if (target === currentTarget || code === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', closeModal);

    return () => document.removeEventListener('keydown', closeModal);
  }, [closeModal]);

  if (!isOpen) return null;

  return createPortal(
    <div onClick={closeModal} className={s.modal_wrapper}>
      <div className={s.modal_content}>
        <h2 className={s.modalTitle}>{title}</h2>
        <button onClick={onClose} className={s.closeButton}>
      <svg className={s.closeIcon} width="18" height="18">
          <use href={`${sprite}#x-close-icon`} />
        </svg>
    </button>
        {children}
      </div>
    </div>,
    document.body 
  );
};

export default Modal;
