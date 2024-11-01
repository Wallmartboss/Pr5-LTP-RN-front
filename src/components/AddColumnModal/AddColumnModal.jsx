import React, { useState } from 'react';
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
    } else {
      alert('Please add title');
    }
  };

  return (
    <div className={s.modalOverlay}>
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
