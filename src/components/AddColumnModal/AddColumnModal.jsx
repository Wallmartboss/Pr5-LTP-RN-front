import React, { useEffect, useState } from 'react';
import s from './AddColumnModal.module.css';

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
      alert('Please add title');
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
          X
        </button>
        {/* пізніше тут буде свг*/}
        <h2 className={s.modalTitle}>Add column</h2>
        <input
          className={s.inputField}
          type="text"
          placeholder="Title"
          value={title}
          onChange={handleInputChange}
        />
        <button className={s.addBtn} onClick={handleAddClick}>
          <span className={s.plus}>+</span>
          Add
        </button>
      </div>
    </div>
  );
};

export default AddColumnModal;
