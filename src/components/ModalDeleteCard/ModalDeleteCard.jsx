import s from './ModalDeleteCard.module.css'
import sprite from '../../icons/icons.svg';
const ModalDeleteCard = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className={s.modalOverlay}>
            <div className={s.modalContent}>
                <h2 className={s.modalTitle}>Are you sure you want to delete this card?</h2>
                <div className={s.modalButtons}>
                    <button onClick={onConfirm} className={s.confirmButton}>
                        <svg className={s.yesIcon} width="18" height="18">
                            <use href={`${sprite}#icon-check`} />
                        </svg>
                        Yes</button>
                    <button onClick={onClose} className={s.cancelButton}>
                        <svg className={s.noIcon} width="18" height="18">
                            <use href={`${sprite}#x-close-icon`} />
                        </svg>
                        No</button>
                </div>
            </div>
        </div>
    );
}


export default ModalDeleteCard;