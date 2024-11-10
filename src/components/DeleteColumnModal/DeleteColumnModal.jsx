import { useEffect } from 'react';
import s from './DeleteColumnModal.module.css';
import sprite from '../../icons/icons.svg';
import { useDispatch, useSelector } from 'react-redux';
import { selectColumnToDelete } from '../../redux/columns/selectors';
import { closeDeleteModal } from '../../redux/columns/slice';
import { deleteColumn } from '../../redux/columns/operations';

const DeleteColumnModal = () => {
  const dispatch = useDispatch();
  const columnToDelete = useSelector(selectColumnToDelete);

  const handleClose = () => {
    dispatch(closeDeleteModal());
  };

  const handleDelete = async () => {
    if (columnToDelete?._id) {
      await dispatch(deleteColumn(columnToDelete._id));
      handleClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleClose]);

  return (
    <div
      className={s.modalOverlay}
      onClick={event => event.target === event.currentTarget && handleClose()}
    >
      <div className={s.modalContent}>
        <h2 className={s.modalTitle}>
          Are you sure you want to delete this column?
        </h2>
        <p className={s.columnTitle}>{columnToDelete?.title}</p>
        <div className={s.deleteBtns}>
          <button className={s.yesBtn} onClick={handleDelete}>
            <svg className={s.yesIcon} width="18" height="18">
              <use href={`${sprite}#icon-check`} />
            </svg>
            Yes
          </button>
          <button className={s.noBtn} onClick={handleClose}>
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

export default DeleteColumnModal;
