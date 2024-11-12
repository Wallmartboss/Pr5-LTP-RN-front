import { useState } from 'react';
import { useDispatch } from 'react-redux';
import s from './EditBoardForm.module.css';
import sprite from '../../icons/icons.svg';
import backgroundImages from '../../bg/backgroundImages.js';
import { updateBoard } from '../../redux/boards/operations.js';

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

const EditBoardForm = ({ board, token }) => {
  const dispatch = useDispatch(); // Ініціалізація dispatch для виклику дії
  const [title, setTitle] = useState(board.title);
  const [icon, setIcon] = useState(board.icon || 'project-icon');
  const [background, setBackground] = useState(board.background || '');

  const handleSubmit = async e => {
    e.preventDefault();
    if (!title) {
      alert('Title is required');
      return;
    }

    // Перетворюємо індекс фону на URL (як я робила раніше)
    const updatedBoard = { title, icon, background };

    try {
      // Викликаємо дію для оновлення борду
      const actionResult = await dispatch(
        updateBoard({
          boardId: board._id,
          editedBoardObject: updatedBoard,
          token,
        })
      );
      if (updateBoard.fulfilled.match(actionResult)) {
        // Успішне оновлення борду
        alert('Board updated successfully!');
      } else {
        // Якщо сталася помилка
        alert('Error updating board!');
      }
    } catch (error) {
      console.error('Error while updating board:', error);
      alert('Error while updating board!');
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
        {/* Радіо-кнопки для фону */}
        <div className={s.backgrounds}>
          {backgroundImages.map((bg, index) => (
            <label key={index} className={s.backgroundOption}>
              <input
                type="radio"
                name="background"
                value={bg.desktop} // Використовуємо desktop URL
                checked={background === bg.desktop}
                onChange={() => setBackground(bg.desktop)} // Оновлюємо стан фону
                className={s.backgroundRadio}
                style={{ display: 'none' }} // Приховуємо інпут
              />
              <img
                src={bg.desktop}
                alt={`Background ${index + 1}`}
                className={s.backgroundImage}
                width="28"
                height="28"
              />
            </label>
          ))}
        </div>
      </div>

      <button type="submit" className={s.createButton}>
        Save
      </button>
    </form>
  );
};

export default EditBoardForm;
