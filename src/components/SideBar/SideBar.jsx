import React, { useState } from 'react';
import LogoComponent from '../LogoComponent/LogoComponent';
import Modal from '../Modal/Modal';
import CreateBoardForm from '../CreateBoardForm/CreateBoardForm';
import s from './Sidebar.module.css';
import sprite from '../../icons/icons.svg';

const Sidebar = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [boards, setBoards] = useState([
    { id: 1, name: 'Project office' },
    { id: 2, name: 'Neon Light Project' },
  ]);

  // Відкриття модального вікна для створення дошки
  const handleCreateBoardClick = () => {
    setModalOpen(true);
  };

  // Функція для додавання нової дошки в список
  const handleCreateBoard = newBoard => {
    setBoards([...boards, { id: boards.length + 1, name: newBoard.title }]);
    setModalOpen(false); // Закрити модальне вікно після додавання
  };

  return (
    <div className={s.sidebar}>
      <LogoComponent />

      <h2 className={s.title}>My boards</h2>
      <hr className={s.separator} />

      {/* Кнопка для створення нової дошки */}
      <div className={s.createBoardContainer}>
        <div className={s.createBoard} onClick={handleCreateBoardClick}>
          <span>Create a new board</span>
        </div>
        <button className={s.createButton}>
          <svg className={s.plusIcon} width="20" height="20">
            <use href={`${sprite}#plus-icon`} />
          </svg>
        </button>
      </div>

      <hr className={s.separator} />

      {/* Список дошок */}
      <div className={s.boardList}>
        {boards.map(board => (
          <div key={board.id} className={s.boardItem}>
            <span>{board.name}</span>
            <div className={s.actions}>
              <button className={s.editButton}>
                <svg className={s.plusIcon} width="16" height="16">
                  <use href={`${sprite}#pencil-icon`} />
                </svg>
              </button>
              <button className={s.deleteButton}>
                <svg className={s.plusIcon} width="16" height="16">
                  <use href={`${sprite}#trash-icon`} />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Модальне вікно для створення нової дошки */}
      {isModalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <CreateBoardForm onCreate={handleCreateBoard} />
        </Modal>
      )}
    </div>
  );
};

export default Sidebar;
