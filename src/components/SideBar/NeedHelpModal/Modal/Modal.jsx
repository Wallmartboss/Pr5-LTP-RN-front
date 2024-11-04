import { useEffect, useCallback } from 'react';
import sprite from '../../../../icons/icons.svg';
import { createPortal } from 'react-dom';

import css from './../Modal/Modal.module.css';

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
    <div onClick={closeModal} className={css.modal_wrapper}>
      <div className={css.modal_content}>
        <h2 className={css.modalTitle}>{title}</h2>
        <button onClick={onClose} className={css.closeButton}>
      <svg className={css.closeIcon} width="18" height="18">
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
