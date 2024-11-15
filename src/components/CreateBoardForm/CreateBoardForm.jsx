
import { useState } from 'react';
import s from './CreateBoardForm.module.css';
import sprite from '../../icons/icons.svg';
import backgrounds from '../../bg/background/bgImages.js'; 


import { useDispatch} from 'react-redux';
import { addBoard, fetchBoards } from '../../redux/boards/operations.js';


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
const CreateBoardForm = ({ closeModal }) => {
  const [title, setTitle] = useState('');
  const [icon, setIcon] = useState('project-icon'); 
  const [background, setBackground] = useState(null); 
  

  const dispatch = useDispatch();
  const token = localStorage.getItem('token');

  const createNewBoard = async (e) => {
    e.preventDefault();
  
    if (!title.trim()) {
      alert('Title is required');
      return;
    }
  
    try {
      const actionResult = await dispatch(
        addBoard({
          title,
          icon,
          background, 
          token,
        })
      );
      console.log('Creating board with:', { title, icon, background, token });
      if (addBoard.fulfilled.match(actionResult)) {
        dispatch(fetchBoards()); 
        alert('Board created successfully!');
        closeModal(); 
      }
    } catch (error) {
      console.error('Error while creating board:', error);
    }
  };
  
  
  return (
    <div
      className={s.modalOverlay}
      onClick={e => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      <div /* onSubmit={handleSubmit} */ className={s.form}>
        <h2 className={s.textBoard}>New board</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className={s.titleInput}
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
                onChange={() => {
                  setIcon(value);
                  console.log('Selected icon:', value); // Додайте цей рядок
                }}
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

        {/* Вибір фону */}
        <h3 className={s.textBackground}>Background</h3>
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
        <button
          type="submit"
          className={s.createButton}
          onClick={createNewBoard}
        >
          <div className={s.plusBtn}>
            <svg className={s.plusIcon} width="14" height="14">
              <use href={`${sprite}#plus-icon`} />
            </svg>
          </div>
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateBoardForm;
