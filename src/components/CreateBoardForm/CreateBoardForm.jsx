// import React, { useState } from 'react';
// import s from './CreateBoardForm.module.css';
// import sprite from '../../icons/icons.svg';

// const icons = [
//   { value: 'project-icon', label: 'Project' },
//   { value: 'star-icon', label: 'Star' },
//   { value: 'circle-icon', label: 'Circle' },
//   { value: 'puzzle-piece-icon', label: 'Puzzle' },
//   { value: 'cube-icon', label: 'Cube' },
//   { value: 'lightning-icon', label: 'Lightning' },
//   { value: 'colors-icon', label: 'Colors' },
//   { value: 'hexagon-icon', label: 'Hexagon' },
// ];

// const CreateBoardForm = ({ onCreate }) => {
//   const [title, setTitle] = useState('');
//   const [icon, setIcon] = useState('icon-grid');
//   const [background, setBackground] = useState('');

//   const handleSubmit = e => {
//     e.preventDefault();
//     if (!title) {
//       alert('Title is required');
//       return;
//     }
//     onCreate({ title, icon, background });
//   };

//   return (
//     <form onSubmit={handleSubmit} className={s.form}>
//       <h2>New board</h2>
//       <input
//         type="text"
//         placeholder="Title"
//         value={title}
//         onChange={e => setTitle(e.target.value)}
//         className={s.input}
//       />

//       <div className={s.section}>
//         <p>Icons</p>
//         <div className={s.icons}>
//           {icons.map(({ value, label }) => (
//             <label key={value} className={s.iconOption}>
//               <input
//                 type="radio"
//                 name="icon"
//                 value={value}
//                 checked={icon === value}
//                 onChange={() => setIcon(value)}
//                 className={s.iconRadio}
//               />
//               <svg
//                 className={`${s.icon} ${icon === value ? s.activeIcon : ''}`}
//                 width="18"
//                 height="18"
//               >
//                 <use href={`${sprite}#${value}`} />
//               </svg>
//             </label>
//           ))}
//         </div>
//       </div>

//       <div className={s.section}>
//         <p>Background</p>
//         <div className={s.backgrounds}>
//           <input
//             type="radio"
//             name="background"
//             value=""
//             checked={background === ''}
//             onChange={() => setBackground('')}
//           />
//         </div>
//       </div>

//       <button type="submit" className={s.createButton}>
//         Create
//       </button>
//     </form>
//   );
// };

// export default CreateBoardForm;

//import { useState } from 'react';
//import s from './CreateBoardForm.module.css';
//import backgroundImages from '../../bg/backgroundImages.js'; // Імпортуємо масив фонів для різних пристрої
//import sprite from '../../icons/icons.svg';
//import SvgIcon from '../SvgIcon/SvgIcon.jsx';
//import { useDispatch } from 'react-redux';
//import defoultBg from '../../bg/default-bg.png';

// Список іконок для вибору

//const icons = [
// { value: 'project-icon', label: 'Project' },
// { value: 'star-icon', label: 'Star' },
//  { value: 'circle-icon', label: 'Circle' },
// { value: 'puzzle-piece-icon', label: 'Puzzle' },
//  { value: 'cube-icon', label: 'Cube' },
// { value: 'lightning-icon', label: 'Lightning' },
// { value: 'colors-icon', label: 'Colors' },
// { value: 'hexagon-icon', label: 'Hexagon' },
//];

//const CreateBoardForm = ({ onCreate }) => {
// const [title, setTitle] = useState('');
// const [icon, setIcon] = useState('icon-grid'); // Початкове значення для іконки
//  const [background, setBackground] = useState(0); // Початковий фон

// const handleSubmit = e => {
//  e.preventDefault();
//  if (!title) {
//    alert('Title is required');
//    return;
// }
// Викликаємо onCreate і передаємо значення для title, icon і background
// onCreate({ title, icon, background });
//};

// return (
// <form onSubmit={handleSubmit} className={s.form}>
//   <h2>New board</h2>
//   <input
//     type="text"
//     placeholder="Title"
//    value={title}
//    onChange={e => setTitle(e.target.value)}
//    className={s.input}
//  />

//  {/* Вибір іконки */}
// <div className={s.section}>
//   <p>Icons</p>
//   <div className={s.icons}>
//     {icons.map(({ value }) => (
//       <label key={value} className={s.iconOption}>
//         <input
//           type="radio"
//           name="icon"
//           value={value}
//           checked={icon === value}
//           onChange={() => setIcon(value)}
//           className={s.iconRadio}
//         />
//         <svg
//           className={`${s.icon} ${icon === value ? s.activeIcon : ''}`}
//           width="18"
//           height="18"
//         >
//           <use href={`${sprite}#${value}`} />
//         </svg>
//       </label>
//     ))}
//   </div>
// </div>

// {/* Вибір фону */}
//<div className={s.section}>
//  <p>Background</p>
//  <div className={s.backgrounds}>
//    {backgroundImages.map((bg, index) => (
//      <label key={index} className={s.bgOption}>
//        <input
//          type="radio"
//         name="background"
//         value={bg.desktop} // Використовуємо desktop URL
//         checked={background === bg.desktop}
//         onChange={() => setBackground(bg.desktop)} // Оновлюємо стан фону
//         className={s.backgroundRadio}
//         style={{ display: 'none' }} // Приховуємо інпут
//       />
//       <img
//         src={bg.desktop}
//         alt={`Background ${index + 1}`}
//         className={s.backgroundImage}
//         width="28"
//         height="28"
//       />
//     </label>
//   ))}
// </div>
//      </div>
//
//    <button type="submit" className={s.createButton}>
//      Create
//     </button>
//    </form>
// );
//};

//export default CreateBoardForm;

import { useEffect, useState } from 'react';
import s from './CreateBoardForm.module.css';
import sprite from '../../icons/icons.svg';
import backgrounds from '../../bg/background/bgImages.js'; // Імпортуємо масив фонів для різних пристро
import icons from '../../bg/iconBg/icons.js';
import SvgIcon from '../SvgIcon/SvgIcon.jsx';
import { useDispatch, useSelector } from 'react-redux';
import defoultBg from '../../bg/default-bg.png';
import { addBoard, fetchBoards } from '../../redux/boards/operations.js';
import { selectUserId } from '../../redux/user/selectors';

const CreateBoardForm = ({ closeModal }) => {
  const [title, setTitle] = useState('');

  const [icon, setIcon] = useState('Project'); // Початкове значення для іконки
  const [background, setBackground] = useState(0); // Початковий фон

  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);
  const token = localStorage.getItem('token');
  // useEffect(() => {
  //   console.log('User ID:', userId, 'Token:', token);
  //   if (userId && token) {
  //     dispatch(fetchBoards({ userId, token }));
  //   }
  // }, [dispatch, userId, token]);
  // const token = useSelector(state => state.token);

  /* const handleSubmit = e => {
      e.preventDefault();
      if (!title) {
        alert('Title is required');
        return;
      }
    }; */
  const handleIconChange = event => setIcon(event.currentTarget.dataset.source);

  const handleBackgroundChange = event => {
    const selectedBackgroundId = event.currentTarget.dataset.source;

    // шукаємо обєкт фону по ID
    const selectedBackground = backgrounds.find(
      bg => bg.id === parseInt(selectedBackgroundId)
    );

    // зберігаємо  ID обраного фону
    setBackground(selectedBackground ? selectedBackground.id : '0');
  };

  const newBoardObject = {
    title,
    icon: icon,
    // Перетворюєм ID фона в стрічку
    background: background ? String(background) : null,
  };

  const bg = newBoardObject.background;

  const createNewBoard = () => {
    // if (!token) {
    //   console.error('Token is missing')
    //   return
    // }
    dispatch(
      addBoard({
        owner: userId,
        title: newBoardObject.title,
        icon: newBoardObject.icon,
        // background: newBoardObject.background,
        token,
      })
    );
    closeModal();
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
        {/* <button onClick={closeModal}>
          <SvgIcon id="x-icon-close" className={s.iconClose} />
        </button> */}
        <h3 className={s.textIcons}>Icons</h3>
        <ul className={s.listDarkIcons}>
          {icons.map(icon => (
            <li key={icon.id} className={s.iconContainer}>
              <input
                type="radio"
                data-source={icon.name}
                name="icon"
                checked={icon === icon.name}
                onChange={handleIconChange}
                className={s.iconRadio}
                style={{ display: 'none' }}
              />
              <SvgIcon
                id={icon.id}
                className={icon === icon.name ? s.darkIcons : s.serIcons}
              />
            </li>
          ))}
        </ul>

        {/* Вибір фону */}
        <h3 className={s.textBackground}>Background</h3>
        <ul className={s.listColorIcons}>
          <li className={background === null ? s.listItemActive : s.listItem}>
            <input
              type="radio"
              name="backgrounds"
              data-source="0"
              className={s.inputBack}
              checked={background === null}
              onChange={handleBackgroundChange}
            />
            <img src={defoultBg} alt="no-background" className={s.imgBack} />
          </li>
          {backgrounds.map(bg => (
            <li
              key={bg.id}
              className={background === bg.id ? s.listItemActive : s.listItem}
            >
              <input
                type="radio"
                name="backgrounds"
                data-source={bg.id}
                checked={background === bg.id}
                onChange={handleBackgroundChange}
                className={s.inputBack}
                /* style={{ display: 'none' }} */ // Приховуємо інпут
              />
              <img src={bg.min} alt={bg.alt} className={s.imgBack} />
            </li>
          ))}
        </ul>
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
