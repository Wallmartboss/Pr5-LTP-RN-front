import React, { useState } from 'react';
import s from './CreateBoardForm.module.css';
import sprite from '../../icons/icons.svg';

const icons = [
  { value: 'project-icon', label: 'Project' },
  { value: 'star-icon', label: 'Star' },
  { value: 'circle-icon', label: 'Circle' },
  { value: 'puzzle-piece-icon', label: 'Puzzle' },
  { value: 'cube-icon', label: 'Cube' },
  { value: 'lightning-icon', label: 'Lightning' },
  { value: 'colors-icon', label: 'Colors' },
  { value: 'hexagon-icon', label: 'Hexagon' },
];

const CreateBoardForm = ({ onCreate }) => {
  const [title, setTitle] = useState('');
  const [icon, setIcon] = useState('icon-grid');
  const [background, setBackground] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!title) {
      alert('Title is required');
      return;
    }
    onCreate({ title, icon, background });
  };

  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <h2>New board</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className={s.input}
      />

      <div className={s.section}>
        <p>Icons</p>
        <div className={s.icons}>
          {icons.map(({ value, label }) => (
            <label key={value} className={s.iconOption}>
              <input
                type="radio"
                name="icon"
                value={value}
                checked={icon === value}
                onChange={() => setIcon(value)}
                className={s.iconRadio}
              />
              <svg
                className={`${s.icon} ${icon === value ? s.activeIcon : ''}`}
                width="18"
                height="18"
              >
                <use href={`${sprite}#${value}`} />
              </svg>
            </label>
          ))}
        </div>
      </div>

      <div className={s.section}>
        <p>Background</p>
        <div className={s.backgrounds}>
          <input
            type="radio"
            name="background"
            value=""
            checked={background === ''}
            onChange={() => setBackground('')}
          />
        </div>
      </div>

      <button type="submit" className={s.createButton}>
        Create
      </button>
    </form>
  );
};

export default CreateBoardForm;
