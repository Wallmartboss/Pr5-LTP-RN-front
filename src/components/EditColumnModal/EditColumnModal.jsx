import React, { useEffect, useState } from 'react';
import s from './EditColumnModal.module.css';
import sprite from '../../icons/icons.svg';
import { useDispatch, useSelector } from 'react-redux';
import { selectColumnToEdit } from '../../redux/boards/selectors';
import { closeEditModal, editColumnTitle } from '../../redux/boards/slice';

const EditColumnModal = () => {
  const dispatch = useDispatch();
  const columnToEdit = useSelector(selectColumnToEdit);
  const [title, setTitle] = useState(columnToEdit?.title || '');

  useEffect(() => {
    setTitle(columnToEdit?.title || '');
  }, [columnToEdit]);

  const handleInputChange = event => {
    setTitle(event.target.value);
  };

  const handleEditClick = () => {
    if (title.trim() && columnToEdit) {
      dispatch(editColumnTitle({ id: columnToEdit.id, newTitle: title }));
      dispatch(closeEditModal());
    } else {
      console.log('Need title');
    }
  };

  const handleClose = () => {
    dispatch(closeEditModal());
  };

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape' && columnToEdit) {
        handleClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleClose, columnToEdit]);

  return (
    <div
      className={s.modalOverlay}
      onClick={event => event.target === event.currentTarget && handleClose()}
    >
      <div className={s.modalContent}>
        <button className={s.closeBtn} onClick={handleClose}>
          <svg className={s.xCloseBtn} width="18" height="18">
            <use href={`${sprite}#x-close-icon`} />
          </svg>
        </button>
        <h2 className={s.modalTitle}> Edit Column</h2>
        <input
          className={s.inputField}
          type="text"
          placeholder="Title"
          value={title}
          onChange={handleInputChange}
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
