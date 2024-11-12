import React, { useEffect, useState } from 'react';
import s from './EditColumnModal.module.css';
import sprite from '../../icons/icons.svg';
import { useDispatch, useSelector } from 'react-redux';
import { selectColumnToEdit } from '../../redux/columns/selectors'; // Переконайтесь, що цей selector правильно налаштований
import { closeEditModal } from '../../redux/columns/slice';
import { editColumnTitle } from '../../redux/columns/operations';

const EditColumnModal = () => {
  const dispatch = useDispatch();
  const columnToEdit = useSelector(selectColumnToEdit); // Використовуємо selector
  const [title, setTitle] = useState(columnToEdit?.title || '');

  const token = localStorage.getItem('token');

  useEffect(() => {
    setTitle(columnToEdit?.title || '');
  }, [columnToEdit]);

  const handleInputChange = (event) => {
    setTitle(event.target.value);
  };

  const handleEditClick = async () => {
    if (title.trim() && columnToEdit) {
      await dispatch(
        editColumnTitle({ columnId: columnToEdit._id, newTitle: title, token }) // Pass newTitle here
      );
      handleClose();
    } else {
      alert('Please provide a title');
    }
  };
  

  const handleClose = () => {
    dispatch(closeEditModal());
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
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
      onClick={(event) => event.target === event.currentTarget && handleClose()}
    >
      <div className={s.modalContent}>
        <button className={s.closeBtn} onClick={handleClose}>
          <svg className={s.xCloseBtn} width="18" height="18">
            <use href={`${sprite}#x-close-icon`} />
          </svg>
        </button>
        <h2 className={s.modalTitle}>Edit Column</h2>
        <input
          className={s.inputField}
          type="text"
          placeholder="Title"
          value={title}
          onChange={handleInputChange}
          autoFocus
        />
        <button className={s.editBtn} onClick={handleEditClick}>
          <svg className={s.checkIcon} width="12" height="12">
            <use href={`${sprite}#icon-check`} />
          </svg>
          Edit
        </button>
      </div>
    </div>
  );
};

export default EditColumnModal;
