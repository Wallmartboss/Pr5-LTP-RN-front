import React, { useEffect, useState } from 'react';
import s from './AddColumnModal.module.css';
import sprite from '../../icons/icons.svg';

const AddColumnModal = ({ onClose, onAddColumn }) => {
  const [title, setTitle] = useState('');

  const handleInputChange = event => {
    setTitle(event.target.value);
  };

  const handleAddClick = () => {
    if (title.trim()) {
      onAddColumn(title);
      setTitle('');
      onClose();
    } else {
      alert('Please add a title');
    }
  };

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleOverlayClick = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={s.modalOverlay} onClick={handleOverlayClick}>
      <div className={s.modalContent}>
        <button className={s.closeBtn} onClick={onClose}>
          <svg className={s.xCloseBtn} width="18" height="18">
            <use href={`${sprite}#x-close-icon`} />
          </svg>
        </button>
        <h2 className={s.modalTitle}>Add Column</h2>
        <input
          className={s.inputField}
          type="text"
          placeholder="Title"
          value={title}
          onChange={handleInputChange}
          autoFocus
        />
        <button className={s.addBtn} onClick={handleAddClick}>
          <svg className={s.plusIcon} width="14" height="14">
            <use href={`${sprite}#plus-icon`} />
          </svg>
          Add
        </button>
      </div>
    </div>
  );
};

export default AddColumnModal;
