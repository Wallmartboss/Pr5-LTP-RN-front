// import React, { useState } from 'react';
// import LogoComponent from '../LogoComponent/LogoComponent';
// import Modal from '../Modal/Modal';
// import CreateBoardForm from '../CreateBoardForm/CreateBoardForm';
// import EditBoardForm from '../EditBoardForm/EditBoardForm'; // Компонент для редагування
// import s from './Sidebar.module.css';
// import sprite from '../../icons/icons.svg';

// const Sidebar = () => {
//   const [isCreateModalOpen, setCreateModalOpen] = useState(false);
//   const [isEditModalOpen, setEditModalOpen] = useState(false);
//   const [boards, setBoards] = useState([
//     { id: 1, name: 'Project office' },
//     { id: 2, name: 'Neon Light Project' },
//   ]);
//   const [selectedBoard, setSelectedBoard] = useState(null); // Стан для вибраної дошки

//   // Відкриття модального вікна для створення дошки
//   const handleCreateBoardClick = () => {
//     setCreateModalOpen(true);
//   };

//   // Додавання нової дошки
//   const handleCreateBoard = newBoard => {
//     setBoards([...boards, { id: boards.length + 1, name: newBoard.title }]);
//     setCreateModalOpen(false);
//   };

//   // Видалення дошки
//   const handleDeleteBoard = boardId => {
//     setBoards(boards.filter(board => board.id !== boardId));
//   };

//   // Відкриття модального вікна для редагування дошки
//   const handleEditBoardClick = board => {
//     setSelectedBoard(board);
//     setEditModalOpen(true);
//   };

//   // Збереження змін при редагуванні дошки
//   const handleEditBoard = updatedBoard => {
//     setBoards(
//       boards.map(board =>
//         board.id === updatedBoard.id
//           ? { ...board, name: updatedBoard.title }
//           : board
//       )
//     );
//     setEditModalOpen(false);
//   };

//   return (
//     <div className={s.sidebar}>
//       <LogoComponent />

//       <h2 className={s.title}>My boards</h2>
//       <hr className={s.separator} />

//       {/* Кнопка для створення нової дошки */}
//       <div className={s.createBoardContainer}>
//         <div className={s.createBoard} onClick={handleCreateBoardClick}>
//           <span>Create a new board</span>
//         </div>
//         <button className={s.createButton}>
//           <svg className={s.plusIcon} width="20" height="20">
//             <use href={`${sprite}#plus-icon`} />
//           </svg>
//         </button>
//       </div>

//       <hr className={s.separator} />

//       {/* Список дошок */}
//       <div className={s.boardList}>
//         {boards.map(board => (
//           <div key={board.id} className={s.boardItem}>
//             <span>{board.name}</span>
//             <div className={s.actions}>
//               <button
//                 className={s.editButton}
//                 onClick={() => handleEditBoardClick(board)}
//               >
//                 <svg className={s.icon} width="16" height="16">
//                   <use href={`${sprite}#pencil-icon`} />
//                 </svg>
//               </button>
//               <button
//                 className={s.deleteButton}
//                 onClick={() => handleDeleteBoard(board.id)}
//               >
//                 <svg className={s.icon} width="16" height="16">
//                   <use href={`${sprite}#trash-icon`} />
//                 </svg>
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Модальне вікно для створення нової дошки */}
//       {isCreateModalOpen && (
//         <Modal onClose={() => setCreateModalOpen(false)}>
//           <CreateBoardForm onCreate={handleCreateBoard} />
//         </Modal>
//       )}

//       {/* Модальне вікно для редагування дошки */}
//       {isEditModalOpen && (
//         <Modal onClose={() => setEditModalOpen(false)}>
//           <EditBoardForm board={selectedBoard} onSave={handleEditBoard} />
//         </Modal>
//       )}
//     </div>
//   );
// };

// export default Sidebar;

import React, { useState } from 'react';
import LogoComponent from '../LogoComponent/LogoComponent';
import Modal from '../Modal/Modal';
import CreateBoardForm from '../CreateBoardForm/CreateBoardForm';
import EditBoardForm from '../EditBoardForm/EditBoardForm'; // Компонент для редагування
import s from './Sidebar.module.css';
import sprite from '../../icons/icons.svg';

const Sidebar = () => {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [boards, setBoards] = useState([
    { id: 1, name: 'Project office' },
    { id: 2, name: 'Neon Light Project' },
  ]);
  const [selectedBoard, setSelectedBoard] = useState(null); // Стан для вибраної дошки

  // Додавання нової дошки
  const handleCreateBoard = newBoard => {
    setBoards([...boards, { id: boards.length + 1, name: newBoard.title }]);
    setCreateModalOpen(false);
  };

  // Видалення дошки
  const handleDeleteBoard = boardId => {
    setBoards(boards.filter(board => board.id !== boardId));
  };

  // Відкриття модального вікна для редагування дошки
  const handleEditBoardClick = board => {
    setSelectedBoard(board);
    setEditModalOpen(true);
  };

  // Збереження змін при редагуванні дошки
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
    <div className={s.sidebar}>
      <LogoComponent />

      <h2 className={s.title}>My boards</h2>
      <hr className={s.separator} />

      {/* Кнопка для створення нової дошки */}
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
  );
};

export default Sidebar;
