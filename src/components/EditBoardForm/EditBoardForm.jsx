import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import s from './EditBoardForm.module.css';
import sprite  from '../../icons/icons.svg';
import backgroundImages from '../../bg/backgroundImages.js';
import { updateBoard } from '../../redux/boards/operations.js';
import backgrounds from '../../bg/background/bgImages.js';

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

const EditBoardForm = ({ board }) => {
  const dispatch = useDispatch(); // Ініціалізація dispatch для виклику дії
  const [title, setTitle] = useState(board.title);
  const [icon, setIcon] = useState(board.icon || 'project-icon');
  const [background, setBackground] = useState(board.background || '');
  const token = localStorage.getItem('token');

  // Встановлюємо початкові значення для форми, якщо борд оновлюється
  useEffect(() => {
    console.log("Selected icon has changed:", icon);
  }, [icon]);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Title is required');
      return;
    }

    try {
      const actionResult = await dispatch(
        updateBoard({
          boardId: board._id,
          title,
          icon,
          background,
          token,
        })
      );
      if (updateBoard.fulfilled.match(actionResult)) {
        alert('Board updated successfully!');
        console.log('Selected icon:', icon); // Виведемо вибрану іконку для перевірки
      }
    } catch (error) {
      console.error('Error while updating board:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <h2>Edit board</h2>
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
          {icons.map(({ value }) => (
            <label key={value} className={s.iconOption}>
              <input
                type="radio"
                name="icon"
                value={value}
                checked={icon === value}
                onChange={() => setIcon(value)} // Оновлюємо вибір іконки
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
        
        <div className={s.section}>
          <p>BG</p>
          <div className={s.icons}>
            {backgrounds.map(bg => (
              <div
                key={bg.id}
                className={s.iconWrapper}
                onClick={() => setBackground(String(bg.id))} // Set background ID on click
              >
                <img src={bg.min} alt={bg.id} className={s.iconImage} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <button type="submit" className={s.createButton}>
        Save
      </button>
    </form>
  );
};

export default EditBoardForm;
