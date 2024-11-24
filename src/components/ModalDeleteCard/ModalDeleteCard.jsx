import s from './ModalDeleteCard.module.css';
import sprite from '../../icons/icons.svg';
import { useRef } from 'react';
import useOutsideAndEscapeClose from '../../hooks/useOutsideAndEscapeClose.js';

const ModalDeleteCard = ({ isOpen, onClose, onConfirm, cardTitle }) => {


  const modalRef = useRef();
  useOutsideAndEscapeClose(modalRef, onClose);

  if (!isOpen) return null;
 
  return (
    <div className={s.modalOverlay}>
      <div className={s.modalContent} ref={modalRef}>
        <h2 className={s.modalTitle}>
        Do you really want to delete this card? 
        </h2>
        <p className={s.cardTitle}>{cardTitle} </p>
        <div className={s.modalButtons}>
          <button onClick={onConfirm} className={s.confirmButton}>
            <svg className={s.yesIcon} width="18" height="18">
              <use href={`${sprite}#icon-check`} />
            </svg>
            Yes
          </button>
          <button onClick={onClose} className={s.cancelButton}>
            <svg className={s.noIcon} width="18" height="18">
              <use href={`${sprite}#x-close-icon`} />
            </svg>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDeleteCard;
