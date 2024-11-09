import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchBoards,
  fetchBoardById,
  addBoard,
  updateBoard,
  deleteBoard,
  // selectBoard,
} from '../../redux/boards/operations';
import { selectBoards } from '../../redux/boards/selectors';
import LogoComponent from '../LogoComponent/LogoComponent';
import Modal from '../Modal/Modal';
import CreateBoardForm from '../CreateBoardForm/CreateBoardForm';
import EditBoardForm from '../EditBoardForm/EditBoardForm';
import s from './SideBar.module.css';
import sprite from '../../icons/icons.svg';
import NeedHelp from './NeedHelp/NeedHelp';
import Logout from './Logout/Logout';
import { selectUserId } from '../../redux/user/selectors';

const Sidebar = () => {
  const dispatch = useDispatch();
  const boards = useSelector(selectBoards) || [];
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const userId = useSelector(selectUserId);
  const token = localStorage.getItem('token');

  console.log(userId, token);

  useEffect(() => {
    console.log('User ID:', userId, 'Token:', token);
    if (userId && token) {
      dispatch(fetchBoards({ userId, token }));
    }
  }, [dispatch, userId, token]);

  const handleCreateBoard = newBoard => {
    console.log('Creating new board:', newBoard);
    dispatch(addBoard({ userId, boardName: newBoard.title, token }));
    setCreateModalOpen(false);
  };

  const handleDeleteBoard = boardId => {
    dispatch(deleteBoard({ boardId, token }));
  };

  const handleEditBoardClick = board => {
    setSelectedBoard(board);
    console.log(selectedBoard);
    setEditModalOpen(true);
  };

  const handleEditBoard = updatedBoard => {
    console.log('Updated board data:', updatedBoard);
    dispatch(
      updateBoard({
        boardId: updatedBoard._id,
        updatedTitle: updatedBoard.title,
        token,
      })
    );
    setEditModalOpen(false);
  };
  const handleBoardClick = board => {
    dispatch(fetchBoardById({ boardId: board._id, token }));
    // navigate(`/boards/${board._id}`);
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

        <div className={s.boardList}>
          {boards && boards.length > 0 ? (
            boards.map(board => (
              <div
                key={board._id}
                className={s.boardItem}
                onClick={() => handleBoardClick(board)}
              >
                <span>{board.title}</span>
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
                    onClick={() => handleDeleteBoard(board._id)}
                  >
                    <svg className={s.icon} width="16" height="16">
                      <use href={`${sprite}#trash-icon`} />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No boards available</p>
          )}
        </div>

        {isCreateModalOpen && (
          <Modal onClose={() => setCreateModalOpen(false)}>
            <CreateBoardForm onCreate={handleCreateBoard} />
          </Modal>
        )}

        {isEditModalOpen && (
          <Modal onClose={() => setEditModalOpen(false)}>
            <EditBoardForm board={selectedBoard} onSave={handleEditBoard} />
          </Modal>
        )}
      </div>

      <button
        className={s.toggleButton}
        onClick={() => setSidebarOpen(!isSidebarOpen)}
      >
        <svg className={s.toggleIcon} width="20" height="20">
          <use href={`${sprite}#menu-icon`} />
        </svg>
      </button>
      <div className={s.need}>
        <NeedHelp />
      </div>
      <div className={s.out}>
        <Logout />
      </div>
    </div>
  );
};
//   return (
//     <div className={s.sidebarContainer}>
//       <div className={`${s.sidebar} ${isSidebarOpen ? s.openSidebar : ''}`}>
//         <LogoComponent />

//         <h2 className={s.title}>My boards</h2>
//         <hr className={s.separator} />

//         <div className={s.createBoardContainer}>
//           <div className={s.createBoardText}>
//             <span>Create a new board</span>
//           </div>
//           <button
//             className={s.createButton}
//             onClick={() => setCreateModalOpen(true)}
//           >
//             <svg className={s.plusIcon} width="20" height="20">
//               <use href={`${sprite}#plus-icon`} />
//             </svg>
//           </button>
//         </div>

//         <hr className={s.separator} />

//         {/* Список дошок */}
//         <div className={s.boardList}>
//           {boards.map(board => (
//             <div key={board.id} className={s.boardItem}>
//               <span>{board.name}</span>
//               <div className={s.actions}>
//                 <button
//                   className={s.editButton}
//                   onClick={() => handleEditBoardClick(board)}
//                 >
//                   <svg className={s.icon} width="16" height="16">
//                     <use href={`${sprite}#pencil-icon`} />
//                   </svg>
//                 </button>
//                 <button
//                   className={s.deleteButton}
//                   onClick={() => handleDeleteBoard(board.id)}
//                 >
//                   <svg className={s.icon} width="16" height="16">
//                     <use href={`${sprite}#trash-icon`} />
//                   </svg>
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Модальне вікно для створення нової дошки */}
//         {isCreateModalOpen && (
//           <Modal onClose={() => setCreateModalOpen(false)}>
//             <CreateBoardForm onCreate={handleCreateBoard} />
//           </Modal>
//         )}

//         {/* Модальне вікно для редагування дошки */}
//         {isEditModalOpen && (
//           <Modal onClose={() => setEditModalOpen(false)}>
//             <EditBoardForm board={selectedBoard} onSave={handleEditBoard} />
//           </Modal>
//         )}
//       </div>

//       {/* Кнопка для відкриття/закриття панелі */}
//       <button
//         className={s.toggleButton}
//         onClick={() => setSidebarOpen(!isSidebarOpen)}
//       >
//         {/* Іконка для відкриття/закриття (можна замінити на потрібну) */}
//         <svg className={s.toggleIcon} width="20" height="20">
//           <use href={`${sprite}#menu-icon`} />
//         </svg>
//       </button>
//       <div className={s.need}>
//         <NeedHelp />
//       </div>
//       <div className={s.out}>
//         <Logout />
//       </div>
//     </div>
//   );
// };

export default Sidebar;
