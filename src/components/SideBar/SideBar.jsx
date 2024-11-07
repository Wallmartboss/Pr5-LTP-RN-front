import React, { useState } from 'react';
import LogoComponent from '../LogoComponent/LogoComponent';
import Modal from '../Modal/Modal';
import CreateBoardForm from '../CreateBoardForm/CreateBoardForm';
import EditBoardForm from '../EditBoardForm/EditBoardForm';
import s from './SideBar.module.css';
import sprite from '../../icons/icons.svg';

const Sidebar = () => {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [boards, setBoards] = useState([
    { id: 1, name: 'Project office' },
    { id: 2, name: 'Neon Light Project' },
  ]);
  const [selectedBoard, setSelectedBoard] = useState(null);

  const handleCreateBoard = newBoard => {
    setBoards([...boards, { id: boards.length + 1, name: newBoard.title }]);
    setCreateModalOpen(false);
  };

  const handleDeleteBoard = boardId => {
    setBoards(boards.filter(board => board.id !== boardId));
  };

  const handleEditBoardClick = board => {
    setSelectedBoard(board);
    setEditModalOpen(true);
  };

  const handleEditBoard = updatedBoard => {
    setBoards(
      boards.map(board =>
        board.id === updatedBoard.id
          ? { ...board, name: updatedBoard.title }
          : board
      )
    );
    setEditModalOpen(false);
  };

  return (
    <div className={s.sidebarContainer}>
      <div className={`${s.sidebar} ${isSidebarOpen ? s.openSidebar : ''}`}>
        <LogoComponent />

        <h2 className={s.title}>My boards</h2>
        <hr className={s.separator} />

        <div className={s.createBoardContainer}>
          <div className={s.createBoardText}>
            <span>Create a new board</span>
          </div>
          <button
            className={s.createButton}
            onClick={() => setCreateModalOpen(true)}
          >
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
                <button
                  className={s.editButton}
                  onClick={() => handleEditBoardClick(board)}
                >
                  <svg className={s.icon} width="16" height="16">
                    <use href={`${sprite}#pencil-icon`} />
                  </svg>
                </button>
                <button
                  className={s.deleteButton}
                  onClick={() => handleDeleteBoard(board.id)}
                >
                  <svg className={s.icon} width="16" height="16">
                    <use href={`${sprite}#trash-icon`} />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Модальне вікно для створення нової дошки */}
        {isCreateModalOpen && (
          <Modal onClose={() => setCreateModalOpen(false)}>
            <CreateBoardForm onCreate={handleCreateBoard} />
          </Modal>
        )}

        {/* Модальне вікно для редагування дошки */}
        {isEditModalOpen && (
          <Modal onClose={() => setEditModalOpen(false)}>
            <EditBoardForm board={selectedBoard} onSave={handleEditBoard} />
          </Modal>
        )}
      </div>

      {/* Кнопка для відкриття/закриття панелі */}
      <button
        className={s.toggleButton}
        onClick={() => setSidebarOpen(!isSidebarOpen)}
      >
        {/* Іконка для відкриття/закриття (можна замінити на потрібну) */}
        <svg className={s.toggleIcon} width="20" height="20">
          <use href={`${sprite}#menu-icon`} />
        </svg>
      </button>
    </div>
  );
};

export default Sidebar;
