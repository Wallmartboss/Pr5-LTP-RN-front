import React, { useState } from 'react';
import styles from './CreateBoardForm.module.css';

const CreateBoardForm = ({ onCreate }) => {
  const [title, setTitle] = useState('');
  const [icon, setIcon] = useState('grid'); // Обраний за замовчуванням іконка
  const [background, setBackground] = useState(''); // Вибір фону

  const handleSubmit = e => {
    e.preventDefault();
    if (!title) {
      alert('Title is required'); // Алерт для валідації
      return;
    }
    onCreate({ title, icon, background });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>New board</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className={styles.input}
      />
      <div className={styles.section}>
        <p>Icons</p>
        {/* Радіо-кнопки для іконок */}
        <div className={styles.icons}>
          {/* Додаємо іконки з можливістю вибору */}
          <input
            type="radio"
            name="icon"
            value="grid"
            checked={icon === 'grid'}
            onChange={() => setIcon('grid')}
          />
          {/* Додайте інші іконки так само */}
        </div>
      </div>
      <div className={styles.section}>
        <p>Background</p>
        {/* Радіо-кнопки для фону */}
        <div className={styles.backgrounds}>
          <input
            type="radio"
            name="background"
            value=""
            checked={background === ''}
            onChange={() => setBackground('')}
          />
          {/* Додайте інші варіанти фону */}
        </div>
      </div>
      <button type="submit" className={styles.createButton}>
        Create
      </button>
    </form>
  );
};

export default CreateBoardForm;
