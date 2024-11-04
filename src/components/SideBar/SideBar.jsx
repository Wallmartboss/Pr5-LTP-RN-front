import React, { useState } from 'react';
import LogoComponent from '../LogoComponent/LogoComponent';
import Modal from '../Modal/Modal';
import CreateBoardForm from '../CreateBoardForm/CreateBoardForm';
import styles from './Sidebar.module.css';

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
    <div className={styles.sidebar}>
      <LogoComponent />

      <h2 className={styles.title}>My boards</h2>
      <hr className={styles.separator} />

      {/* Кнопка для створення нової дошки */}
      <div className={styles.createBoard} onClick={handleCreateBoardClick}>
        <span>Create a new board</span>
        <button className={styles.createButton}>+</button>
      </div>

      <hr className={styles.separator} />

      {/* Список дошок */}
      <div className={styles.boardList}>
        {boards.map(board => (
          <div key={board.id} className={styles.boardItem}>
            <span>{board.name}</span>
            <div className={styles.actions}>
              <button className={styles.editButton}>✏️</button>
              <button className={styles.deleteButton}>🗑️</button>
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
